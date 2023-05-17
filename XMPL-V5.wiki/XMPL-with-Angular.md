>### XMPL V5

The XMPL library can be used with Angular. See a full [Angular example](https://github.com/XMPieLab/XMPL-V5/tree/main/Sample%20sites/xmpl-angular).

# Before 

Before you start the project download xmpcfg file from Circle and save it to:  

`/src/assets/xmpcfg.js`.

Tutorial how to [download](https://github.com/XMPieLab/XMPL-V5/wiki/Getting-Started#2-download-the-configuration-file) config file.


The Angular library can be used with the XMPL library. To work with the Angular application inside public/index.html, add to the head **xmpcfg.js** and **xmpl.min.js**. The xmpcfg.js file should be initialized first, the second - XMPL library.

### Bind XMPL element to DOM 

To update data from the XMPL library you can listen to the changes in the UI. appRef is a reference to an Angular application running on a page. This class has the isStable property that returns an Observable. It indicates when the application is stable or unstable. 
When some changes take place, we wait 100 milliseconds and then run the render. This means that the xmpProvider method bind goes to HTML, reads all HTML elements in the body, checks what elements should be deleted, and binds the necessary elements. IsStable means that when all changes are done we can trigger events that bind the new HTML elements. 

```javascript
  constructor(appRef: ApplicationRef) { 
    appRef.isStable 
      .pipe(debounceTime((100))) 
      .subscribe(() => (window as any).xmpProvider.bind(document.body).render()); 
  } 
```
See [code example](https://github.com/XMPieLab/XMPL-V5/blob/main/Sample%20sites/xmpl-angular/src/app/app.component.ts).

### Attribute syntax 

Since Angular uses special syntax for their templates to avoid compiler errors, use inside the Angular application syntax without curly brackets.  

For the xmp-src, xmp-href attributes you can use the `<img xmp-src="images/xmp.r['Image2']"/>` attributes.

### Using the XMPL library with Angular syntax 

To get data from the API, you can use the **getAdorValues** method from the API inside xmpProvider.
Inside ngOnInit create an API call to get ADOR values. When data is ready you can get ADOR values from the `window.xmpProvider.store.xmp.r` object.

```javascript
ngOnInit(): void { 
  this.getRecipientAdors(); 
} 

getRecipientAdors() { 
  const accessToken = localStorage.getItem('serviceToken'); 
  const adorList = ['firstname', 'lastname']; 
  (window as any).xmpProvider.api.getAdorValues(accessToken, this.rid, true, adorList, [], false) 
      .then(this.xmpReady) 
} 

get firstName() { 
  return this._firstName; 
} 

get lastName() { 
  return this._lastName; 
} 

xmpReady = () => { 
  this._lastName = (window as any).xmpProvider.store.xmp.r.lastname; 
  this._firstName = (window as any).xmpProvider.store.xmp.r.firstname; 
} 
```
 

When you get data from the API response, you can save the value to properties and use it inside the Angular component template. 
```html
<div class="form__section"> 
  <div class="form__group-title">First Name:</div> 
  <div class="form__group"> 
    <span>{{firstName}}</span> 
  </div> 
</div>
```
