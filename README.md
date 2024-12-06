# News Application

A modern news application built with React that fetches and displays news articles from various sources using the News API.

## Features

- Browse latest news articles
- Responsive design
- Read full articles on source websites

## Technologies Used

- React
- News API
- CSS Modules
- React Router
- Context API

## Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/Martynas-Mockapetris/NewsApp.git
```

```bash
npm install
```

## Create .env file and add your News API key in backend
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=3000
```

## - Project Structure and Scripts:
```
├── frontend/ 
    ├── src/ │ 
        ├── components/ │ 
        ├── context/ 
        ├── pages/ 
        ├── styles/ 
    └── App.jsx 
└── package.json 
├── backend/ 
    ├── controllers/ 
    ├── models/ 
    ├── routes/ 
    ├── middleware/ 
    └── server.js
```

## Available Scripts

Frontend:
- `npm run dev` - Starts development server
- `npm run build` - Creates production build
- `npm run preview` - Preview production build locally

Backend:
- `npm start` - Starts production server
- `npm run dev` - Starts development server with nodemon

## Contributing

Feel free to submit issues and pull requests.
