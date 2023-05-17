>### XMPL V5

Let's go a little bit into how an **XMPL V5** page receives and updates its data and how do the HTML directives work.

# The Data Source
The XMPL webpage shows data. If you are using one of the controllers of XMPL, and its directives, then the data is usually of the recipient who is viewing the page.

The data is stored together with other campaign materials on a uProduce server. A uProduce server is a source for campaign materials. It can be used to send emails, create PDF files, and provide ADOR data, where the ADORs are defined by the campaign plan.

# XMPL Server and Rest Services

The XMPL page access to the uProduce server is mediated by an XMPL server, which provides simple REST-based access to the data. It mostly works through the Circle registration of this uProduce server, not directly, so make sure to register this server to Circle.

The REST services provide all functionality that is available to an XMPL site. In fact, you can access the REST layer directly, independently of XMPL, which simply provides Javascript and HTML add-ons on top of it.

# `xmpProvider`
`xmpProvider` is a class in the XMPL library that provides access to the properties and methods of XMPL.
Click [here](https://github.com/XMPieLab/XMPL-V5/wiki/XmpProvider) for more information.
