# NewsExplorer

NewsExplorer is a full-stack web application developed as the final project for the TripleTen Software Engineering program.

The app allows users to search for news articles, save them to a personal profile, and manage saved content through an authenticated account.

---

## Features

- User registration, login, logout, and protected routes (JWT-based authentication)
- NewsAPI integration with keyword and date-filtered searches
- Persistent article saving and deletion for each user
- Fully responsive design across all screen sizes
- Client-side form validation and real-time user feedback
- Clean reusable component architecture (React + custom hooks)

---

## Technologies

### Frontend

- React (Vite)
- React Router
- React Context API
- Custom Hooks
- Pure Fetch API (no Axios or third-party HTTP clients)
- BEM CSS architecture
- NewsAPI.org (third-party API)

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Celebrate / Joi Validation
- Winston Logger
- Centralized Error Handling

---

## Deployment

The frontend is deployed to GitHub Pages:  
**https://unfrank.github.io/news-explorer-frontend/**

The backend API communicates with:  
**http://localhost:3000**

## Third-Party APIs

- NewsAPI.org (https://newsapi.org/v2/everything)
