import './css/Contacts.css';

const Contacts = () => {
    return (
        <div class="contacts mobile-container">
            <div className="contact">
                <div className="contact-info">
                    <img alt="" src="https://upload.wikimedia.org/wikipedia/commons/2/21/Johnny_Depp_2020.jpg"/>
                    <div className="text">
                        <h3>Johnny Depp</h3>
                        <p>Ciao bro, come va?</p>  
                    </div>
                </div>
                <div className="updates">
                    <div className="time">11:43</div>
                    <div className="new-message centered">1</div>
                </div>
            </div>
            <div className="contact">
                <div className="contact-info">
                    <img alt="" src="https://upload.wikimedia.org/wikipedia/commons/2/21/Johnny_Depp_2020.jpg"/>
                    <div className="text">
                        <h3>Johnny Depp</h3>
                        <p>Ciao bro, come va?</p>  
                    </div>
                </div>
                <div className="updates">
                    <div className="time">11:43</div>
                    <div className="new-message centered">1</div>
                </div>
            </div>
        </div>
    );
}
 
export default Contacts;