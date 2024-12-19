Ecommerce-Project/
├── backend/               # Backend - API RESTful
│   ├── models/            # Modele ORM (entități)
│   ├── routes/            # Endpoint-uri (ex: /products, /auth)
│   ├── controllers/       # Logica pentru rute
│   ├── middleware/        # JWT auth middleware
│   ├── config/            # Configurare bazei de date și variabile de mediu
│   ├── .env               # Variabile de mediu
│   ├── server.js          # Pornirea serverului
│   └── package.json       # Configurarea backend-ului
│
├── frontend/              # Frontend SPA (React/Vite)
│   ├── public/            # Fișiere statice
│   ├── src/
│   │   ├── components/    # Componente reutilizabile
│   │   ├── pages/         # Pagini principale (Homepage, Login, Cart)
│   │   ├── redux/         # Store pentru gestionarea stării (Redux Toolkit)
│   │   ├── App.jsx        # Componenta principală
│   │   └── main.jsx       # Punctul de intrare
│   ├── .env               # Variabile de mediu
│   └── package.json       # Configurarea frontend-ului
│
└── docker-compose.yml     # Configurare Docker (ex: MongoDB, PostgreSQL)




client/
├── public/                  # Fișiere statice
├── src/
│   ├── components/          # Componente reutilizabile (Navbar, ProductCard, etc.)
│   ├── pages/               # Pagini principale (Homepage, Login, Register, Cart)
│   ├── redux/               # Store Redux și slices
│   ├── hooks/               # Hooks personalizate
│   ├── App.jsx              # Configurare rute principale
│   ├── main.jsx             # Punctul principal de intrare
│   └── index.css            # Stiluri globale
└── package.json