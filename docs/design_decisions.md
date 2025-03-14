# Design Decisions

## Overview  
This document outlines key design decisions made during the development of this project. It provides insight into the rationale behind choices related to user experience, technology, and functionality.

## 1. Authentication Method  
**Decision:** Instead of using traditional login credentials, users select their name from a dropdown list and verify their identity with a security question.  
**Reasoning:** This approach simplifies the user experience, removes password management burdens, and maintains a lightweight authentication method suitable for our use case.  

## 2. Badge Claim System  
**Decision:** Users can self-claim badges without approval, and all actions are logged and announced in a WhatsApp bot.  
**Reasoning:** Encourages autonomy, aligns with the participatory design approach, and increases engagement through real-time feedback.  

## 3. Frontend-Only Approach with Firebase  
**Decision:** The web application is built as a static site hosted on GitHub Pages, with Firebase used as the backend for data storage.  
**Reasoning:** Hosting on GitHub Pages ensures free and reliable deployment, while Firebase provides real-time database capabilities without requiring server management.  

## 4. Minimalist UI Design  
**Decision:** The interface prioritizes simplicity, with collapsible sections and inline interactions instead of page redirections.  
**Reasoning:** Reduces cognitive load, keeps users focused on their progress, and ensures a seamless experience on both mobile and desktop devices.  

## 5. WhatsApp Integration for Engagement  
**Decision:** A bot notifies the WhatsApp group when users interact with badges (claiming, removing, or attempting new ones).  
**Reasoning:** Reinforces social accountability, fosters engagement, and utilizes an already familiar communication channel.  

---

This document will be updated as new design decisions are made.
