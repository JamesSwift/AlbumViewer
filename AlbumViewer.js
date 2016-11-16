/*
 *	JamesSwift/AlbumViewer
 *
 *	Copyright James Swift 2012 - Creative Commons Attribution-ShareAlike 3.0
 *
 *	2016-04-07  - Version: v0.25.2
 *
 *	This file creates a global object named AlbumViewer which allows you to
 *	easily insert a simple album viewer into any element on a page.
 *
 *	///////////////////////////////////////////////////////////////////////////////////
 *	Here is an example implementation:
 *
 *		//Initialize album viewer
 *		var rotator = new AlbumViewer({
 *			container:"MY_CUSTOM_DIV",
 *			slideshowDelay:6500
 *		});
 *
 *		 //Load Album
 *		rotator.loadAlbum({
 *			name:"example",
 *			location:"images/exampleAlbum/",
 *			images:['img1.jpg','other_img.jpg','test.gif']
 *		});
 *
 *		//Make it an endlessly repeating album
 *		rotator.endlessAlbum=true;
 *
 *		//Start a slideshow
 *		rotator.slideshowStart();
 *
 *
 *
 *	///////////////////////////////////////////////////////////////////////////////////
 *	The AlbumViewer has the following user-settable variables:
 *
 *	The following can only be set as elements in the constructor object (they cannot
 *	be altered once the AlbumViewer has been initialized). If you do not specify
 *	"container", the AlbumViewer will look for the other 6 variables listed below
 *	it. You should only specify one group or the other.
 *
 *	enableLinks		boolean	If you plan to have the displayed images link to their source files, set this to true. If set to false, no links will be generated.
 *
 *	--------------------------------------------------------------------------------------------
 *	container		string	The ID of a div or other element to construct a simple album viewer inside. If you plan to construct a complex viewer, create and then specify each element below in your HTML file instead.
 *	--------------- OR -------------------------------------------------------------------------
 *	container1		string	The ID of the table, div or other element containing the first image.
 *	link1			string	The ID of the anchor (<a>) element associated with the first image. Optional.
 *	img1			string	The ID of the actual img (<img>) element for the first image.
 *	container2		string	The ID of the table, div or other element containing the second image.
 *	link2			string	The ID of the anchor (<a>) element associated with the second image. Optional.
 *	img2			string	The ID of the actual img (<img>) element for the second image.
 *	--------------------------------------------------------------------------------------------
 *
 *	The following are optional and can either be set as elements in the constructor
 *	object or later by editing the new instance using the . dot notation:
 *
 *	blankImage		string	The path to a blank gif image. Used as the initial image to fade from. Default is "http://james-swift.com/images/blank.gif"
 *	fadeStep		number	The amount of opacity to add/subtract on each frame of the fading process. A smaller value is smoother, but fades slower.
 *	fadeTime		number	The time in ms between frames of the fader. A larger value fades slower, but may appear more jerky.
 *	fadeBoth		boolean	Default: true. By default the album viewer, when transitioning, will fade both images - the current and the new - in case they are different dimension (otherwise the edges of one might just suddenly appear). If you know for sure your images will be the same size, you can specify false to halve the browsers work load.
 *	slideshowDelay		number	The delay between each slide in ms.
 *	slideshowRandom		boolean	If set to true, the slideshow will display the images randomly instead of sequentially.
 *	endlessAlbum		boolean	When set to true, once the slideshow has reached the end of the album it will continue from the start. Otherwise the slideshow will just end.
 *
 *
 *
 *	///////////////////////////////////////////////////////////////////////////////////
 *	The AlbumViewer has the following non-settable variables which can be accessed
 *	(after the album viewer has been initialized), using the . dot notation. They are
 *	provided for reference only, altering them will not change anything.
 *
 *	args			array	The arguments that where passed to the constructor. Includes the IDs for the container group even if they were not specified (as in rotator.args.img1, rotator.args.container1, rotator.args.link2 etc.) for reference.
 *	selectedImageID		number	The array ID of the currently selected image.
 *	selectedImageSrc	string	The image name as taken from "albumImages". Has not been passed through getSrc().
 *	history			array	This array contains the history of requested images. Item 0 is always the last requested image (history is unshift-ed rather than push-ed). The currently selected image is not stored in history, but is found in "selectedImageID".
 *	albumName		string	The name of the album as passed in by loadAlbum()
 *	albumLocation		string	The path to the album as passed in by loadAlbum()
 *	albumImages		array	The array of images passed in by loadAlbum(). May be an array of strings containing the image name (as indicated by the variable "imagesAreArrays" = false), or an array of arrays containing image properties ("imagesAreArrays" = true).
 *	imagesAreArrays		boolean Indicates whether "albumImages" is an array of strings, or an array of arrays.
 *	imageNameField		string	If "albumImages" is an array of arrays the value of this variable indicates the field in each array that contains the image's file name. (I.E. albumImages[imageNameField] = "test.jpg") Defaults to "name".
 *	slideshowStopped	boolean	If the slideshow is stopped, this variable will be set to true.
 *
 *
 *
 *	///////////////////////////////////////////////////////////////////////////////////
 *	The AlbumViewer has the following functions (methods) which you can use to
 *	controll it:
 *
 *	loadAlbum (				Call loadAlbum to (re-)initialize the album viewer with album data. returns true on success, throws an error on failure.
 *		object {				It only has one argument, which must be an object.
 *			name					REQUIRED A string containing the name of your album.
 *			images					REQUIRED An array of strings containing image names OR an array of arrays containing image properties. If you are using an array of arrays please indicate which field will contain each image's file name by specifying imageNameField (see below).
 *			location				OPTIONAL A string containing the path to the folder containing your album images. By default the album viewer will combine this path with the selected image filename when loading the source file. (E.G. my_albumLocation/image1.jpg), but if each image is in a different locationecory you can set "location" null and hard code the full path into each image's file name in the "images" array.
 *			imageNameField			OPTIONAL If "images" is an array of arrays the value of this variable indicates the field in each array that contains the image's file name. (I.E. if "images[0].fileName = 'test.jpg'" set this variable to "fileName") Defaults to "name".
 *		  }
 *		)
 *
 *	switchTo (				Call switchTo to display a specific image from the "albumImages" array.
 *			imageID			The "Images" array id of an image you want to switch to. If the id is out of bounds it will be corrected.
 *		)
 *
 *	findImageID (				Call this when you want to find the id of an image's file-name. Returns the id of the item in the albumImages array on success, boolean false on failure.
 *			imageName			The name of the image
 *		      )
 *
 *	safeImageID (				When processing user defined image IDs, pass them through this function. It will check they are valid, and try to intelligently guess what the user wanted if the id is invalid. (For example, if the id is past the end of the album it will either return the last image or if endlessAlbum==true it will return the first image).
 *			imageID			The numerical id which might represent an image
 *		      )
 *
 *	imageNext ( )				Moves to the next image in the array. If "endlessAlbum" is true, it will reset to the begining of the array once the last item has been reached.
 *
 *	imagePrevious ( )			Moves to the previous image in the array. If "endlessAlbum" is true, it will start at the end of the array once the first item in the array has been reached.
 *
 *	imageRandom ( )				Displays a random image from the "albumImages" array.
 *
 *	slideshowStart (			Starts a slideshow of the images in "albumImages"
 *			randomly			If this argument is true, it will set "slideshowRandom" to true and play a random never-ending slideshow.
 *			startAt				The ID of the image to start the slideshow at. If not set, will default to next image();
 *		)
 *
 *	slideshowStop ( )			Stops the slideshow (if one is taking place).
 *
 *	slideshowToggle ( )			Starts/Stops the slideshow depending on it's state.
 *
 *
 *
 *
 *
 *
 *	///////////////////////////////////////////////////////////////////////////////////
 *	The AlbumViewer has the following functions available for you to reassign to
 *	aid in building applications on top of it. You do not need to reassign them, the
 *	album viewer will function correctly normally, but you may wish to reassign them
 *	to extend it's abilities.
 *
 *	onSwitchTo (				Called whenever the selected image changes.
 *		selectedImageID				The id of the newly selected image is passed as an argument
 *		)
 *
 *	loadingStarted ( )			Called whenever the AlbumViewer expects a delay in loading the requested image (more than 10 ms).
 *
 *	loadingComplete ( )			Called when the AlbumViewer has finished downloading data. Just before the fade transition has started,
 *
 *	getSrc (				Caled whenever the AlbumViewer needs to download an image. It allows you to alter the requested URL (perhaps to route it through an image resizer script)
 *		imageID					The array id of the requested image (from albumImages)
 *		)
 *		return					Your function should return a string containing the location of the image.
 *
 *	getAlt (				Called whenever the AlbumViewer want to update the "alt" text of an image. You could perhaps append you own description.
 *		imageID					The array id of the requested image (from albumImages)
 *		)
 *		return					Your function should return a string containing the new alt text for the requested image
 *
 *	getLink (				Called whenever the AlbumViewer needs to generate a link to an image. By default it just links to the image source, but you might want to make it link to a larger version, or an album page with comments.
 *		imageID					The array id of the requested image (from albumImages)
 *		)
 *		return					Your function should return a string containing the url to be used as a link to this image.
 *
 *
 *	You could reassign one of the above functions like this:
 *
 *		//(assuming an instance of the AlbumViewer named rotator)
 *
 *		rotator.getLink = function (imageID) {
 *			return "large_images/" + this.albumImages[imageID];
 *		}
 *
 *
 *
 *
 *
 *	///////////////////////////////////////////////////////////////////////////////////
 *	A note on the construction of the AlbumViewer:
 *
 *	Javascript doesn't fully support classes like other languages do. By use of the NEW
 *	keyword, you can create a copy of a function, which means you can sort of construct
 *	a class by declaring it inside a function then instantiating it with the NEW keyword.
 *
 *	The problem with this approach is that a LITERAL copy is made of the function, meaning
 *	that a lot of memory would be needlessly consumed with each new instance. The solution
 *	to this problem is to put only the constructor inside the main function, and declare
 *	any other needed functions outside of it. That way, when a copy is made, only the
 *	constructor is copied, the other functions are just referenced.
 *
 *	The problem with doing that though is that the global namespace is cluttered up with
 *	lots of extra functions. To avoid that, the AlbumViewer is encapsulated inside
 *	a closure. A closure is a function which is executed immediately after being declared.
 *	For example:
 *
 *		var aClosure = function() {
 *
 *			function do_stuff(i) {
 *				return i += 1;
 *			}
 *
 *			return function construct(arg1, arg2) {
 *				var i = do_stuff(2);
 *				return i;
 *			}
 *
 *		}();
 *
 *	Note the () at the end of the line. A closure has the effect of hiding anything that is
 *	declared within it from the global namespace. In the above instance, only "aClosure"
 *	is visible in the global namespace, and "aClosure" represents the function called
 *	"construct". When a new instance is created, only the "construct" function is copied.
 *	"do_stuff" is just linked/referenced. That is the form the AlbumViewer takes.
 *
 *	It can look a little confusing at first, but is really quite simple once you get your
 *	head around it.
 *	
 *	The other thing worth mentioning is the "self" and "priv" variable names. These variables
 *	are there to make sense of JavaScript's slightly odd approach to scoping. Essentially,
 *	the self variable always represents the currently instantiated instance of AlbumViewer.
 *	All the public methods and properties (functions and variables) are accessible through
 *	that variable. The "priv" variable is short for "private". That variable contains all 
 *	the non-public methods and properties of the currently instantiated instance of the
 *	AlbumViewer. For example, the fade() method.
 *	
 *	If you decide to edit the source code, the rule of thumb for deciding where to store a 
 *	variable is this: If you need to trust it's contents (e.g. read it back later and rely on
 *	it being correct), or if you want to keep it private, store it in "priv". If you want to 
 *	expose it to the user, whether to intentionally allow them to overwrite it or just for 
 *	informational purposes, store it in "self".
 *	
 *	Please feel free to post bug reports or feature requests on GitHub, and I'd love to take
 *	some pull requests.
 *
 *	Happy Hacking!
 *	
 *	James Swift


 */


var AlbumViewer = AlbumViewer || (function () {
	"use strict";

	var	construct, buildHTML, loadAlbum, switchTo, fade, safeImageID, findImageID,
		slideshowStop, slideshowStart, slideshowToggle,
		imageNext, imagePrevious, imageRandom,
		IS_IE, IS_OLD_IE,
		instances = 0;

	//Check whether the browser is Internet Explorer (IE)
	if (navigator.userAgent.match(/\bMSIE\b/) && (!document.documentMode || document.documentMode < 9)) {
		IS_IE = true;
	} else {
		IS_IE = false;
	}

	if ((/\bMSIE 6/.test(navigator.userAgent) || /\bMSIE 7/.test(navigator.userAgent)) && !window.opera) {
		IS_OLD_IE = true;
	} else {
		IS_OLD_IE = false;
	}


	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	construct = function (args) {

		//Make sure we're being instantiated
		if (!(this instanceof AlbumViewer)) {
			throw new Error("Constructor called as a function. (In other words you forgot the \"new\" keyword.)");
		}

		var	self = this, priv = {};

		//Keep track of the number of instances
		instances += 1;

		//Default State for user-settable variables
		self.blankImage = args.blankImage || "http://james-swift.com/images/blank.gif";						//The location of a blank image to load at startup
		self.fadeStep = args.fadeStep || 2;									//How much opacity should be added/subtracted each cycle
		self.fadeTime = args.fadeTime || 12;									//How long in ms between each cycle
		self.slideshowDelay = args.slideshowDelay || 5000;							//How long in ms before the next image is loaded
		self.slideshowRandom = args.slideshowRandom || false;							//Load random images instead of start to finish
		self.endlessAlbum = (args.endlessAlbum === undefined || args.endlessAlbum === true) ? true : false;	//Should the album reset when it reaches the end
		self.fadeBoth = args.fadeBoth || true;

		//Other slideshow variables
		priv.c1 = {};
		priv.c2 = {};
		priv.slideshowStopped = true;
		priv.instanceID = instances;
		priv.enableLinks = (args.enableLinks === undefined || args.enableLinks === true) ? true : false;
		priv.loading = false;
		priv.loadingStartedCalled = false;
		self.selectedImageID = null;
		self.selectedImageSrc = null;
		self.history = [];

		//Should we build the html elements ourselves?
		if (args.container !== null && document.getElementById(args.container) !== null) {
			//Link to main container
			priv.c0 = document.getElementById(args.container);

			//Build HTML elements
			buildHTML(priv, self);

			//Update args with element names
			args.container1 = "AlbumViewer_" + priv.instanceID + "_t1";
			args.link1 = "AlbumViewer_" + priv.instanceID + "_l1";
			args.img1 = "AlbumViewer_" + priv.instanceID + "_i1";
			args.container2 = "AlbumViewer_" + priv.instanceID + "_t2";
			args.link2 = "AlbumViewer_" + priv.instanceID + "_l2";
			args.img2 = "AlbumViewer_" + priv.instanceID + "_i2";
		}

		//Check all the needed html Elements are in place
		if (document.getElementById(args.container1)			!== null &&
				document.getElementById(args.img1)		!== null &&
				document.getElementById(args.container2)	!== null &&
				document.getElementById(args.img2)		!== null &&
				(priv.enableLinks === false || (document.getElementById(args.link1) !== null && document.getElementById(args.link2) !== null))
				) {
			//Link Elements to priv
			priv.c1.table = document.getElementById(args.container1);
			priv.c1.img = document.getElementById(args.img1);
			priv.c2.table = document.getElementById(args.container2);
			priv.c2.img = document.getElementById(args.img2);
			if (priv.enableLinks === true) {
				priv.c1.link = document.getElementById(args.link1);
				priv.c2.link = document.getElementById(args.link2);
			}

			//Fix IE7 Stupidity
			if (args.container !== null) {
				priv.c1.img.style.width = "auto";
				priv.c1.img.style.height = "auto";
				priv.c2.img.style.width = "auto";
				priv.c2.img.style.height = "auto";
			}
		} else {
			throw {
				name : "Error",
				message : "Not all elements could be found. Please check the correct element id has been specified. Unable to load album viewer."
			};
		}

		//list args for user reference
		self.args = args;

		//Declare functions that can be over-written by the user
		self.onSwitchTo = function () {};
		self.loadingStarted = function () {};
		self.loadingComplete = function () {};
		self.getSrc = function (srcID) {
			var isrc;
			if (this.imagesAreArrays === true) {
				isrc = this.albumImages[srcID][this.imageNameField];
			} else {
				isrc = this.albumImages[srcID];
			}
			if (this.albumLocation === null) {
				return isrc;
			} else {
				return this.albumLocation + isrc;
			}
		};
		self.getAlt = function (srcID) {
			if (this.imagesAreArrays === true) {
				return this.albumImages[srcID][this.imageNameField].substr(this.albumImages[srcID][this.imageNameField].lastIndexOf("/") + 1);
			} else {
				return this.albumImages[srcID].substr(this.albumImages[srcID].lastIndexOf("/") + 1);
			}
		};
		self.getLink = function (srcID) {
			var isrc;
			if (this.imagesAreArrays === true) {
				isrc = this.albumImages[srcID][this.imageNameField];
			} else {
				isrc = this.albumImages[srcID];
			}
			if (this.albumLocation === null) {
				return isrc;
			} else {
				return this.albumLocation + isrc;
			}
		};

		//Link our functions to this instance (rather than declaring them inside it which would copy them for every instance)
		self.loadAlbum		= function (album) {
			return loadAlbum(album, priv, self);
		};
		self.switchTo		= function (srcID) {
			return switchTo(srcID, priv, self);
		};
		self.safeImageID	= function (srcID) {
			return safeImageID(srcID, priv, self);
		};
		self.findImageID	= function (image) {
			return findImageID(image, priv, self);
		};
		self.slideshowStart	= function (randomly, startAt) {
			return slideshowStart(randomly, startAt, priv, self);
		};
		self.slideshowStop	= function () {
			return slideshowStop(priv, self);
		};
		self.slideshowToggle	= function () {
			return slideshowToggle(priv, self);
		};
		self.imageNext		= function () {
			return imageNext(priv, self);
		};
		self.imagePrevious	= function () {
			return imagePrevious(priv, self);
		};
		self.imageRandom	= function () {
			return imageRandom(priv, self);
		};
		priv.fade			= function () {
			return fade(priv, self);
		};

		return self;
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	buildHTML = function (priv, self) {
		var i, dm = {};
		//Empty the container
		priv.c0.innerHTML = "";
		//Build html elements
		for (i = 1; i <= 2; i += 1) {
			dm.table = document.createElement("table");
			dm.table.setAttribute("id", "AlbumViewer_" + priv.instanceID + "_t" + i);
			dm.table.setAttribute("cellpadding", "0");
			dm.table.setAttribute("cellspacing", "0");
			dm.table.style.position = "absolute";
			dm.table.style.zIndex = i;
			dm.table.style.verticalAlign = "middle";
			dm.table.style.textAlign = "center";
			dm.table.style.width = "100%";
			dm.table.style.height = "100%";

			dm.tbody = document.createElement("tbody");
			dm.tr = document.createElement("tr");
			dm.td = document.createElement("td");
			if (priv.enableLinks === true) {
				dm.a = document.createElement("a");
				dm.a.setAttribute("target", "_blank");
				dm.a.setAttribute("id", "AlbumViewer_" + priv.instanceID + "_l" + i);
				dm.img = document.createElement("img");
				dm.img.setAttribute("id", "AlbumViewer_" + priv.instanceID + "_i" + i);
				dm.img.setAttribute("src", self.blankImage);
				dm.img.setAttribute("alt", "Loading");
				dm.a.appendChild(dm.img);
				dm.td.appendChild(dm.a);
			} else {
				dm.img = document.createElement("img");
				dm.img.setAttribute("id", "AlbumViewer_" + priv.instanceID + "_i" + i);
				dm.img.setAttribute("src", self.blankImage);
				dm.img.setAttribute("alt", "Loading");
				dm.td.appendChild(dm.img);
			}
			dm.tr.appendChild(dm.td);
			dm.tbody.appendChild(dm.tr);
			dm.table.appendChild(dm.tbody);
			priv.c0.appendChild(dm.table);
		}
		return true;
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	loadAlbum = function (album, priv, self) {

		if (typeof album === "object") {
			//Convert images objects into arrays
			if (typeof album.images === "object") {
				var key, oldAlbumImages = album.images;
				album.images = [];
				for (key in oldAlbumImages) {
					if (oldAlbumImages.hasOwnProperty(key)) {
						album.images.push(oldAlbumImages[key]);
					}
				}
			}

			if (album.name && album.images && album.images.length > 0 && (album.location === null || typeof album.location === "string")) {

				//Cancel any current actions
				self.slideshowStop();

				//Populate object

				self.albumName = album.name;
				self.albumImages = album.images;
				self.selectedImageID = null;
				self.selectedImageID = null;

				self.imageNameField = album.imageNameField || "name";
				self.imagesAreArrays = false;
				if (typeof self.albumImages[0] !== "string") {
					self.imagesAreArrays = true;
				}

				if (album.location !== null) {
					album.location = album.location.replace(/\\/g, "/");
					self.albumLocation = (album.location.charAt(album.location.length - 1) !== "/") ? album.location + "/" : album.location;
				} else {
					self.albumLocation = null;
				}


				//Reset Element variables

				priv.selectedImageID = -1;
				priv.selectedContainer = 1;
				priv.c1.opacity = 100;
				priv.c2.opacity = 0;

				priv.imageNameField = self.imageNameField;
				priv.imagesAreArrays = self.imagesAreArrays;

				//Reset Opacity
				if (IS_IE === false) {
					priv.c1.table.style.opacity = (priv.c1.opacity / 100);
					priv.c2.table.style.opacity = (priv.c2.opacity / 100);
				} else {
					priv.c1.table.style.filter = "alpha(opacity=" + priv.c1.opacity + ")";
					priv.c2.table.style.filter = "alpha(opacity=" + priv.c2.opacity + ")";
				}
				return true;
			}
		}

		throw {
			name: "InvalidObject",
			message: "The album object you passed is invalid. Please make sure it contains the properties 'name','images' (and array of 1 or more image file names) and 'location' (the path to the folder containing the images)."
		};

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	switchTo = function (srcID, priv, self) {

		//Catch over-runs and handle endlessAlbum setting
		priv.nextImageID = self.safeImageID(srcID);

		//If attempting to switch to the current image, just return true (unless in random slideshow)
		if (priv.nextImageID === priv.selectedImageID && (self.slideshowRandom === false || priv.slideshowStopped === false)) {
			return true;
		}

		//Update self with currently selected image
		if (priv.selectedImageID > -1) {
			self.history.unshift(priv.selectedImageID);
		}
		self.selectedImageID = priv.nextImageID;
		if (priv.imagesAreArrays === true) {
			self.selectedImageSrc = self.albumImages[priv.nextImageID][priv.imageNameField];
		} else {
			self.selectedImageSrc = self.albumImages[priv.nextImageID];
		}

		//Call loadingStarted() in case the user has reassigned that function
		priv.loading = true;
		setTimeout(
			function () {
				if (priv.loading === true && priv.loadingStartedCalled === false) {
					self.loadingStarted();
					priv.loadingStartedCalled = true;
				}
			},
			10
		);

		//Apply actions to appropriate container
		if (priv.selectedContainer === 1) {
			//Stop any actions currently pending
			priv.c2.img.onload = null;
			priv.c2.img.src = self.blankImage;

			//Set onload to trigger fade to switch to hidden container
			priv.c2.img.onload = function () {
				clearTimeout(priv.timer);
				priv.fade();
				if (priv.c1.img.onload === null && priv.loading === true) {
					priv.loadingStartedCalled = false;
					priv.loading = false;
					self.loadingComplete();
				}
			};

			//Load next source into currently hidden container
			priv.c2.img.src = self.getSrc(priv.nextImageID);
			priv.c2.img.alt = self.getAlt(priv.nextImageID);
			if (priv.enableLinks === true) {
				priv.c2.link.href = self.getLink(priv.nextImageID);
			}

		} else {
			//Stop any actions currently pending
			priv.c1.img.onload = null;
			priv.c1.img.src = self.blankImage;

			//Set onload to trigger fade to switch to hidden container
			priv.c1.img.onload = function () {
				priv.timer = clearTimeout(priv.timer);
				priv.fade();
				if (priv.c2.img.onload === null && priv.loading === true) {
					priv.loadingStartedCalled = false;
					priv.loading = false;
					self.loadingComplete();
				}
			};

			//Load next source into currently hidden container
			priv.c1.img.src = self.getSrc(priv.nextImageID);
			priv.c1.img.alt = self.getAlt(priv.nextImageID);
			if (priv.enableLinks === true) {
				priv.c1.link.href = self.getLink(priv.nextImageID);
			}

		}

		self.onSwitchTo(priv.nextImageID);
		return true;
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	fade = function (priv, self) {
		if (priv.selectedContainer === 1) {
			priv.c1.opacity = priv.c1.opacity - self.fadeStep;
			priv.c2.opacity = priv.c2.opacity + self.fadeStep;
		} else {
			priv.c1.opacity = priv.c1.opacity + self.fadeStep;
			priv.c2.opacity = priv.c2.opacity - self.fadeStep;
		}

		//Catch over-runs
		priv.c1.opacity = (priv.c1.opacity < 0 ? 0 : (priv.c1.opacity > 100 ? 100 : priv.c1.opacity));
		priv.c2.opacity = (priv.c2.opacity < 0 ? 0 : (priv.c2.opacity > 100 ? 100 : priv.c2.opacity));

		if (IS_IE === false) {
			if (self.fadeBoth === true) { priv.c1.table.style.opacity = (priv.c1.opacity / 100); }
			priv.c2.table.style.opacity = (priv.c2.opacity / 100);
		} else {
			if (self.fadeBoth === true) { priv.c1.table.style.filter = "alpha(opacity=" + priv.c1.opacity + ")"; }
			priv.c2.table.style.filter = "alpha(opacity=" + priv.c2.opacity + ")";
		}

		//Set display to none to allow links on lower layers to work
		if (priv.c1.opacity <= 0) {
			priv.c1.table.style.display = "none";
		} else if (IS_OLD_IE) {
			priv.c1.table.style.display = "inline-block";
		} else {
			priv.c1.table.style.display = "table";
		}
		if (priv.c2.opacity <= 0) {
			priv.c2.table.style.display = "none";
		} else if (IS_OLD_IE) {
			priv.c2.table.style.display = "inline-block";
		} else {
			priv.c2.table.style.display = "table";
		}

		if (priv.c1.opacity > 0 && priv.c1.opacity < 100) {
			priv.timer = setTimeout(function () { priv.fade(); }, self.fadeTime);
		} else {
			//Update Selected source
			priv.selectedImageID = priv.nextImageID;

			//Finished fading so update priv.selectedContainer
			if (priv.selectedContainer === 1) {
				priv.c2.img.onload = null;
				priv.selectedContainer = 2;
				//Auto-load the next image if no action is currently taking place
				if (priv.c1.img.onload === null) {
					priv.c1.img.src = self.getSrc(self.safeImageID(priv.selectedImageID + 1));
				}
			} else {
				priv.c1.img.onload = null;
				priv.selectedContainer = 1;
				//Auto-load the next image if no action is currently taking place
				if (priv.c2.img.onload === null) {
					priv.c2.img.src = self.getSrc(self.safeImageID(priv.selectedImageID + 1));
				}
			}

			//Should we move onto the next picture?
			if (priv.slideshowStopped !== true) {
				if (self.slideshowRandom === false) {
					//Just move onto the next in the sequence
					priv.timer = setTimeout(
						function () {
							self.imageNext();
						},
						self.slideshowDelay
					);
				} else {
					//Pick a random picture to move onto
					priv.timer = setTimeout(
						function () {
							self.imageRandom();
						},
						self.slideshowDelay
					);
				}
			}

		}
		return true;
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	safeImageID = function (srcID, priv, self) {
		if (srcID >= self.albumImages.length) {
			srcID = self.endlessAlbum ? 0 : self.albumImages.length - 1;
		}
		if (srcID < 0) {
			srcID = self.endlessAlbum ? self.albumImages.length - 1 : 0;
		}
		if (self.albumImages[srcID] === undefined) {
			//try to find the next id in the array
			while (self.albumImages[srcID] === undefined && srcID <= self.albumImages.length) {
				srcID += 1;
			}
			//If still not found return 0
			if (self.albumImages[srcID] === undefined) {
				srcID = 0;
			}
		}
		return srcID;
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	findImageID = function (image, priv, self) {
		var img, i = 0;
		if (priv.imagesAreArrays === true) {
			for (img in self.albumImages) {
				if (self.albumImages.hasOwnProperty(img)) {
					if (self.albumImages[img][priv.imageNameField] === image) {
						return i;
					}
					i += 1;
				}
			}
		} else {
			return self.safeImageID(self.albumImages.indexOf(image));
		}
		return false;
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	slideshowStop = function (priv, self) {
		window.clearTimeout(priv.timer);
		priv.c1.img.onload = null;
		priv.c2.img.onload = null;
		priv.slideshowStopped = true;
		self.slideshowStopped = true;
		return true;
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	slideshowStart = function (randomly, startAt, priv, self) {
		self.slideshowStop();
		priv.slideshowStopped = false;
		self.slideshowStopped = false;
		if (randomly === true) {
			self.slideshowRandom = true;
		}
		if (self.slideshowRandom === true) {
			self.switchTo(Math.floor(Math.random() * (self.albumImages.length - 1)));
		} else if (priv.selectedImageID === self.albumImages.length - 1) {
			self.switchTo(0);
		} else {
			if (startAt === null || startAt === undefined) {
				self.imageNext();
			} else {
				self.switchTo(startAt);
			}
		}

		return true;
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	slideshowToggle = function (priv, self) {
		if (priv.slideshowStopped === true) {
			self.slideshowStart();
		} else {
			self.slideshowStop();
		}
		return true;
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	imageNext = function (priv, self) {
		self.switchTo(priv.selectedImageID + 1);
		return true;
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	imagePrevious = function (priv, self) {
		self.switchTo(priv.selectedImageID - 1);
		return true;
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	imageRandom = function (priv, self) {
		var rid = -1;
		//Check that there are more than two images before doing a true random switch (likely to get caught in a loop otherwise)
		if (self.albumImages.length > 2) {
			do {
				rid = Math.round(Math.random() * (self.albumImages.length - 1));
			} while (rid === priv.selectedImageID);
		} else {
			rid = priv.selectedImageID + 1;
		}
		self.switchTo(rid);
		return true;
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//Fix IE7 stupidity

	// Production steps of ECMA-262, Edition 5, 15.4.4.14
	// Reference: http://es5.github.io/#x15.4.4.14
	if (!Array.prototype.indexOf) {
	  Array.prototype.indexOf = function(searchElement, fromIndex) {
	
	    var k;
	
	    // 1. Let o be the result of calling ToObject passing
	    //    the this value as the argument.
	    if (this == null) {
	      throw new TypeError('"this" is null or not defined');
	    }
	
	    var o = Object(this);
	
	    // 2. Let lenValue be the result of calling the Get
	    //    internal method of o with the argument "length".
	    // 3. Let len be ToUint32(lenValue).
	    var len = o.length >>> 0;
	
	    // 4. If len is 0, return -1.
	    if (len === 0) {
	      return -1;
	    }
	
	    // 5. If argument fromIndex was passed let n be
	    //    ToInteger(fromIndex); else let n be 0.
	    var n = fromIndex | 0;
	
	    // 6. If n >= len, return -1.
	    if (n >= len) {
	      return -1;
	    }
	
	    // 7. If n >= 0, then Let k be n.
	    // 8. Else, n<0, Let k be len - abs(n).
	    //    If k is less than 0, then let k be 0.
	    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
	
	    // 9. Repeat, while k < len
	    while (k < len) {
	      // a. Let Pk be ToString(k).
	      //   This is implicit for LHS operands of the in operator
	      // b. Let kPresent be the result of calling the
	      //    HasProperty internal method of o with argument Pk.
	      //   This step can be combined with c
	      // c. If kPresent is true, then
	      //    i.  Let elementK be the result of calling the Get
	      //        internal method of o with the argument ToString(k).
	      //   ii.  Let same be the result of applying the
	      //        Strict Equality Comparison Algorithm to
	      //        searchElement and elementK.
	      //  iii.  If same is true, return k.
	      if (k in o && o[k] === searchElement) {
	        return k;
	      }
	      k++;
	    }
	    return -1;
	  };
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//Lastly return the constructor function
	return construct;

}());