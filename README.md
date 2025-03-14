# Digital Badges and Participatory Design - Project Documentation

## Project Overview
**Provisional Project Name:** Digital Badge System to Encourage Engagement in WhatsApp Learning Communities.
**Description:** This project develops a web platform integrated with WhatsApp to manage a digital badge system in a learning community. Through a participatory approach, members design and self-claim badges according to their learning objectives. The platform allows logging interactions, visualizing badges and generating automatic notifications in the WhatsApp group, in order to analyze the impact of badges on engagement.
**Technology Stack:** HTML, CSS, JavaScript, Firebase, GitHub Pages  
**Provisional Goals:** Design an interface to enhance self-monitoring skills through an innovative behavior-informed approach in UX Learning.

---
## Project Structure
```
/digital-badges
│-- index.html
│-- style.css
│-- script.js
│-- database-config.js
│-- assets/
│   ├── images/
│   ├── icons/
│   ├── fonts/
│
│-- docs/
│   ├── research_notes.md
│   ├── usability_testing.md
│   ├── user_feedback.md
│   ├── design_decisions.md
```
- `index.html` → Main page structure.
- `style.css` → Styling and design.
- `script.js` → Handles interactivity & logging.
- `database-config.js` → Firebase configuration & interaction with Firestore.
- `assets/` → Folder containing images, icons, and other media.
- `docs/` → Documentation & notes about project development.
- `wireframes/` → Folder with wireframes images.

---
## Provisional Research Goals
- Investigate user engagement with digital badges in an educational technology setting.
- Explore how participatory design affects user motivation and interaction.
- Analyze interaction data (clicks, time spent, navigation patterns, comments/reactions).
- Study self-monitoring behaviors in learning environments.

---
## Features & First Implementation Plan
- [ ] **Login with Custom Questions** → Users enter a name and set a security question & answer.
- [ ] **Badge Selection** → Users select badges they want to work on.
- [ ] **Automatic Badge Assignment** → Users can claim badges themselves.
- [ ] **Dashboard** → Displays earned and available badges.
- [ ] **Interaction Tracking** → Collects data on user interactions (clicks, views, and time spent).
- [ ] **Bot Integration** → Sends automated messages in WhatsApp group when users earn badges.
- [ ] **Comment & Reactions System** → Users can comment on badges and react with emojis.

---
## Technical Stack
### **Frontend**
- **HTML/CSS/JS** (for the interface)
- **Firebase Firestore** (for data storage and interactions tracking)
- **GitHub Pages** (for hosting the website)
- **JavaScript (client-side logic, handling interactions and storing data in Firestore)**
- **WhatsApp Bot** (for announcements of new badges earned)

---
## First plan of Data Collection & Reproducibility
To ensure transparency and rigor in research:
1. **Version Control with GitHub:**
   - All changes will be committed with meaningful messages.
   - Commits will follow a structured format: `feat:`, `fix:`, `docs:`, etc.

2. **Logging & Data Storage:**
   - User actions (badge selection, earned badges, page interactions, clicks, and views) will be stored in Firebase Firestore.
   - Data will be anonymized where possible (e.g., using participant IDs instead of real names).

3. **Documentation:**
   - This document serves as the main research log.
   - Maintain version history through GitHub commits.
   - Store research notes in `docs/`.

4. **Ensuring Reproducibility:**
   - Provide a `README.md` with setup instructions.
   - Open-source the code.
   - Document any external dependencies (e.g., Firebase setup).

---

## Next Steps
- [ ] **Set up Firebase Firestore for data collection**.
- [ ] Implement the **question-based authentication system**.
- [ ] Design a simple **static dashboard** to display badges.
- [ ] Connect the **WhatsApp bot** to automatically post updates.
- [ ] Test the interface for usability & refine based on feedback.

---
### Notes & Challenges
- Investigate options for adding comments/reactions to the dashboard.
- Ensuring only study participants access their data while keeping the interface simple (username + security question vs. other authentication methods).
- Consider ways to export interaction data for later analysis while maintaining privacy.

---

This document will be updated continuously to reflect any changes, challenges, and progress.
