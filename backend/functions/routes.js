const express = require('express');
const cors = require('cors'); // Importa il pacchetto cors
const router = express.Router();
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Importa il middleware cors
router.use(cors());

router.get('/', (req, res) => {
  res.send('Cazzo ci fai qui');
});

router.get('/api/v1/generateMessage', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    let { name, details, message } = req.query;

    // Imposta valori di default se i parametri non sono presenti nella query
    name = name || "Drake";
    message = message || "Ciao";

    try {
        // Access your API key as an environment variable (see "Set up your API key" above)
        const genAI = new GoogleGenerativeAI('AIzaSyDhyZXhzz2-fzEOyHNw9wPrWTG5d926MH0');

        async function run() {
            // For text-only input, use the gemini-pro model
            const model = genAI.getGenerativeModel({ model: "gemini-pro"});

            const prompt = `Rispondi al messaggio come se fossi ${name}. Caratteristiche aggiuntive di ${name}: "${details}". Rispondi molto brevemente in modo informale (più o meno 10 parole), come se fosse un messaggio di chat, quindi non essere specifico ed esaustivo. Mostra solo il messaggio, senza firma o altri dettagli. Messaggio: '${message}'`;

            console.log(prompt);

            const result = await model.generateContent(prompt);
            
            const response = await result.response;
            const text = response.text();

            const jsonResponse = {
                "name": name,
                "message": text,
                "timestamp": Date.now()
            }

            res.json(jsonResponse);
        }
          
        run();
    } catch (error) {
        console.error('Errore durante la richiesta API:', error);
        res.status(500).json({'error': error});
    }
});

router.get('/api/v1/generateMessageLong', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    let { name, details, message } = req.query;

    // Imposta valori di default se i parametri non sono presenti nella query
    name = name || "Drake";
    message = message || "Ciao";

    try {
        // Access your API key as an environment variable (see "Set up your API key" above)
        const genAI = new GoogleGenerativeAI('AIzaSyDhyZXhzz2-fzEOyHNw9wPrWTG5d926MH0');

        async function run() {
            // For text-only input, use the gemini-pro model
            const model = genAI.getGenerativeModel({ model: "gemini-pro"});

            const prompt = `Rispondi al messaggio come se fossi ${name}. Caratteristiche aggiuntive di ${name}: "${details}". Rispondi molto brevemente in modo informale come se fosse un messaggio di chat. Mostra solo il messaggio, senza firma o altri dettagli. Messaggio: '${message}'`;

            console.log(prompt);

            const result = await model.generateContent(prompt);
            
            const response = await result.response;
            const text = response.text();

            const jsonResponse = {
                "name": name,
                "message": text,
                "timestamp": Date.now()
            }

            res.json(jsonResponse);
        }
          
        run();
    } catch (error) {
        console.error('Errore durante la richiesta API:', error);
        res.status(500).json({'error': error});
    }
});

router.get('/api/v2/generateMessageLong', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    let { name, message, pastMessages } = req.query;

    // Imposta valori di default se i parametri non sono presenti nella query
    name = name || "Drake";
    message = message || "Ciao";

    try {
        // Access your API key as an environment variable (see "Set up your API key" above)
        const genAI = new GoogleGenerativeAI('AIzaSyDhyZXhzz2-fzEOyHNw9wPrWTG5d926MH0');

        async function run() {
            // For text-only input, use the gemini-pro model
            const model = genAI.getGenerativeModel({ model: "gemini-pro"});

            const prompt = `Rispondi al messaggio come se fossi ${name} basandoti anche sui messaggi precedenti. I messaggi precedenti sono: '${pastMessages}' Rispondi molto brevemente in modo informale come se fosse un messaggio di chat. Mostra solo il messaggio, senza firma o altri dettagli. Messaggio a cui rispondere: '${message}'`;

            console.log(prompt);

            const result = await model.generateContent(prompt);
            
            const response = await result.response;
            const text = response.text();

            const jsonResponse = {
                "name": name,
                "message": text,
                "timestamp": Date.now()
            }

            res.json(jsonResponse);
        }
          
        run();
    } catch (error) {
        console.error('Errore durante la richiesta API:', error);
        res.status(500).json({'error': error});
    }
});

router.get('/api/v1/googleImages', (req, res) => {
    const { name } = req.query;
    const { getJson } = require("serpapi");

    getJson({
        engine: "google_images",
        q: name,
        location: "Austin, TX, Texas, United States",
        api_key: "5d23ebf14944cbee078b5d98a646c186756eb088e7f1df3e9001d358c3e60715"
    }, (json) => {
       res.json(json);
    });
});

router.get('/api/v2/googleImages', (req, res) => {
    const searchQuery = req.query.q;
    function getImageLinks(searchQuery) {
        if (!searchQuery) {
            searchQuery = "user icon";
        }
        const url = `https://www.google.com/search?udm=2&q=${searchQuery}`;
        return axios.get(url)
            .then(response => {
                const $ = cheerio.load(response.data);
                const imageLinks = [];
                $('img').each((index, element) => {
                    const src = $(element).attr('src');
                    if (src && src.startsWith('https://')) {
                        imageLinks.push(src);
                    }
                });
                return imageLinks;
            })
            .catch(error => {
                console.error("Errore durante la richiesta HTTP:", error);
                return [];
            });
    }
    getImageLinks(searchQuery)
        .then(imageLinks => {
            res.json({ image_links: imageLinks });
        })
        .catch(error => {
            console.error("Errore durante il recupero dei link delle immagini:", error);
            res.status(500).json({ error: "Errore interno del server" });
        });
});

module.exports = { router };