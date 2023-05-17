>### XMPL V5

The PDF on Demand feature allows you to include a link to a personalized PDF document
in a webpage or an email. This link may reference any of your PDF on Demand touchpoints
in the project including InDesign or XLIM documents.


As soon as a PDF on Demand node is added and saved in the project diagram, the PDF
automatic link ADOR is available to be included in a webpage or an email document.
A PDF on Demand ADOR object name consists of an “XMPie.PDF” prefix, followed by the
touchpoint's friendly ID, for example: XMPie.PDF.P1. 

You can use PDF on Demand as follows:

* **Web usage:**
Create webpages with links for downloading PDFs on Demand. Webpage visitors can then generate personalized documents and save them to a file or print them on their local printer. This is useful for scenarios such as buying concert tickets, creating a personalized "book" based on the visitor's website choices, etc. Since the PDF is created "on demand", that is, when the visitor clicks the link, it reflects the most up-to-date data.

* **Email usage:**
Create emails with links for downloading PDFs on Demand. When a recipient clicks such a link, a personalized PDF is presented on demand. The PDF reflects the status of the data at the time the email was sent (as opposed to the status of the data at the time the link was clicked). This way, the PDF on Demand emulates an attachment, without actually being an attachment. Since the PDF is generated only for recipients who click the email link, this feature saves you the need to produce PDFs for your entire recipient list, thereby significantly reducing production and storage resources.

The PDF On Demand shows time-dependent data, defined as follows:

* **Web usage:** The PDF on Demand shows the data available at the time the link was clicked. For example, you can use PDF on Demand to show the current bank account balance.

* **Email usage:** The PDF on Demand shows the data available at the time the email was sent. This is useful, for example, for issuing monthly bank statements. The email sent in January will show the January details, the email sent in February will show the February details, etc. Clicking the January statement link at any later stage will always display the January statement.

A PDF on Demand  touchpoint is similar to the print touchpoint except for the final
output format and tracking. When using a print touchpoint, a recipients receives
a hard copy of a document, whereas when working with a PDF on Demand touchpoint,
a recipient views the document online and can optionally print it.

# Initial Setup

To add a PDF on Demand link to your webpage or email you must first add and configure a PDF on Demand touchpoint in your Circle project. 

# Including the PDF on Demand Link

In the webpage or email, add the following:

````html
<a xmp-href="{{xmp.r['XMPie.PDF.P1']}}">View the PDF</a>
````

In the above example:
- XMPie.PDF.P1 is the name of the automatic ADOR created for that touchpoint.
- P1 is the friendly ID of the PDF on Demand touchpoint in your Circle project.

# Executing the PDF on Demand Link

On clicking the PDF on Demand link the PDF will be available for viewing. 