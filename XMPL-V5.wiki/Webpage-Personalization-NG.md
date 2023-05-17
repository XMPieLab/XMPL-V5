Assuming you have a project set up with a plan, that plan defines a list of ADORs. These ADORs are the variables that can be used in a webpage in order to personalize it.    
In this section, we will review all ADOR types that can be placed on a webpage, and how to place them.

As an example, you can use the [**"index.html"**](https://github.com/XMPieLab/XMPL-NG-SDK/blob/main/Getting%20Started%20Site/index.html) webpage of the SDK **"Sample Site"** .

# Personalized Page 
The top div element contains the attribute `xmp-personalized-controller`. It means that we create a page for personalized webpages where the personalization content is set up by the URL, which contains the recipient ID. To get access to the page the URL should be index.html?rid=XXXXX, where XXXXX stands for a recipient ID, e.g., index.html?rid=Jane.Jones.Tag can be placed at the top-level element of the HTML body, or somewhere else. It should encapsulate any XMPL tags.  

```html
<div xmp-personalized-controller>
  Welcome <span xmp-text="xmp.r['FirstName']"></span><span xmp-text="xmp.r['LastName']"></span>! 
<div> 
```

The div also defines another attribute xmp-cloak. This tag hides its content until the XMPie recipient data is ready. It is good practice to use it to hide any personalized content until it is ready.  

To show text ador the span defines the attribute `xmp-text`. This form of writing retrieves the literal value of the respective ADOR for the recipient. For example, we will see “Welcome Jane Jones!” if the recipient id is Jane.Jones.  

The xmp.r prefix means that the ADOR value is read from the recipient data.   

You can use patterns:   
* xmp.r['ador']  
* xmp['r']['ador']  
* xmp['r'].ador  
* xmp.r.ador 

# Adding ADORs
All personalized information should be placed in tags inside the main tag containing `xmp-personalized-controller`

## Variable Text  

To place the text of an ADOR use the xmp-text attribute, as in the following example: 
```html
<span xmp-text ="xmp.r['FirstName']"></span> <span xmp-text="xmp.r['LastName']"></span> 
<span xmp-text="{{xmp.r['FirstName']}} {{xmp.r['LastName']}}"></span>
```  

## Variable Images  

Variable images can either come from the uProduce server, as assets or reside on the website. Consider the following HTML snippet: 
```html
<!-- fetching an asset from the server -->
<img xmp-image-asset="xmp.r['MainImage']"/>
<!-- fetching an asset from the site images folder, using the ADOR to determine the value -->
<img xmp-src="images/{{xmp.r['Image2']}}"/> 
<img xmp-src="images/xmp.r['Image2']"/> 
```

In the first img tag the attribute xmp-image-asset is used. Its value is an ADOR reference. When evaluated, the asset with the value of the ADOR MainImage for the recipient will be placed as the source of the image.  

The second example shows a variable image using local site images. The src attribute of the image is set to the image in the images folder, whose name is stored in the value of Image2 ADOR.   

Since Angular using special syntax for their templates for avoiding compiler error please use inside Angular application syntax for xmp-src as `<img xmp-src="images/xmp.r['Image2']"/>`  

## Variable Style  

Using variable style, you can determine a different appearance (e.g, color, font) for content. Define a collection of classes and for each recipient have the ADOR value match one of the classes. Then, to set up particular elements to be affected by variable style, use the xmp-class attribute as follows:  
```html
<div xmp-class="xmp.r['Theme']">what's up?</div> 
```

## Variable Visibility  

With visibility ADORs you can turn on and off content in the webpage, according to what you wish to show to the particular recipient. Use the xmp-show attribute on an element, where the value is a visibility ADOR reference, to toggle its visibility per the ADOR value. For example:   
```html
<div xmp-show="xmp.r['IsStudent']">this text should be visible if isStudent is true</div> 
```

## Variable Links  

Variable links can be simply implemented as literal ADOR placements ({{XXXX}}) on the href attribute. Alternatively, use an xmp-href attribute with reference to a link ADOR. For example:  
```html
<a xmp-href="{{xmp.r['Blog']}}">users blog</a>
```