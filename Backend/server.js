

/*
const express = require('express');
const cors = require('cors');

const actualityRoute = require('./routes/actuality');
const userRoute = require('./routes/user');

require('./config/connect');

const app = express();


app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/actuality', actualityRoute);
app.use('/user', userRoute);

app.use('/getimage', express.static('./uploads'));



app.listen(3000, () => {
    console.log('Server running on http://127.0.0.1:3000');
});


*/



const express = require('express');
const http = require('http'); // Nécessaire pour créer un serveur HTTP
const cors = require('cors');
const { Server } = require('socket.io'); // Import de Socket.IO

// Import des routes
const actualityRoute = require('./routes/actuality');
const userRoute = require('./routes/user');

// Connexion à la base de données
require('./config/connect');

// Création de l'application Express
const app = express();

// Configuration CORS
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware pour parser les données JSON
app.use(express.json());

// Configuration des routes
app.use('/actuality', actualityRoute);
app.use('/user', userRoute);

// Servir les images
app.use('/getimage', express.static('./uploads'));

// Création d'un serveur HTTP combiné pour Express et Socket.IO
const httpServer = http.createServer(app);

// Configuration de Socket.IO
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:4200', // Permettre les connexions depuis votre frontend
        methods: ['GET', 'POST']
    }
});

// Gestion des événements Socket.IO
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Événement personnalisé pour écouter un message
    socket.on('message', (data) => {
        console.log('Message received:', data);

        // Réponse au client
        socket.emit('response', { message: 'Message received successfully!' });
    });

    // Gérer la déconnexion
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Lancement du serveur sur le port 3000
httpServer.listen(3000, () => {
    console.log('Server running on http://127.0.0.1:3000');
});
