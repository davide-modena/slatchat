import './css/Chat.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import spunta from './../spunta.svg';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chat = ({contact}) => {
    const [searchInput, setSearchInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [imageSrc, setImageSrc] = useState("");
    const contentRef = useRef(null);

    useEffect(() => {
        const getGoogleImage = async () => {
            try {
                // ogni 3 mesi bisogna fare il login su https://davidemodena.eu.pythonanywhere.com per far funzionare l'api v2/googleImages. Prossima Scadenza: 07/08/2024
                const jsonFile = await axios.get(`https://dreamchatbackend.netlify.app/.netlify/functions/server/api/v2/googleImages?q=${contact.name}`);
                if (jsonFile.data.image_links.length > 0) {
                    setImageSrc(jsonFile.data.image_links[0]);
                } else {
                    setImageSrc('https://picsum.photos/200');
                }
            } catch (error) {
                console.error("Errore durante il recupero delle immagini:", error);
            }
        };
    
        if (contact && contact.name) {
            getGoogleImage();
        }
    },[contact])

    function messagesToString(msgs) {
        let s = '[';
        msgs.forEach(msg => {
            s+=`{sender:${msg.sender},message:${msg.message}}`;
        });
        s += ']';
        return s;
    }

    const handleSubmit = async () => {
        if(searchInput){
            // Creare una nuova copia dell'array messages e aggiungere il nuovo messaggio
            const newMessage = {
                sender: "me",
                message: searchInput,
                timestamp: Date.now()
            };
            const updatedMessages = [...messages, newMessage];
        
            // Aggiornare lo stato messages con la nuova copia dell'array contenente tutti i messaggi
            setMessages(updatedMessages);

            // Scorrere fino alla parte inferiore del contenuto della chat
            // contentRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
            document.querySelector('.messages').scrollTo(0, 15000);
        
            // Azzerare lo stato dell'input
            setSearchInput("");
        
            // Azzerare il valore dell'input direttamente sull'elemento input
            document.getElementById("chat-input").value = "";
            document.getElementById("contact-state").innerHTML = "sta scrivendo...";

            try{
                // Effettuare altre operazioni come necessario
                // const messageJSON = await axios.get(`https://dreamchatbackend.netlify.app/.netlify/functions/server/api/v1/generateMessageLong?name=${contact.name}&details=${''}&message=${searchInput}`);

                const messageJSON = await axios.get(`https://dreamchatbackend.netlify.app/.netlify/functions/server/api/v2/generateMessageLong?name=${contact.name}&pastMessages=${messagesToString(messages)}&message=${searchInput}`);
                const receivedMessage = messageJSON.data.message.replace("\"","");
            
                // Aggiungere il messaggio ricevuto alla fine dell'array dei messaggi
                const newReceivedMessage = {
                    sender: "you",
                    message: receivedMessage,
                    timestamp: Date.now()
                };
                const updatedMessagesWithReceivedMessage = [...updatedMessages, newReceivedMessage];

                document.getElementById("contact-state").innerHTML = "online";
            
                // Aggiornare lo stato messages con la nuova copia dell'array contenente tutti i messaggi, incluso il messaggio ricevuto
                setMessages(updatedMessagesWithReceivedMessage);
                document.querySelector('.content').scrollTo(0, 15000);
            }
            catch(error){
                // const errorMessage = {
                //     sender: "you",
                //     message: error.message,
                //     timestamp: Date.now()
                // };
                document.getElementById("contact-state").innerHTML = "online";
                console.log(error);
                // const updateMessageWithError = [...messages, errorMessage];
                // setMessages(updateMessageWithError);
            }
        }
    }

    const handleChange = (event) => {
        setSearchInput(event.target.value);
    }

    function formatTime(timestamp){
        const hours = new Date(timestamp).getHours().toString().padStart(2, '0');
        const minutes = new Date(timestamp).getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    return (
        <>
            <div className="header">
                <div className="header-content">
                    <FontAwesomeIcon icon={faChevronLeft} className="icon" onClick={()=>{window.location.href=""}}/>
                    <img src={imageSrc}/>
                    <div className="text">
                        <h3>{contact.name}</h3>
                        <p id="contact-state">online</p>
                    </div>
                </div>
            </div>
            <div className="content" >
                <div className="messages" ref={contentRef}>
                    {messages.map((message) => (
                        <div className={`chat-message ${message.sender}`}>
                        <span className="text">
                            {message.message}
                            <span className="details">{formatTime(message.timestamp)} <img src={spunta}/></span>
                        </span>
                    </div>
                    ))}
                    <div ref={contentRef} />
                </div>
                
            </div>
            <div className="footer">
                <div className="footer-content">
                    <input
                        id="chat-input"
                        type="text"
                        placeholder="Scrivi qui"
                        onChange={handleChange}
                        onKeyPress={(event)=>{if(event.key === "Enter"){handleSubmit()}}}/>
                    <FontAwesomeIcon 
                        icon={faPaperPlane} 
                        className={`icon ${searchInput ? 'active' : ''}`} 
                        onClick={handleSubmit}/>
                    </div>
            </div>
        </>
    );
}
 
export default Chat;