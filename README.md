# 🎵 Music Hub - A Modern Web-Based Music Player

## 1. Introduction

Welcome to **Music Hub**, a sleek and modern web-based music player application. This multi-page, fully responsive music player is built using **HTML5**, **CSS3**, and **modern JavaScript**. It features a clean, intuitive user interface inspired by leading music streaming platforms, complete with smooth animations and a consistent design.

Music Hub offers a full in-browser music experience—play music, explore genres, discover artists, and manage favorites.

---

## 2. Features

### 🌟 General Features
- Fully responsive design for desktop, tablet, and mobile
- Smooth animations powered by GSAP
- Multi-page layout with consistent styling and behavior

### 🧩 Page Highlights

#### 🔸 `title.html` - Animated Title Page
- Animated splash screen using GSAP
- Automatic redirection to the main player

#### 🔸 `home.html` - Main Player (Core Page)
- Real-time music controls (play, pause, next, previous)
- Circular progress bar animation
- “Now Playing” updates dynamically with artwork and details

#### 🔸 `music.html` - Explore Music
- Sections like **Trending Now**, **New Releases**, and **Popular Playlists**
- Visual grid layout with cards

#### 🔸 `users.html` - Artists & Curators
- Browse profiles of artists and curators
- Profile cards with avatar, name, and role

#### 🔸 `heart.html` - Favorites
- Separate views for Favorite Songs and Favorite Artists
- Grid layout for favorited content

#### 🔸 `profile.html` - User Profile
- Large avatar and user bio
- Follower/Following stats
- Sections for Recently Played and Public Playlists

---

## 3. Tech Stack

- **HTML5** – Page structure
- **CSS3** – Styling and layout (Flexbox, Grid, Media Queries)
- **JavaScript (ES6)** – App logic and interactivity
- **GSAP** – Animations and transitions

---

## 4. File Structure
/MusicHub/
│
├── title.html # Splash screen
├── home.html # Main player UI
├── music.html # Explore page
├── users.html # Artist browser
├── heart.html # Favorites page
├── profile.html # User profile
│
├── /assets/ # (Optional) Add your .mp3 files here
│ ├── song1.mp3
│ └── song2.mp3
│
├── README.md # Project documentation
├── LICENSE.md # MIT License

yaml
Copy
Edit





---

## 5. How to Use

1. **Download the project files**
2. *(Optional)* Add your `.mp3` files to `/assets/`
3. *(Optional)* Update the `songs` array inside `home.html`:
   ```js
   const songs = [
     { title: "Song Name", artist: "Artist Name", url: "assets/song1.mp3" },
     ...
   ];
