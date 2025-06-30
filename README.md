# VisualMech (VGMech-React)

VisualMech is an interactive learning platform for exploring and understanding game mechanics. Built with React and Vite, it features interactive Unity WebGL demos, code samples, and a social comment system.

## Features

- **Interactive Demonstrations:**

  - Each mechanic page includes a Unity WebGL demo. Click "Click to Start Demo" to enable audio and interaction.
  - Fullscreen support for Unity demos.

- **Code Implementation:**

  - View and copy C# code samples for each mechanic.

- **Comment System:**

  - Sign in with your Google account to post comments and replies.
  - Replies are shown in a single thread under each top-level comment (YouTube-style).
  - Replies to replies are posted as direct children of the top-level comment, with an @username mention.
  - Delete your own comments and replies.

- **User Authentication:**

  - Google sign-in via Firebase Authentication.
  - User avatars and names are shown in the navbar and comment section.

- **Modern UI:**
  - Responsive, game-inspired design with custom branding and logo.

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/VGMech-React.git
   cd VGMech-React
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Set up Firebase:

   - Create a Firebase project at [firebase.google.com](https://firebase.google.com/).
   - Enable Authentication (Google sign-in) and Realtime Database.
   - Copy your Firebase config to `src/firebase.js` (see the template in the repo).
   - Set your Realtime Database rules to allow users to delete their own comments (see below).

4. Start the development server:

   ```sh
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Firebase Realtime Database Rules Example

```json
{
  "rules": {
    "comments": {
      "$mechanic": {
        "$commentId": {
          ".read": true,
          ".write": "auth != null && (data.child('userId').val() === auth.uid || !data.exists())"
        }
      }
    }
  }
}
```

## Project Structure

- `src/pages/LearnPage.jsx` — Main mechanic page with Unity demo, code, and comments
- `src/components/Navbar.jsx` — Navigation bar with user info
- `src/components/MechanicListings.jsx` — List of available mechanics
- `src/assets/JSONs/Learn.json` — Mechanic data
- `src/assets/User_Manual_VGMech.pdf` — Full user manual (see for detailed instructions)

## Usage

- Browse mechanics from the home page.
- Click a mechanic to view its demo, code, and comments.
- Sign in to post comments or replies.
- Replies to replies are shown as direct children of the main comment, with @username mention.
- Only the author can delete their own comments/replies.

## For More Information

See the full user manual at `src/assets/User_Manual_VGMech.pdf` for detailed instructions, screenshots, and feature explanations.

---

Built with React, Vite, Firebase, and Unity WebGL.
