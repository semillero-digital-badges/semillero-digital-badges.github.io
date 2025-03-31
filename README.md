# Digital Badges and Participatory Design - Project Documentation

## Project Overview
- **Provisional Project Name:** Digital Badge System to Encourage Engagement in Telegram Learning Communities.
- **Description:** This project develops a web platform integrated with Telegram to manage a digital badge system in a learning community. Through a participatory approach, members design and self-claim badges according to their learning objectives. The platform allows logging interactions, visualizing badges, and generating automatic notifications in the Telegram group, in order to analyze the impact of badges on engagement.
- **Problem to solve:** To address the lack of learning objectives in the research group through a digital badge system with participatory design.
- **Technology Stack:** HTML, CSS, JavaScript, Firebase Database, GitHub Pages, Telegraf.js
- **Provisional Goals:** Design an interface to enhance self-monitoring skills through an innovative behavior-informed approach in UX Learning.
- **Scope:**
1. Includes:

- Participatory design of digital badges with the research group members.
- Implementation of a system where members select, manage, and obtain badges.
- Integration with Telegram for notifications and stickers.
- Analysis of engagement and badge effectiveness.

2. Excludes:

- A complex gamification system with points and levels.
- Integration with external platforms beyond Telegram and GitHub.
- An in-depth analysis of impact on academic performance (at least in this phase).

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
│   │   ├── badges/
│   │   │   ├── badge1.png
│   │   │   ├── badge2.png
│   │   │   ├── badge3.png
│   │   │   ├── badge4.png
│   │   │   └── badge5.png
│   │   ├── stickers/
│   │   │   ├── badge1.webp
│   │   │   ├── badge2.webp
│   │   │   ├── badge3.webp
│   │   │   ├── badge4.webp
│   │   │   └── badge5.webp
│   ├── icons/
│   ├── fonts/
│
│-- docs/
│   ├── research_notes.md
│   ├── usability_testing.md
│   ├── user_feedback.md
│   ├── design_decisions.md
│   ├── wireframes/

```
- `index.html` → Main page structure.
- `style.css` → Styling and design.
- `script.js` → Handles interactivity & logging.
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
- [ ] **Bot Integration** → Sends automated messages in the Telegram group when users earn badges.

---
## Technical Stack
### **Frontend**
- **HTML/CSS/JS** (for the interface)
- **Firebase Database** (for data storage and interactions tracking)
- **GitHub Pages** (for hosting the website)
- **JavaScript (client-side logic, handling interactions and storing data in Firebase)**
- **Telegram Bot using Telegraf.js** (for announcements of new badges earned)

---
## First plan of Data Collection & Reproducibility
To ensure transparency and rigor in research:
1. **Version Control with GitHub:**
   - All changes will be committed with meaningful messages.
   - Commits Conventions: commits will follow this structure format:
      - `fix:` → Fixing errors.
      - `docs:` → Documentation changes.
      - `style:` → Format changes without changing functionality.
      - `refactor:` → Code improvements without changing its functionality.
      - `test:` → To add or change tests.

2. **Logging & Data Storage:**
   - User actions (badge selection, earned badges, page interactions, clicks, and views) will be stored in Firebase Realtime Database.
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

- [ ] Design a simple **static dashboard** to display badges.
- [ ] Connect the **Telegram bot** to automatically post updates.
- [ ] Test the interface for usability & refine based on feedback.

---

## Change Log

This project is updated on an iterative basis. The most relevant changes are detailed below:

### [31/03/2025]
-  **Implemented log in function**  
  - A function was integrated to allow users to quickly log in when entering the page by answering a security question.

-  **GitHub was integrated with Firestore Database**  
  - Connected GitHub with Firestore Database via database config. Now, the page can dynamically take the data of participants' names, security questions and answers, badges listing. In addition, the page can overwrite the database, automatically adding in Firestore the badges assigned and claimed by the participants. 

-  **UI/UX Design**  
  - The first prototype design was developed in Figma that includes: a tab for quick use guide at the start, a tab for the dashboard that contains: a button with the list of badges and their respective buttons to assign or claim them, a button with the names of the participants that when selecting each one shows their respective badges.

-  **Changed integration with WhatsApp to Telegram**  
  - Integration with WhatsApp was replaced due to its restrictions with bots in groups.  
  - Now, the system uses Telegram and a bot with `Telegraf.js` to send automatic notifications when badges are claimed.  

-  **Improved file structure**  
  - Reorganized the `/assets/images/` folder, splitting badges into `badges/` and `stickers/`.  
  - Moved `/wireframes/` into the `/docs/` folder for better organization.  

-  **Documentation update**  
  - Revised README to reflect changes in the Telegram integration.  
  - Updated `design_decisions.md` and `research_notes.md` to document the new interaction flow. 

---
### Notes & Challenges

- Consider ways to export interaction data for later analysis while maintaining privacy.

---

This document will be updated continuously to reflect any changes, challenges, and progress.
