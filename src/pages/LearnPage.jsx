import {React, useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarker, FaEllipsisV } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LearnData from '../assets/JSONs/Learn.json';
import { ref, push, set, onValue } from 'firebase/database';
import { db } from '../firebase'; 
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const LearnPage = () => {
  const mechanic = useLocation();
  const navigate = useNavigate();
  const {Title, InteractiveControls, UnityLink} = mechanic.state;

  const [user, setUser] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [unityStarted, setUnityStarted] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  
  // Listen for Firebase Auth state changes
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          name: firebaseUser.displayName,
          picture: firebaseUser.photoURL,
          email: firebaseUser.email,
          uid: firebaseUser.uid
        });
        // Optionally update localStorage for navbar
        localStorage.setItem('vgmech_user', JSON.stringify({
          name: firebaseUser.displayName,
          picture: firebaseUser.photoURL,
          email: firebaseUser.email,
          uid: firebaseUser.uid
        }));
      } else {
        setUser(null);
        localStorage.removeItem('vgmech_user');
      }
    });
    return () => unsubscribe();
  }, []);

  // Helper to nest replies: only one level of nesting (YouTube style)
  function nestComments(flatComments) {
    const map = {};
    const roots = [];
    flatComments.forEach(c => {
      map[c.id] = { ...c, replies: [] };
    });
    flatComments.forEach(c => {
      if (c.parentId && map[c.parentId]) {
        map[c.parentId].replies.push(map[c.id]);
      } else if (!c.parentId) {
        roots.push(map[c.id]);
      }
    });
    // Only one level of replies
    roots.forEach(root => {
      root.replies = root.replies.sort((a, b) => new Date(a.date) - new Date(b.date));
    });
    return roots.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  useEffect(() => {
      // Fetch comments for this mechanic from Firebase Realtime DB
      const commentsRef = ref(db, `comments/${Title}`);
      const unsubscribe = onValue(commentsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Convert object to array and sort by date or key if needed
          const arr = Object.entries(data).map(([id, value]) => ({ id, ...value }));
          setComments(nestComments(arr));
        } else {
          setComments([]);
        }
        setLoadingComments(false);
      });
      return () => unsubscribe();
  }, [Title]);

  // Find the mechanic in Learn.json by Title
  const mechanicData = LearnData.mechanics.find(m => m.Title === Title);
  // Decode HTML entities and <br /> for code display
  function decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value.replace(/<br\s*\/?>(\s*)?/gi, '\n').replace(/&nbsp;/g, ' ');
  }
  const codeText = mechanicData ? decodeHtml(mechanicData.CodeText) : '// No code provided.';

  const handlePostComment = async () => {
    if (!comment.trim()) return;
    const auth = getAuth();
    console.log('Firebase Auth currentUser:', auth.currentUser);
    console.log('Attempting to post comment. User:', user);
    const commentsRef = ref(db, `comments/${Title}`);
    const newCommentRef = push(commentsRef);
    const commentData = {
      userId: user?.uid, // from Firebase Auth
      user: { name: user?.name, picture: user?.picture },
      comment: comment.trim(),
      date: new Date().toISOString(),
      parentId: null
    };
    console.log('Posting comment data:', commentData);
    try {
      await set(newCommentRef, commentData);
      setComment("");
      toast.success('Comment posted!');
    } catch (err) {
      console.error('Error posting comment:', err);
      toast.error('Failed to post comment.');
    }
  };

  // Add reply state
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  // Helper to find top-level parent id
  function findTopLevelParentId(commentId, flatComments) {
    let current = flatComments.find(c => c.id === commentId);
    while (current && current.parentId) {
      current = flatComments.find(c => c.id === current.parentId);
    }
    return current ? current.id : commentId;
  }

  const handleReply = async (parentId, replyToUser = null) => {
    if (!replyText.trim()) return;
    const auth = getAuth();
    // Find all comments flat
    const allFlat = flattenComments(comments);
    // Find top-level parent id
    const topLevelParentId = findTopLevelParentId(parentId, allFlat);
    // Prepend @username if replying to a reply
    let replyContent = replyText.trim();
    if (replyToUser) {
      replyContent = `@${replyToUser} ` + replyContent;
    }
    const commentsRef = ref(db, `comments/${Title}`);
    const newReplyRef = push(commentsRef);
    const replyData = {
      userId: user?.uid, // from Firebase Auth
      user: { name: user?.name, picture: user?.picture },
      comment: replyContent,
      date: new Date().toISOString(),
      parentId: topLevelParentId
    };
    try {
      await set(newReplyRef, replyData);
      setReplyingTo(null);
      setReplyText("");
      toast.success('Reply posted!');
    } catch (err) {
      console.error('Error posting reply:', err);
      toast.error('Failed to post reply.');
    }
  };

  // State to track which comments have their replies shown
  const [openReplies, setOpenReplies] = useState({});

  // Toggle replies for a comment
  const toggleReplies = (id) => {
    setOpenReplies(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Helper to flatten nested comments for easy update
  function flattenComments(comments) {
    let flat = [];
    comments.forEach(c => {
      flat.push({ ...c, replies: undefined });
      if (c.replies && c.replies.length) flat = flat.concat(flattenComments(c.replies));
    });
    return flat;
  }

  // Render comments and replies (YouTube style: only one level of replies)
  function renderComments(commentsList, level = 0) {
    return commentsList.map(c => {
      const hasReplies = c.replies && c.replies.length > 0;
      const canDelete = user && (user.uid === c.userId);
      return (
        <div key={c.id} className="mb-2">
          <div className="d-flex align-items-start" style={{marginLeft: 0, paddingLeft: level > 0 ? 48 : 0}}>
            <img src={c.user.picture} alt={c.user.name} className="rounded-circle border border-2 me-2 flex-shrink-0" style={{width: '36px', height: '36px', borderColor: '#ffe259'}} />
            <div style={{flex: 1, minWidth: 0, position: 'relative'}}>
              <div className="d-flex align-items-center gap-2">
                <span className="fw-bold text-white" style={{fontSize: '1.05em'}}>{c.user.name}</span>
                <span className="text-white-50 small" style={{fontSize: '0.95em'}}>{new Date(c.date).toLocaleString()}</span>
                {canDelete && (
                  <div style={{position: 'relative'}}>
                    <button
                      className="btn btn-link p-0 m-0"
                      style={{color: '#ffe259'}}
                      onClick={() => setOpenMenu(openMenu === c.id ? null : c.id)}
                      aria-label="Options"
                    >
                      <FaEllipsisV />
                    </button>
                    {openMenu === c.id && (
                      <div style={{position: 'absolute', right: 0, top: '100%', zIndex: 20, background: '#2d0b00', border: '1px solid #ffb347', borderRadius: 6, minWidth: 100, boxShadow: '0 2px 8px #000'}}>
                        <button
                          className="dropdown-item text-danger fw-bold w-100 text-start px-3 py-2"
                          style={{background: 'none', border: 'none'}}
                          onClick={async () => {
                            await handleDeleteComment(c.id);
                            setOpenMenu(null);
                          }}
                        >Delete</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {/* Render comment with bold @username if present */}
              <div className="text-white mt-1" style={{wordBreak: 'break-word'}}
                dangerouslySetInnerHTML={{
                  __html: c.comment.replace(/@([\w\d_]+)/g, '<strong>@$1</strong>')
                }}
              />
              <div className="d-flex align-items-center gap-2 mt-1">
                {user && (
                  <button
                    className="btn btn-link p-0 m-0"
                    style={{color: '#ffe259', fontWeight: 'bold', fontSize: '0.95em'}} 
                    onClick={() => setReplyingTo(c.id)}
                  >Reply</button>
                )}
              </div>
              {/* See replies button for top-level comments only */}
              {hasReplies && level === 0 && (
                <button
                  className="btn btn-link p-0 mt-1"
                  style={{color: '#ffe259', fontWeight: 'bold', fontSize: '0.95em'}}
                  onClick={() => toggleReplies(c.id)}
                >
                  {openReplies[c.id] ? `Hide replies (${c.replies.length})` : `See replies (${c.replies.length})`}
                </button>
              )}
            </div>
          </div>
          {/* Replies: only one level, always shown if toggled for top-level */}
          {hasReplies && level === 0 && openReplies[c.id] && (
            <div className="ms-5 mt-1 border-start border-2 border-warning-subtle ps-3" style={{borderColor: '#ffb347 !important'}}>
              {c.replies.map(reply => renderComments([reply], 1))}
            </div>
          )}
          {/* Reply input for both top-level and replies */}
          {replyingTo === c.id && (
            <div className="mt-2 mb-2 ms-0 ms-md-4">
              <textarea
                className="form-control form-control-sm mb-2"
                style={{background: '#2d0b00', color: '#ffe259', borderColor: '#ffb347', boxShadow: '0 0 6px #d7263d'}}
                rows={2}
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                placeholder={`Reply to ${c.user.name}`}
              />
              <button
                className="btn btn-sm btn-success me-2"
                disabled={!replyText.trim()} 
                onClick={() => handleReply(c.id, level > 0 ? c.user.name : null)}
              >Post Reply</button>
              <button className="btn btn-sm btn-secondary" onClick={() => {setReplyingTo(null); setReplyText("");}}>Cancel</button>
            </div>
          )}
        </div>
      );
    });
  }

  // Delete comment handler
  async function handleDeleteComment(commentId) {
    try {
      const commentsRef = ref(db, `comments/${Title}/${commentId}`);
      await set(commentsRef, null);
      toast.success('Comment deleted!');
    } catch (err) {
      toast.error('Failed to delete comment.');
    }
  }

  return (
    <div className="learn-page-bg min-vh-100 py-5 px-2" style={{background: 'linear-gradient(135deg, #2d0b00 0%, #3a1c0b 100%)'}}>
      <ToastContainer
        position="top-right"
        autoClose={2200}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        toastClassName="toastify-custom"
      />
      <div className="container">
        <div className="row align-items-center mb-4">
          <div className="col-12 text-center">
            <h1 className="display-4 fw-bolder text-white shadow-sm mb-2" style={{letterSpacing: '2px', textShadow: '2px 2px 8px #d7263d'}}>{Title}</h1>
            <div className="divider mx-auto my-3" style={{width: '80px', height: '4px', background: 'linear-gradient(90deg, #d7263d, #ffb347, #ffe259)', borderRadius: '2px', boxShadow: '0 0 10px #d7263d'}}></div>
          </div>
        </div>
        <div className="row g-4 justify-content-center">
          {/* Interactive Demonstration */}
          <div className="col-lg-6 col-md-12">
            <div className="card h-100 shadow-lg border-0" style={{background: 'rgba(40,16,8,0.95)', border: '2px solid #d7263d'}}>
              <div className="card-body">
                <h2 className="fw-bolder mb-3" style={{color: '#ffb347', textShadow: '1px 1px 6px #d7263d'}}>Interactive Demonstration</h2>
                <div className="ratio ratio-16x9 mb-4 rounded-4 overflow-hidden border border-danger bg-black position-relative" style={{minHeight: '300px', boxShadow: '0 0 16px #d7263d'}}>
                  {!unityStarted && (
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center" style={{zIndex: 10, background: 'rgba(20,8,0,0.92)'}}>
                      <button
                        className="btn btn-lg btn-warning fw-bold px-5 py-3 shadow-lg"
                        style={{fontSize: '1.5rem', border: '2px solid #d7263d', color: '#2d0b00', textShadow: '1px 1px 6px #fff'}}
                        onClick={() => setUnityStarted(true)}
                      >
                        Click to Start Demo
                      </button>
                      <span className="mt-3 text-white-50">Audio will work after you start</span>
                    </div>
                  )}
                  {unityStarted && (
                    <>
                      <button 
                        className="btn btn-dark btn-sm position-absolute end-0 top-0 mt-2 me-2 ms-2 px-2 py-1 rounded-circle d-flex align-items-center justify-content-center" 
                        style={{zIndex: 2, width: '32px', height: '32px', fontSize: '1.1rem', padding: 0, color: '#ffb347', background: '#2d0b00', border: '2px solid #d7263d'}} 
                        onClick={() => {
                          const iframe = document.getElementById('unity-iframe');
                          if (iframe.requestFullscreen) {
                            iframe.requestFullscreen();
                          } else if (iframe.mozRequestFullScreen) {
                            iframe.mozRequestFullScreen();
                          } else if (iframe.webkitRequestFullscreen) {
                            iframe.webkitRequestFullscreen();
                          } else if (iframe.msRequestFullscreen) {
                            iframe.msRequestFullscreen();
                          }
                        }}
                        title="Full Screen"
                      >
                        <span style={{fontSize: '1.2em'}}>&#x26F6;</span>
                      </button>
                      <iframe 
                        id="unity-iframe"
                        src={UnityLink} 
                        className="unityLayout w-100 h-100 border-0" 
                        style={{display: 'block', width: '100%', height: '100%', objectFit: 'contain', background: 'black'}} 
                        allowFullScreen 
                        title={Title}
                        scrolling="no"
                        frameBorder="0"
                      ></iframe>
                    </>
                  )}
                </div>
                <h4 className="fw-bold mb-3" style={{color: '#ffb347', textShadow: '1px 1px 6px #d7263d'}}>Interactive Controls</h4>
                <ul className="list-group list-group-flush bg-transparent mb-0">
                  {InteractiveControls && InteractiveControls.map((element, idx) => (
                    <li key={idx} className="list-group-item bg-transparent border-0 ps-0 fs-6" style={{color: '#fff', background: 'rgba(60,20,10,0.5)', borderRadius: '8px', marginBottom: '6px'}}>
                      <span className="badge me-2" style={{background: 'linear-gradient(90deg, #d7263d, #ffb347)', color: '#fff', boxShadow: '0 0 6px #d7263d'}}>{idx+1}</span> {element}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* Coding Implementation */}
          <div className="col-lg-6 col-md-12">
            <div className="card h-100 shadow-lg border-0" style={{background: 'rgba(60,20,10,0.95)', border: '2px solid #ffb347'}}>
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="fw-bolder mb-0" style={{color: '#ffe259', textShadow: '1px 1px 6px #d7263d'}}>Coding Implementation</h2>
                  <button className="btn btn-dark btn-sm ms-2" type="button" onClick={() => {
                    navigator.clipboard.writeText(codeText || '');
                    toast.success('Code copied to clipboard!');
                  }} title="Copy to Clipboard" style={{background: '#2d0b00', border: '2px solid #ffb347', color: '#ffb347'}}>
                    <span style={{fontWeight: 'bold', color: '#ffe259'}}>⧉</span> Copy code
                  </button>
                </div>
                <div className="bg-black rounded-3 p-3 flex-grow-1 overflow-auto" style={{boxShadow: '0 0 12px #d7263d'}}>
                  <pre className="m-0" style={{color: '#ffe259'}}><code className="language-csharp" id="codeText">{codeText}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Comment Section */}
        <div className="row d-grid mt-3 justify-content-center">
          <div className="col-12 mx-auto">
            <div className="card h-100 shadow-lg border-0" style={{background: 'rgba(40,16,8,0.95)', border: '2px solid #ffb347'}}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <h4 className="fw-bolder mb-0" style={{color: '#ffe259', textShadow: '1px 1px 6px #d7263d'}}>Share your thoughts</h4>
                </div>
                <hr className="my-2" style={{borderColor: '#ffb347'}} />
                <div className="row g-2 align-items-center mb-3">
                  <div className="col-auto d-flex align-items-center">
                    {user ? (
                      <div className='d-flex align-items-center'>
                        <img src={user.picture} alt="User" className="rounded-circle border border-2" style={{width: '40px', height: '40px', borderColor: '#ffe259'}} />
                        <h6 className="ms-3 my-auto text-white" id="SessionUserLabel">{user.name}</h6>
                      </div>
                    ) : (
                      <div className='d-flex align-items-center'>
                        <img src={"/images/person_icon.png"} alt="User" className="rounded-circle border border-2" style={{width: '40px', height: '40px', borderColor: '#ffe259'}} />
                        <h6 className="ms-3 my-auto text-white" id="SessionUserLabel">Guest</h6>
                      </div>
                    )}
                  </div>
                  <div className="col">
                    <textarea
                      name="msg"
                      placeholder="Type your comment here"
                      id="commentbox"
                      rows="3"
                      className="form-control my-2 comment-textarea-white-placeholder"
                      style={{ backgroundColor: '#2d0b00', color: 'white', borderColor: '#ffb347', resize: 'none', boxShadow: '0 0 6px #d7263d' }}
                      draggable="false"
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="col-auto d-flex align-items-end">
                    {user ? (
                      <button
                        type="button"
                        className="btn btn-dark my-2"
                        style={{ fontWeight: 'bold', width: 'auto', minWidth: 0, padding: '0.375rem 1.25rem', border: '2px solid #ffb347', color: '#ffe259', background: '#2d0b00' }}
                        disabled={!comment.trim()}
                        onClick={handlePostComment}
                      >
                        Comment
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-dark my-2"
                        style={{ fontWeight: 'bold', width: 'auto', minWidth: 0, padding: '0.375rem 1.25rem', border: '2px solid #ffb347', color: '#ffe259', background: '#2d0b00' }}
                        onClick={() => navigate('/sign-in')}
                      >
                        Sign in to post
                      </button>
                    )}
                  </div>
                </div>
                <hr className="my-2" style={{borderColor: '#ffb347'}} />
                <div className="container-fluid px-0">
                  <div className="row justify-content-md-start align-items-center mb-2">
                    <div className="col-6 text-start fw-bolder text-white" id="commentCountDiv">
                      {/* Comment count will go here */}
                    </div>
                    <div className="col-6 text-end" id="sortByDiv">
                      {/* Sort by options will go here */}
                    </div>
                  </div>
                  <div className="row pb-4">
                    <div className="col comment-section-size shadow bg-black rounded-3 border border-2" style={{borderColor: '#ffb347'}}>
                      <div id="commentSection" className="d-grid py-3">
                        {loadingComments ? (
                          <div className="spinner-border text-warning m-auto mt-5" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : (
                          comments.length === 0 ? (
                            <div className="text-center text-white-50">No comments yet.</div>
                          ) : (
                            renderComments(comments)
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LearnPage
