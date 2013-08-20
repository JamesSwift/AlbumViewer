James Swift - Album Viewer v0.23.0
==================

A simple tool to turn an array of image locations into a simple embedded photo viewer/spinner.

`//Initialize album viewer
var rotator = new AlbumViewer({
	container:"MY_CUSTOM_DIV",
	slideshowDelay:6500
});

 //Load Album
rotator.loadAlbum({
	name:"example",
	location:"images/exampleAlbum/",
	images:['img1.jpg','other_img.jpg','test.gif']
});

//Make it an endlessly repeating album
rotator.endlessAlbum=true;

//Start a slideshow
rotator.slideshowStart();`

The AlbumViewer is designed to be simple to use, but to also be extensible. For example, you can hook in your own functions to alter it's behaviour:
`
//Instead of loading just an array of images, load an array of objects with data 
//associated with each image. This data can easily be accessed later.
rotator.loadAlbum({
	name:"example",
	location:"images/exampleAlbum/",
	images:[
		{'name':'img1.jpg', 'alt':'James at the London Eye'},
		{'name':'other_img.jpg', 'alt':'A view from the top'}
	]
});

//Create a custom link on the fly
rotator.getLink = function(srcID) {	
	return "?p=album&img="+encodeURIComponent(this.albumImages[srcID]['name']); 
};

//Create a custom alt on the fly
rotator.getAlt = function(srcID) {	
	return this.albumName + ": "+ this.albumImages[srcID]['alt']);
};

//Assign the pause button
document.getElementById('pause').onclick=function(){ rotator.slideshowToggle(); };`

##What it does

-Simply turn a array into an photo viewer/spinner
-Has customizable fade transition
-Allows easy extension (if desired)
-Works with your existing GUI (if desired)
-Provides lots of feedback (if desired)

##What it doesn't do

-Provide default back, forward, play or pause buttons ('cus you'd only disable them and use your own anyway)
-Fancy pants transitions
-Play Chess

## Get The Code

To get a copy of the code, at your terminal type:

`git clone git://github.com/James-Swift/AlbumViewer.git`

or alternatively you can 
[download a zipped version](https://github.com/James-Swift/AlbumViewer/archive/master.zip).


## Versioning

Releases will be numbered with the following format: `<major>.<minor>.<patch>`

But please note that during beta development we will remain at version v0.*.*

For more information please visit [http://semver.org/](http://semver.org/).

## License: Creative Commons Attribution - Share Alike 3.0

<a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/deed.en_US">
<img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by-sa/3.0/88x31.png" /></a>
<br /><span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">AlbumViewer</span> by 
<a xmlns:cc="http://creativecommons.org/ns#" href="https://github.com/James-Swift/AlbumViewer" property="cc:attributionName" rel="cc:attributionURL">James Swift</a>
 is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/deed.en_US">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>.