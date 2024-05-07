// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCATDsy4ycYEUPKlqMRa7JwAZLoPnsMpog",
//   authDomain: "dreamchat-651c7.firebaseapp.com",
//   projectId: "dreamchat-651c7",
//   storageBucket: "dreamchat-651c7.appspot.com",
//   messagingSenderId: "878754781386",
//   appId: "1:878754781386:web:5ecaed8f2bf8b3068cfc33",
//   measurementId: "G-MC035SJCMC"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const express = require('express');
const serverless = require('serverless-http');
const { router } = require('./routes'); // Importa il router dalle routes
const cors = require('cors');
const path = require('path');
const app = express();

// Importa il middleware cors
app.use(cors());

app.use(express.json());

// Usa il router per le route definite
app.use('/', router);

// Definisci il port
const PORT = process.env.PORT || 5000;

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server in esecuzione sulla porta ${PORT}`);
});

// Utilizza serverless per la compatibilità con Netlify
app.use('/.netlify/functions/server', router);
module.exports.handler = serverless(app);