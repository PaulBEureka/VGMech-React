import {React, useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import { FaArrowLeft, FaMapMarker } from 'react-icons/fa';
import { toast } from 'react-toastify';
import LearnData from '../assets/JSONs/Learn.json';

const LearnPage = () => {
  const mechanic = useLocation();
  const {Title, InteractiveControls, UnityLink} = mechanic.state;

  // Find the mechanic in Learn.json by Title
  const mechanicData = LearnData.mechanics.find(m => m.Title === Title);
  // Decode HTML entities and <br /> for code display
  function decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value.replace(/<br\s*\/?>(\s*)?/gi, '\n').replace(/&nbsp;/g, ' ');
  }
  const codeText = mechanicData ? decodeHtml(mechanicData.CodeText) : '// No code provided.';

  return (
    <div className="learn-page-bg min-vh-100 py-5 px-2" style={{background: 'linear-gradient(135deg, #2d0b00 0%, #3a1c0b 100%)'}}>
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
                    <img src="/images/person_icon.png" alt="User" className="rounded-circle border border-2" style={{width: '40px', height: '40px', borderColor: '#ffe259'}} />
                    <h5 className="ms-3 my-auto text-white" id="SessionUserLabel">Guest</h5>
                  </div>
                  <div className="col">
                    <textarea name="msg" placeholder="Type your comment here" id="commentbox" rows="3" className="form-control my-2" style={{backgroundColor: '#2d0b00', color: '#ffe259', borderColor: '#ffb347', resize: 'none', boxShadow: '0 0 6px #d7263d'}} draggable="false"></textarea>
                  </div>
                  <div className="col-auto d-flex align-items-end">
                    <button type="button" className="btn btn-dark my-2" style={{fontWeight: 'bold', width: 'auto', minWidth: 0, padding: '0.375rem 1.25rem', border: '2px solid #ffb347', color: '#ffe259', background: '#2d0b00'}} disabled>Sign in to post</button>
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
                        {/* Existing comments will be dynamically added here */}
                        <div className="spinner-border text-warning m-auto mt-5" role="status">
                          <span className="visually-hidden">Loading...</span>
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
    </div>
  )
}

export default LearnPage
