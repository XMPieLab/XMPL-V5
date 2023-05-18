# XMPL-React
***We provide a package file with xmpl-react library (tgz file). The xmpl-react npm package can be [downloaded](https://github.com/XMPieLab/XMPL-V5/blob/main/xmpl-react%20package%20installation/xmpl-react-1.0.0.tgz) directly and can be used in your projects.***  

The following tutorial will take you through the basics of creating a personalized website with xmpl-react hooks package.
Before you begin:
* [Download](https://github.com/XMPieLab/XMPL-V5/blob/main/XMPL-React-Tutorial-materials.zip) the tutorial materials.
* Review the [[Getting Started]] page to set up the tutorial campaign on your Circle and uProduce servers. (You only need to do the first two sections of the Getting Started page – upload the campaign package and download the project configuration file – then return here.)

# Objectives
On this page, we will:
* Take a basic React JS single page project (provided in the XMPL ReactJS example zip) and add xmpl-react package hooks.
* Use custom hooks to control personalized or data-driven:  
  * Texts
  * Images
  * Styles (CSS classes)
  * Element visibility
* The actual images and texts displayed are determined by the rid parameter passed in the browser URL and the logic in the campaign plan file (that you set up in the Getting Started).
* Use hooks in the project so that the recipient can update the campaign database and request additional information.
* Use hooks for tracking, so that Circle Analytics can report webpage visits, button clicks and links on the page.  

To begin, unzip the XMPL ReactJS example zip. Use your favorite IDE to open the “start” folder, and follow the steps outlined below. If you get stuck or need help, the completed project can be found in the "completed" folder.  

**Note**: You should already have set up your campaign and downloaded the xmpcfg.js file as described in the Getting Started page.

# Installation 
Use the ***npm install*** command inside the root folder where the package.json is located (start folder). This will install all the dependencies we need.  

# Configuration
Open the ***xmpcfg.js*** file that you downloaded from your Circle project and copy the config object.  
Open the ***src/index.js*** file in the root directory of the example project and paste in the config object, as shown below.   
````javascript
const root = ReactDOM.createRoot(document.getElementById('root'));
var xmpcfg = {
    access: {
        accessToken: 'bdbd5a21-d496-4e2c-bb22-11448af05f87_bbe47f06-1c85-4f2c-a49f-11f37fd69b71_603ec87f7e2d41d59837769974b25b5a',
        url: 'http://xmpl02.xmpie.net/XMPieXMPL_REST_API',
        circleProjectID: 'bbe47f06-1c85-4f2c-a49f-11f37fd69b71',
        circleProjectName: 'sample'
    }
};
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

````

# The XMPL Provider
In the same file ***(src/index.js)***, import the ***XmplProvider*** module:
````javascript
import { XmplProvider } from 'xmpl-react';
````
Wrap the ***App*** component with the ***XmplProvider*** and pass in the ***xmpcfg object***, as shown below:  
````javascript
var xmpcfg = {
    access: {
        accessToken: 'bdbd5a21-d496-4e2c-bb22-11448af05f87_bbe47f06-1c85-4f2c-a49f-11f37fd69b71_603ec87f7e2d41d59837769974b25b5a',
        url: 'http://xmpl02.xmpie.net/XMPieXMPL_REST_API',
        circleProjectID: 'bbe47f06-1c85-4f2c-a49f-11f37fd69b71',
        circleProjectName: 'sample'
    }
};
root.render(
    <React.StrictMode>
        <XmplProvider xmpcfg={xmpcfg}>
            <App/>
        </XmplProvider>
    </React.StrictMode>
);
````
# Get ADORs
Open the ***src/App.js*** file.  
First, add necessary imports:  
````javascript
import { useContext, useEffect } from 'react';
import { XmplContext, useAdors } from 'xmpl-react';
````
Inside the ***App()*** function, get the ***xmp objec***t from ***the provider***:  
````javascript
function App() {
    const { xmp } = useContext(XmplContext)
    ...
}
````
Get the ***getAdorValues*** function from the ***useAdors*** hook:
````javascript
const { getAdorValues } = useAdors();
````
Get the ***rid*** (recipient ID) from the URL:
````javascript
const rid = new URLSearchParams(window.location.search).get('rid')
````
Add the ***useEffect*** hook and request the ADORs that you need from the ***provider***:
````javascript
useEffect(() => {
    getAdorValues({
        rid,
        isLogin: true,
        adors: ['firstname', 'lastname', 'preference', 'email', 'photo1', 'photo2', 'photo3', 'photo4', 'backgroundColor', 'isClubMember', 'showForm', 'showThanks'],
        resolved: ['photo1', 'photo2', 'photo3', 'photo4'],
        async: false,
        isCached: true,
        noCache: false,
    })
}, [xmp])

````
**Note**: assets (like images) also need to be added to the resolved array to get the full path and file extension for the image.

# Text Personalization
In the ***Banner*** component (src/components/Banner.js), import the ***XmplContext*** module from the ***‘xmpl-react’*** library and the ***useContext*** hook from ***`‘react’***`:
````javascript
import { XmplContext } from 'xmpl-react';
import { useContext } from 'react';
````

On line 7, before the return block, get the ***xmp*** object from the provider context:
````javascript
const { xmp } = useContext(XmplContext)
````
Find static text wrapped by ***`<h1>`*** tag:
````html
<h1>Hi _firstname_, welcome to Round Travel!</h1>
````
Replace the static text with the placeholder that will display the firstname text ADOR, as shown below:
```html
<h1>{`Hi ${xmp.r['firstname'] || ""}, welcome to Round Travel!`}</h1>
```

In the ***Contact*** component (src/components/Contact.js), import the ***XmplContext*** module from the library and the ***useContext*** hook from ***react*** as we did before:
```javascript
import { XmplContext} from 'xmpl-react';
import { useContext} from 'react';

export const Contact = () => {
    const { xmp } = useContext(XmplContext)
    ...
}
```

Find the paragraph:

```html
<p>We have received your request for more information
    and one of our _preference_ specialists
    will be in contact as soon as possible.
</p>
```
Replace the static text with the placeholder that will display the preference text ADOR, as shown below:
```html
<p>{`We have received your request for more information
    and one of our ${xmp.r['preference']} specialists
    will be in contact as soon as possible.`}
</p>
```
# Image Personalization
In the ***MainBlock*** component (src/components/MainBlock.js), import the modules and get the ***xmp context object*** again:
```javascript
import { XmplContext } from 'xmpl-react';
import { useContext } from 'react';

export const MainBlock = () => {
    const { xmp } = useContext(XmplContext)
    ...
}
```

Find the first article:
```javascript
<article>
    <span className="image">
        <img src="images/pic01.jpg" alt=""/>
    </span>
    <header className="major">
        <h3><a href="content.html" className="link">Excitement</a></h3>
        <p>Get out and about!</p>
    </header>
</article>
```
Modify the article as shown below to add the ***photo1*** graphic ADOR:
```javascript

<article style={{ backgroundImage: `url(${xmp.r['photo1']})` }}>
    <span className="image">
       <img src={`${xmp.r['photo1']}`} alt=""/>
    </span>
    <header className="major">
        <h3><a href="content.html" className="link">Excitement</a></h3>
        <p>Get out and about!</p>
    </header>
</article>

```
Repeat the process to add ***photo2***, ***photo3*** and ***photo4*** for the remaining articles.
# Style Personalization
Find the last ***section*** element in the ***MainBlock*** component.   
Add the ***backgroundColor*** style ADOR as a CSS class.  
Your line should now look like this:
```html
<section id="two" className={xmp.r.backgroundColor}>
```
The ***backgroundColor*** ADOR object returns the name of a CSS class that has already been set in the application’s CSS file to define the element’s background color.  

**Note**: This is a simple example. The CSS class can be used to control font face and size, positioning and other attributes to suit the campaign and webpage design needs.

# Element Visibility Personalization
At the bottom of the ***Banner*** component (src/components/Banner.js), you can find an image element that displays the travel club membership logo. This logo should only appear for recipients who are members of the travel club.
```html
<img src={clubLogo} alt="Travel Club Member"/>
```

Add the ***xmp.r[isClubMember]*** visibility ADOR to control the element’s CSS display attribute.
Your line should now look like this: 
```html
<div className="col-3 col-lg-6 col-md-12">
    <img src={clubLogo} alt="Travel Club Member" style={{display: `${!!+xmp.r['isClubMember'] ? 'block' : 'none'}`}}/>
</div>
```

In the ***Contact*** component (src/components/Contact.js), you will find a div element that contains a web form. We want to hide this div if the recipient has already submitted the form.   
In the campaign plan file, there is a visibility ADOR called ***"showForm"*** that contains the logic to show or hide the form.
A little lower down there is a div element that contains a thank you message and is hidden with a ***style={{ display: 'none' }}*** attribute. When the web form is hidden, We want to show this div instead. 
In the campaign plan file, there is a visibility ADOR called ***"showThanks"*** that contains the logic to show or hide the thanks div.
Here is one of the ways we can control it:

Check that the imports and ***xmp object*** were already added from the earlier **[Text Personalization]** section. 

Add the useState hook from ***react***:
```javascript
import { XmplContext} from 'xmpl-react';
import { useContext, useState } from 'react';

export const Contact = () => {
    const { xmp } = useContext(XmplContext)
    ...
}
```

Before the ***return()*** function, use the ***useState*** react hook to control the ADOR’s states:
```javascript
const [showThanks, setShowThanks] = useState(false)
const [showForm, setShowForm] = useState(true)
```
Update div with id ***“formDiv”*** as shown below:

```javascript
<section id="contact">
    <div className="inner">
        <section>
            <div id="formDiv" style={{ display: `${showForm ? 'block' : 'none'}` }}>
                <h2>Interested? Like more information?</h2>
                <p>Confirm your contact details below:</p>
    ...
}
```

Update the div with id ***“thanksDiv”***, as shown below:
```javascript
<div id="thanksDiv" style={{ display: `${showThanks ? 'block' : 'none'}` }}>
```
# Web Form Personalization (Update form)
In ***Contact component*** (src/components/Contact.js), you will find a web form element. This form is for recipients to confirm their contact details and request additional information. Here are the main steps to configure a form to work with custom hooks:
1.	Add the ***useAdors*** hook to the import from ***xmpl-react***.
2.	Add the ***useEffect*** hook to the import from ***react***.
3.	Create a state for the required ADORs: ***firstname***, ***lastname*** and ***email***.
4.	Configure the ***useEffect*** hook to update the state according to ***xmp object***
5.	Get ***updateAdors*** function from of ***useAdors*** hook.

Your code should now look like this:
```javascript
import { XmplContext, useAdors } from 'xmpl-react';
import { useContext, useEffect, useState } from 'react';

export const Contact = () => {
    const { xmp } = useContext(XmplContext)

    const [showThanks, setShowThanks] = useState(false)
    const [showForm, setShowForm] = useState(true)
    const { updateAdors } = useAdors();
    const [firstName, setFirstName] = useState(xmp.r['firstname'])
    const [lastName, setLastName] = useState(xmp.r['lastname'])
    const [email, setEmail] = useState(xmp.r['email'])

    useEffect(() => {
        setFirstName(xmp.r['firstname'])
        setLastName(xmp.r['lastname'])
        setEmail(xmp.r['email'])
    }, [xmp])

```
6.	Create a function that we will use as a handler for the submit button:
```javascript
const updateData = async (e) => {
    e.preventDefault();
    const res = await updateAdors({
        'firstname': firstName,
        'lastname': lastName,
        'email': email,
    })
    if (res) {
        setShowThanks(true)
        setShowForm(false)
    }
}
```

7.	Bind input fields to ADORs. 
Add a handler function for each form field using the corresponding ADOR name.   
Add a handler for the submit button.   
Your code in the form element should look like this:  
```javascript
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
```

Also, we can insert a value into the recipient database that indicates that the recipient would like to receive followup information. Because the database currently has no value in that field, we need to set a value that will be written to the database when the recipient submits the form. In this case we can add a required ADOR (***followup***) to the ***updateAdors*** function. It will look like this:

```javascript
const updateData = async (e) => {
    e.preventDefault();
    const res = await updateAdors({
        'firstname': firstName,
        'lastname': lastName,
        'email': email,
        'followup': true,
    })
    if (res) {
        setShowThanks(true)
        setShowForm(false)
    }
}
```
# Link and Button Click Tracking
While we are on the submit button, we also want to record or track the recipients who have clicked the button, so let’s do it:  
Import ***useEvents*** hook from ***xmpl-react***:
```javascript
import { XmplContext, useAdors, useEvents } from 'xmpl-react';
```
Get the ***events*** function:
```javascript
const { events } = useEvents();
```
Write a function that will configure all the data we need to hold the track event:
```javascript
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
```

**Note**: At the end of the function, we call the events function that we got earlier.

The new trackEvent function should be called at the end of the ***updateData*** function that handles the submit button click. So, the ***updateData*** function should now look like this:
```javascript
const updateData = async (e) => {
    e.preventDefault();
    const res = await updateAdors({
        'firstname': firstName,
        'lastname': lastName,
        'email': email,
        'followup': true,
    })
    if (res) {
        setShowThanks(true)
        setShowForm(false)
    }
    trackEvent(e);
}
```

**Note**: We need to pass the event object to call to the trackEvent function.
# Save and test
Save your changes and run ***npm start*** to open your project in the web browser. Remember to add ***?rid=Jane.Jones*** to the end of the URL.
Test changing the recipient id to one of the other test recipients: ***Jerry.Jones***, ***Sandra.Smith***, or ***Sam.Smith***.
If something does not work as expected, compare your files with the files provided in the "completed" folder.

# Add new recipient
If we want to register a new recipient, we need a ***useRecipients*** hook.
Firstly, we need to import it:
```javascript
import { useRecipients } from 'xmpl-react';
```

Get ***addRecipient*** method from the hook:
```javascript
const { addRecipient } = useRecipients()
```

Import ***useState*** hook from ***react***:
```javascript
import { useState } from 'react';
```

Prepare a form with necessary fields and add necessary states to control inputs: 
```javascript
const [firstName, setFirstName] = useState("")
const [lastName, setLastName] = useState("")
const [email, setEmail] = useState("")
```
```html
<label htmlFor="firstName">First Name:</label>
<input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
<label htmlFor="lastName">Last Name:</label>
<input type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
<label htmlFor="email">Email:</label>
<input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

```
    
Add the button with handler
```javascript
<button onClick={buttonHandler}>Add recipient</button>
```

Describe the button handler and pass all the data you want to add as adors for new recipient: 
```javascript
addRecipient({
    isAddReferFriend: false,
    adors: {
        firstname: firstName,
        lastname: lastName,
        email
    }
})
```
where:  
* isAddReferFriend – should be “false” if we want to add a new recipient and “true” if it’s a referral recipient
* adors – is an object with new adors for new recipient;
The structure should be:
```javascript
adors: {
    adorName1: newValue1,
    adorName2: newValue2,
    ...    
    adorNameN: newValueN
}
```
# Add referred friend
Firstly, check how to add a new recipient. The only one difference is ***addRecipient*** call:
```javascript
addRecipient({
    isAddReferFriend: true,
    adors: {
        firstname: firstName,
        lastname: lastName,
        email,
        'ReferrerFirstName': xmp.r['firstname'],
        'ReferrerLastName': xmp.r['fastname'],
    }
})

```
where:
* isAddReferFriend – should be “true” if it’s a referral recipient
* adors - object that should include all fields we want to add for new recipient and referrer' data we want to add (***first name, last name, id, email***,  etc.)
This data we can extract from ***xmp object*** from context:
Do necessary imports:
```javascript
import { useContext } from 'react';
import { XmplContext } from 'xmpl-react';
```

Get xmp object:
```javascript
const { xmp } = useContext(XmplContext)
```

Now you can use ***xmp object*** to define referrer` data for new recipient
