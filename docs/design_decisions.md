# Design Decisions

## Overview  
This document outlines key design decisions made during the development of this project. It provides insight into the rationale behind choices related to user experience, technology, and functionality.

## 1. Authentication Method  
**Decision:** Instead of using traditional login credentials, users select their name from a dropdown list and verify their identity with a security question.  
**Reasoning:** This approach simplifies the user experience, removes password management burdens, and maintains a lightweight authentication method suitable for our use case.  

## 2. Badge Claim System  
**Decision:** Users can self-claim badges without approval, and all actions are logged and announced in a Telegram bot.  
**Reasoning:** Encourages autonomy, aligns with the participatory design approach, and increases engagement through real-time feedback.  

## 3. Frontend-Only Approach with Firebase  
**Decision:** The web application is built as a static site hosted on GitHub Pages, with Firebase used as the backend for data storage.  
**Reasoning:** Hosting on GitHub Pages ensures free and reliable deployment, while Firebase provides real-time database capabilities without requiring server management.  

## 4. Minimalist UI Design  
**Decision:** The interface prioritizes simplicity, with collapsible sections and inline interactions instead of page redirections.  
**Reasoning:** Reduces cognitive load, keeps users focused on their progress, and ensures a seamless experience on both mobile and desktop devices.  

## 5. Telegram Integration for Engagement instead of WhatsApp
**Decision:** Use Telegram instead of WhatsApp, due to limitations for bot integration. WhatsApp does not allow bots to send messages in groups. BothFather (native bot in Telegram) will be use to send notifications in a group to stimulate  user interaction with mates and badges. 
**Decision:** Use Telegram instead of WhatsApp due to limitations for bot integration. WhatsApp does not allow bots to send messages in groups. A Telegram bot using `telegraf.js` and a webhook sends notifications to a group to stimulate user interaction with mates and badges.  

## 6. Webhook for Badge Claims  
**Decision:** Instead of Firebase Cloud Functions, a webhook is used to process badge claims and trigger Telegram notifications.  
**Reasoning:** This avoids enabling billing in Firebase and keeps the system lightweight, leveraging external webhook services to handle the logic.

## 7. Deployment and Hosting  
**Decision:** The website is hosted on GitHub Pages, and Firebase is used for backend operations.  
**Reasoning:** GitHub Pages provides free static site hosting, reducing maintenance overhead. However, the lack of backend support requires Firebase or an external service to handle dynamic data operations.

---

This document will be updated as new design decisions are made.
