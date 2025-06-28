const express = require('express');
const router = express.Router();

// In-memory comments store (replace with DB in production)
let comments = [];

// Get comments for a mechanic
router.get('/:mechanicTitle', (req, res) => {
  const { mechanicTitle } = req.params;
  const mechanicComments = comments.filter(c => c.mechanicTitle === mechanicTitle);
  res.json(mechanicComments);
});

// Post a new comment or reply
router.post('/', (req, res) => {
  const { mechanicTitle, user, comment, parentId, replyToUser } = req.body;
  if (!mechanicTitle || !user || !comment) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  let finalParentId = parentId || null;
  let finalComment = comment;

  // If replying to a reply, find the top-level parent and prepend @username
  if (parentId && replyToUser) {
    // Find the parent comment
    let parent = comments.find(c => c.id === parentId);
    // Traverse up to the top-level parent
    while (parent && parent.parentId) {
      parent = comments.find(c => c.id === parent.parentId);
    }
    if (parent) {
      finalParentId = parent.id;
    }
    // Prepend @username in bold markdown
    finalComment = `**@${replyToUser}** ${comment}`;
  }

  const newComment = {
    id: Date.now(),
    mechanicTitle,
    user,
    comment: finalComment,
    date: new Date().toISOString(),
    parentId: finalParentId,
    replies: []
  };
  comments.push(newComment);
  res.status(201).json(newComment);
});

module.exports = router;
