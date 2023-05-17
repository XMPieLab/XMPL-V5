>### XMPL V5

`xmp-video` - new directive for working with video link ADOR. 

In order to use an ADOR in a video tag add 
````html
<video width="700" height="381" controls autoplay xmp-video="{{xmp.r['VideoLink']}}">
  <source type="video/mp4" xmp-src="{{xmp.r['VideoLink']}}"/>
</video>
````

