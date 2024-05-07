import './css/AddChat.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentMedical } from '@fortawesome/free-solid-svg-icons';

import { useState, useEffect } from 'react';

const Contacts = ({ onCreateContact }) => {
    const [name, setName] = useState("");
    const [details, setDetails] = useState("");

    const handleClick = () => {
        if (name !== "") {
            // Richiama la funzione di callback passando i valori degli input
            onCreateContact(name, details);
            // Resetta gli input dopo la creazione del contatto
            setName("");
            setDetails("");
        }
    }

    return (
        <div className="add-chat">
            <h1>Con chi vuoi scrivere?</h1>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Inserisci il nome..." onKeyPress={(event) => {if(event.key == "Enter"){handleClick()}}}/>
            {/* <h1>Dettagli</h1>
            <textarea type="text" value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Inserisci i dettagli..." /> */}
            <button onClick={handleClick}>Crea contatto</button>
        </div>
    );
}
 
export default Contacts;