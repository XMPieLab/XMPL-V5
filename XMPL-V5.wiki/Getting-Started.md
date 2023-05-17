>### XMPL V5

The following tutorial will take you through the basics of creating a sample Circle project and a simple XMPL V5 personalized web page.

Before you begin, download the [tutorial materials](https://github.com/XMPieLab/XMPL-NG/blob/main/XMPL-NG-Tutorial-materials.zip) that are needed for this getting started tutorial.

# Prerequisites
In order to complete this tutorial, you should have:
* Access to a PersonalEffect TransMedia, TransMedia Pro or Enterprise server,
* An XMPie Circle account and have your XMPL server connected to it, and
* At least a basic understanding of HTML and JavaScript.

# 1. Set up the sample Circle Project 

To start, we need to set up the Circle project so that the personalized pages can connect to it. The Circle project is linked to:
* Your uProduce server on which we will define a campaign to hold the project plan, recipient list (data) and project assets (variable images and preset texts).
* Your XMPL server which will host the final personalized web pages.

The [tutorial materials](https://github.com/XMPieLab/XMPL-NG/blob/main/XMPL-NG-Tutorial-materials.zip) folder contains:
* A sample campaign package (CPKG) that we will use to setup the sample campaign,
* A copy of the data file used in the campaign package, 
* A website folder to start the tutorial, and 
* A website folder which is completed and can be used as a reference.
 
Use the following steps to create a new project with the sample campaign package.

1. Log in to [Circle](https://xmcircle.com/) and create a new project (File > Open/Organize > New project).
2. Save the project (File > Save) and enter a unique name for the project.
3. Go to the "Build" tab and click the "Connect" button.
4. Select your uProduce server from the drop-down list, and click "+" to create a new account. 
5. Enter an account name, confirm the other default settings and click to save the account.
6. Click to go to the next step of the uProduce Connection dialog.
7. Click to "Upload a Campaign Package File (.cpkg)".
8. Click "Choose file" and select the "GettingStarted.cpkg" file provided in the tutorial materials. Click "Upload". Close the dialog when done.
9. You will see Master List dialog, and now need to configure the Recipient ID that will be used to identify users in the URL. Click "database field".
10. Click Next.
11. In the Recipient Key Format field, enter: `[[firstname]].[[lastname]]`. (You can place the cursor in the box, and click the field names from the list, as well as type manually.)
12. Click Finish, then Close, then Save.

**Note:** In step 9, for good security, you would generally click to "auto-generate a secure ID" so that personalized URLs are difficult to guess. But to make it easier to test the web pages in this tutorial, we will use the firstname and lastname in the URL.

# 2. Download the Configuration File

Now that the project is setup in Circle and uProduce, we can download the web configuration file from Circle.

The file includes JavaScript code that defines the project connection information needed on the XMPL web pages.

To download the file do the following:

1. If the Circle Library window was closed, open it by clicking the "Library" button on the project's "Build" tab.
2. Select "Website" from the list on the left.
3. Click the down arrow next to "Configuration file".
![Download configuration](https://raw.githubusercontent.com/XMPieLab/XMPL-SDK/master/Images/downloadConfiguration.png)
4. Save the file as "xmpcfg.js" in the "web pages - start here" folder provided in the "tutorial materials" download.
5. If you also wish to use the completed web pages, you should also save a second copy of the "xmpcfg.js" into the "web pages - completed" folder provided in the "tutorial materials" download.

# 3. Create your First Webpage

To understand the basic concepts, we will ignore the sample web pages to start with and create a very basic "hello world" example.

1. In the "web pages - start here" folder where you just saved your xmpcfg.js file, create a new text document named "hello.html".
2. Open the "hello.html" document in your favorite text or HTML editor.
3. Copy the following code sample:
````html
<html>
  <head>
    <title>My first personalized web page</title>
    <script src="./xmpcfg.js"></script>
    <script src="https://ajax.xmcircle.com/ajax/libs/XMPL-V5/5.0/xmpl.min.js"></script>
  </head>
  <body>
    <div xmp-personalized-controller xmp-cloak>
      <h1>Hello world!</h1>
      <p>
        This web page is personalized for: 
        <span xmp-text="xmp.r['firstname']"></span>
        <span xmp-text="xmp.r['lastname']"></span>
      </p>
      <div><img width="500px" xmp-image-asset="xmp.r['photo1']"/></div>
    </div>
  </body>
</html>
````
4. Paste the code sample into your hello.html file and save the file.
5. Double-click the hello.html file to load it in your default web browser. 
6. At first, you will see nothing, and after a few seconds you will see an XMPL error that the Recipient ID is not valid. You will have to add a Recipient ID to the file URL to see some personalized data.
7. In your browser, at the end of the URL, change "hello.html" to "hello.html?rid=Jane.Jones" and press Enter. 
8. The web page should now look like this:
![Alt](https://github.com/XMPieLab/XMPL-NG/blob/main/tutorial-images/HelloWorld-Jane.Jones.jpg "Hello World - Jane Jones' personalized page")
9. You can see your hello.html page personalized for other recipients by providing a different recipient ID. Try for example
"hello.html?rid=Jerry.Jones", "index.html?rid=Sandra.Smith", or "index.html?rid=Sam.Smith"

**Congratulations!** You've created a personalized web page with XMPL V5!

### Notes
* There are two script tags loaded in the \<head\> section.
  * The first reads the xmpcfg.js to get the information on how to connect to your Circle project.
  * The second loads the XMPL V5 library that is used to put the personalized values into the web page.
* Text ADORs are placed into the document by adding the `xmp-text` attribute to an element that can hold text like the span tag.
* The value of the xmp-text attribute is the name of a text ADOR in the campaign plan.
* Graphic ADORs are placed into the document by adding the `xmp-image-asset` attribute to an image (img) element.
* The value of the xmp-image-asset attribute is the name of a graphic ADOR in the campaign plan.

# 4. Install a test HTTP Server (optional)
Because we are previewing the HTML by double-clicking the file on your desktop, there is no web server involved, and if we click a link to go to another personalized page, the recipient information is not passed to the second page.

If you would like to have the recipient information remembered when you are testing pages on your local desktop, you may want to install and configure a light web server for local testing. The following steps provide instructions on how to install and use the `http-server` of NodeJS.

This step is entirely optional. If you prefer, you can use any other local web server software, or simply use the Circle Project Library to Create a Managed Website and copy or upload your test web pages to folder created on your XMPL server.

If you wish to use NodeJS http-server on your desktop, here are the steps:

1. Go to [https://nodejs.org/](https://nodejs.org/), download the NodeJS installer for your OS.
2. Install NodeJS.
3. Open terminal/command prompt.
4. Install HTTP server by typing `npm install http-server -g`. Hit enter. This should install the HTTP server.
5. To run the tutorial website via http-server, use the terminal/command prompt to change directory into tutorial website folder, and type `http-server`. 
6. The site should now be available in your web browser via `http://localhost:8080/hello.html?rid=Jane.Jones`. 
7. To stop the server when it has finished playing the sample, press Ctrl-c.

# 5. Next
In [[Your First Personalized Page]] we will take plain HTML pages and make them dynamic or personalized by adding the XMPL V5 scripts and attributes to the page.