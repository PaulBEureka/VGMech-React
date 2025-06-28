require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library');
const commentsRouter = require('./comments.cjs');

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID; // Use the same client ID as in your frontend
const client = new OAuth2Client(CLIENT_ID);

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/auth/google', async (req, res) => {
  const { credential } = req.body;
  if (!credential) {
    return res.status(400).json({ error: 'Missing credential' });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();

    // You can now use payload info (email, name, sub, etc.)
    // Here you could create a session, JWT, or user record as needed
    // For demo, just return the payload
    res.json({
      success: true,
      user: {
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        sub: payload.sub, // Google's user ID
      },
      // Optionally: your own session token here
    });
  } catch (err) {
    console.error('Token verification error:', err);
    if (err instanceof Error && err.response) {
      console.error('Google error response:', err.response.data);
    }
    res.status(401).json({ error: 'Invalid or expired token', details: err.message });
  }
});

app.use('/api/comments', commentsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
