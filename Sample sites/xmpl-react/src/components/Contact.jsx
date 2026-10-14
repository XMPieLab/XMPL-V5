import { XmplContext, useAdors, useEvents } from 'xmpl-react';
import { useContext, useEffect, useState } from 'react';

export const Contact = () => {
    const { xmp } = useContext(XmplContext)
    const [showThanks, setShowThanks] = useState(false)
    const [showForm, setShowForm] = useState(true)
    const { updateAdors } = useAdors();
    const [firstName, setFirstName] = useState(xmp.r['firstname'])
    const [lastName, setLastName] = useState(xmp.r['lastname'])
    const [email, setEmail] = useState(xmp.r['email'])
    const { events } = useEvents();

    useEffect(() => {
        setFirstName(xmp.r['firstname'])
        setLastName(xmp.r['lastname'])
        setEmail(xmp.r['email'])
    }, [xmp])

    const trackEvent = (e) => {
        const rid = new URLSearchParams(window.location.search).get('rid') || localStorage.getItem('xmpRecipientID')
        const isAnchor = e.target.tagName === 'A'
        const options = {
            sync: isAnchor,
            recipientID: rid,
            PageName: 'Sample',
            ActionName: 'Requested followup',
            ActionParams: 'actionParameters',
            type: 'mousedown',
        }
        events(options)
    }

    const updateData = async (e) => {
        e.preventDefault();
        const res = await updateAdors({
            'firstName': firstName,
            'lastName': lastName,
            'email': email,
            'followup': true,
        })
        if (res) {
            setShowThanks(true)
            setShowForm(false)
        }
        trackEvent(e);
    }

    return (
        <section id="contact">
            <div className="inner">
                <section>
                    <div id="formDiv" style={{ display: `${showForm ? 'block' : 'none'}` }}>
                        <h2>Interested? Like more information?</h2>
                        <p>Confirm your contact details below:</p>
                        <form>
                            <div className="fields">
                                <div className="field half">
                                    <label htmlFor="firstname">First Name</label>
                                    <input type="text"
                                           name="firstname"
                                           id="firstname"
                                           value={firstName || ""}
                                           onChange={(e) => {
                                               setFirstName(e.target.value)
                                           }}/>
                                </div>
                                <div className="field half">
                                    <label htmlFor="lastname">Last Name</label>
                                    <input type="text"
                                           name="lastname"
                                           id="lastname"
                                           value={lastName || ""}
                                           onChange={(e) => {
                                               setLastName(e.target.value)
                                           }}
                                    />
                                </div>
                                <div className="field">
                                    <label htmlFor="email">Email</label>
                                    <input type="text"
                                           name="email"
                                           id="email"
                                           value={email || ""}
                                           onChange={(e) => {
                                               setEmail(e.target.value)
                                           }}
                                    />
                                </div>
                                <input type="hidden" id="followup" name="followup"/>
                            </div>
                            <ul className="actions">
                                <li><input type="submit" value="Send me more information" className="primary"
                                           onClick={updateData}/>
                                </li>
                            </ul>
                        </form>
                    </div>
                    <div id="thanksDiv" style={{ display: `${showThanks ? 'block' : 'none'}` }}>
                        <h4>Thanks! </h4>
                        <p>{`We have received your request for more information
                            and one of our ${xmp.r['preference']} specialists
                            will be in contact as soon as possible.`}</p>
                    </div>
                </section>
                <section className="split">
                    <section>
                        <div className="contact-method">
                            <span className="icon solid alt fa-envelope"></span>
                            <h3>Email</h3>
                            <a href="mailto:information@untitled.tld">information@untitled.tld</a>
                        </div>
                    </section>
                    <section>
                        <div className="contact-method">
                            <span className="icon solid alt fa-phone"></span>
                            <h3>Phone</h3>
                            <span>(000) 000-0000 x12387</span>
                        </div>
                    </section>
                    <section>
                        <div className="contact-method">
                            <span className="icon solid alt fa-home"></span>
                            <h3>Address</h3>
                            <span>1234 Somewhere Road #5432<br/>
										Nashville, TN 00000<br/>
										United States of America</span>
                        </div>
                    </section>
                </section>
            </div>
        </section>
    )
}
