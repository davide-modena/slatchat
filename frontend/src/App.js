import Navbar from './components/Navbar';
// import Contacts from './components/Contacts';
import AddChat from './components/AddChat';
import Chat from './components/Chat';

import { useState } from 'react';

function App() {
  const [contact, setContact] = useState("");

  const handleCreateContact = (name, details) => {
      // Aggiungi il nuovo contatto alla lista dei contatti
      const newContact = {
          name: name,
          details: details
      };
      setContact(newContact);
  }

  return (
    <div>
      {!contact ? (
        <>
        <Navbar/>
        <AddChat
          onCreateContact={handleCreateContact}
        />
        </>
      ) : (
        <Chat contact={contact} />
      )}
    </div>
  );
}

export default App;