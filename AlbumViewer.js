/*
 *	Swift Web Development Framework - Album Viewer
 *
 *	Copyright James Swift 2012 - Creative Commons Attribution-ShareAlike 3.0
 *
 *	2013-01-25  - Version: v0.23.0
 *
 *	This file creates a global object named SWDF_album_viewer which allows you to
 *	easily insert a simple album viewer into any element on a page.
 *
 *	///////////////////////////////////////////////////////////////////////////////////
 *	Here is an example implementation:
 *
 *		//Initialize album viewer
 *		rotator = new SWDF_album_viewer({
 *			container:"MY_CUSTOM_DIV",
 *			slideshow_delay:6500
 *		});
 *
 *		 //Load Album
 *		rotator.load_album({
 *			name:"example",
 *			location:"images/example_album/",
 *			images:['img1.jpg','other_img.jpg','test.gif']
 *		});
 *
 *		//Make it an endlessly repeating album
 *		rotator.endless_album=true;
 *
 *		//Start a slideshow
 *		rotator.slideshow_start();
 *
 *
 *
 *	///////////////////////////////////////////////////////////////////////////////////
 *	The SWDF_album_viewer has the following user-setable variables:
 *
 *	The following can only be set as elements in the constructor object (they cannot
 *	be altered once the SWDF_album_viewer has been initialized). If you do not specify
 *	"container", the SWDF_album_viewer will look for the other 6 variables listed below
 *	it. You should only specify one group or the other.
 *
 *	enable_links		boolean	If you plan to have the displayed images link to their source files, set this to true. If set to false, no links will be generated.
 *
 *	--------------------------------------------------------------------------------------------
 *	container		string	The ID of a div or other element to construct a simple album viewer inside. If you plan to construct a complex viewer, create and then specify each element below in your html file instead.
 *	--------------- OR -------------------------------------------------------------------------
 *	container1		string	The ID of the table, div or other element containing the first image.
 *	link1			string	The ID of the anchor (<a>) element associated with the first image. Optional.
 *	img1			string	The ID of the actual img (<img>) element for the first image.
 *	container2		string	The ID of the table, div or other element containing the second image.
 *	link2			string	The ID of the anchor (<a>) element associated with the second image. Optional.
 *	img2			string	The ID of the actual img (<img>) element for the second image.
 	--------------------------------------------------------------------------------------------
 *
 *	The following are optional and can either be set as elements in the constructor
 *	object or later by editing the new instance using the . dot notation:
 *
 *	blank_image		string	The path to a blank gif image. Used as the initial image to fade from. Default is "images/blank.png"
 *	fade_step		number	The amount of opacity to add/subtract on each frame of the fading proccess. A smaller value is smoother, but fades slower.
 *	fade_time		number	The time in ms between frames of the fader. A larger value fades slower, but may appear more jerky.
 *	fade_both		boolean	Default: true. By default the album viewer, when transitioning, will fade both images - the current and the new - in case they are different dimension (otherwise the edges of one mgiht just suddenly appear). If you know for sure your images will be the same size, you can specify false to halve the browsers work load.
 *	slideshow_delay		number	The delay between each slide in ms.
 *	slideshow_random	boolean	If set to true, the slideshow will display the images randomly instead of sequentially.
 *	endless_album		boolean	When set to true, once the slideshow has reached the end of the album it will continue from the start. Otherwise the slideshow will just end.
 *
 *
 *
 *	///////////////////////////////////////////////////////////////////////////////////
 *	The SWDF_album_viewer has the following non-setable variables which can be accessed
 *	(after the album viewer has been intiialized), using the . dot notation. They are
 *	provided for referrence only, altering them will not change anything.
 *
 *	args			array	The arguments that where passed to the constructor. Includes the IDs for the container group even if they were not specified (as in rotator.args.img1, rotator.args.container1, rotator.args.link2 etc.) for refference.
 *	selected_image_id	number	The array ID of the currently selected image.
 *	selected_image_src	string	The image name as taken from "album_images". Has not been passed through get_src().
 *	history			array	This array contains the history of requested images. Item 0 is always the last requested image (history is unshift-ed rather than push-ed). The currently selected image is not stored in history, but is found in "selected_image_id".
 *	album_name		string	The name of the album as passed in by load_album()
 *	album_location		string	The path to the album as passed in by load_album()
 *	album_images		array	The array of images passed in by load_album(). May be an array of strings containing the image name (as indicated by the variable "images_are_arrays" = false), or an array of arrays containing image properties ("images_are_arrays" = true).
 *	images_are_arrays	boolean Indicates whether "album_images" is an array of strings, or an array of arrays.
 *	image_name_field	string	If "album_images" is an array of arrays the value of this variable indicates the field in each array that contains the image's file name. (I.E. album_images[images_name_field] = "test.jpg") Defaults to "name".
 *	slideshow_stopped	boolean	If the slideshow is stopped, this variable will be set to true.
 *
 *
 *
 *	///////////////////////////////////////////////////////////////////////////////////
 *	The SWDF_album_viewer has the following functions (methods) which you can use to
 *	controll it:
 *
 *	load_album (				Call load_album to (re-)initialize the album viewer with album data. returns true on success, throws an error on failure.
 *		object {				It only has one argument, which must be an object.
 *			name					REQUIRED A string containing the name of your album.
 *			images					REQUIRED An array of strings containing image names OR an array of arrays containing image properties. If you are using an array of arrays please indicate which field will contain each image's file name by specifying image_field_name (see below).
 *			location				OPTIONAL A string containing the path to the folder containing your album images. By default the album viewer will combine this path with the selected image filename when loading the source file. (E.G. my_album_location/image1.jpg), but if each image is in a different locationecory you can set "location" null and hard code the full path into each image's file name in the "images" array.
 *			image_name_field			OPTIONAL If "images" is an array of arrays the value of this variable indicates the field in each array that contains the image's file name. (I.E. if "images[0].fileName = 'test.jpg'" set this variable to "fileName") Defaults to "name".
 *		  }
 *		)
 *
 *	switch_to (				Call switch_to to display a specific image form the "album_images" array.
 *			image_id			The "Images" array id of an image you want to switch to. If the id is out of bounds it will be corrected.
 *		)
 *
 *	find_image_id (				Call this when you want to find the id of an image's file-name. Returns the id of the item in the album_images array on success, boolean false on failure.
 *			image_name		The name of the image
 *		      )
 *
 *	safe_image_id (				When processing user defined image IDs, pass them through this function. It will check they are valid, and try to intelligently guess what the user wanted if the id is invalid. (For example, if the id is past the end of the album it will either return the last image or if endless_album==true it will return the first image).
 *			image_id		The numerical id which might represent an image
 *		      )
 *
 *	next_image ( )				Moves to the next image in the array. If "endless_album" is true, it will reset to the begining of the array once the last item has been reached.
 *
 *	previous_image ( )			Moves to the previous image in the array. If "endless_album" is true, it will start at the end of the array once the first item in the array has been reached.
 *
 *	random_image ( )			Displays a random image form the "album_images" array.
 *
 *	start_slideshow (			Starts a slideshow of the images in "album_images"
 *			randomly			If this argument is true, it will set "slideshow_random" to true and play a random never-ending slideshow.
 *			start_at			The ID of the image to start the slideshow at. If not set, will default to next image();
 *		)
 *
 *	stop_slideshow ( )			Stops the slideshow (if one is taking place).
 *
 *	toggle_slideshow ( )			Starts/Stops the slideshow depending on it's state.
 *
 *
 *
 *
 *
 *
 *	///////////////////////////////////////////////////////////////////////////////////
 *	The SWDF_album_viewer has the following functions available for you to reassign to
 *	aid in building applications on top of it. You do not need to reassign them, the
 *	album viewer will function correctly normally, but you may wish to resaign them
 *	to extend it's abilities.
 *
 *	on_switch_to (				Called whenever the selected image changes.
 *		selected_image_id		The id of the newly selected image is passed as an argument
 *		)
 *
 *	loading_started ( )			Called whenever the SWDF_album_viewer expects a delay in loading the requested image (more than 10 few ms).
 *
 *	loading_completed ( )		Called when the SWDF_album_viewer has finished dowloading data. Just beofre the fade transition has started,
 *
 *	get_src (					Caled whenever the SWDF_album_viewer needs to download an image. It allows you to alter the requested URL (perhaps to route it through an image resizer script)
 *		image_id				The array id of the requested image (from album_images)
 *		)
 *		return				Your function should return a string containg the location of the image.
 *
 *	get_alt (					Caled whenever the SWDF_album_viewer want to update the "alt" text of an image. You could perhpas append you own description.
 *		image_id				The array id of the requested image (from album_images)
 *		)
 *		return				Your function should return a string containg the new alt text for the requested image
 *
 *	get_link (				Caled whenever the SWDF_album_viewer needs to generate a link to an image. By default it just links to the image source, but you might want to make it link to a larger version, or an album page with cooments.
 *		image_id				The array id of the requested image (from album_images)
 *		)
 *		return				Your function should return a string containg the url to be used as a link to this image.
 *
 *
 *	You could reasign one of the above functions like this:
 *
 *		//(assuming an instance of the SWDF_album_viewer named rotator)
 *
 *		rotator.get_link = function(image_id){
 *			return "large_images/" + this.album_images[image_id];
 *		}
 *
 *
 *
 *
 *
 *	///////////////////////////////////////////////////////////////////////////////////
 *	A note on the construction of the SWDF_album_viewer:
 *
 *	Javascript doesn't fully support classes like other languages do. By use of the NEW
 *	keyword, you can create a copy of a function, which means you can sort of construct
 *	a class by declaring it inside a function then instantiating it with the NEW keyword.
 *
 *	The problem with this approach is that a LIERAL copy is made of the function, meaning
 *	that a lot of memory would be needlessly consumed with each new instance. The solution
 *	to this problem is to put only the constructor inside the main function, and declare
 *	any other needed functions outside of it. That way, when a copy is made, only the
 *	constructor is copied, the other functions are just refferenced.
 *
 *	The problem with doing that though is that the global namespace is cluttered up with
 *	lots of extra functions. To avoid that, the SWDF_album_viewer is encapsulated inside
 *	a closure. A closure is a function which is executed imediately after being declared.
 *	For example:
 *
 *		var a_closure = function(){
 *
 *			function do_stuff(i){
 *				return i+=1;
 *			}
 *
 *			return function construct(arg1,arg2){
 *				var i=do_stuff(2);
 *				return i;
 *			}
 *
 *		}();
 *
 *	Note the () at the end of the line. A closure has the effect of hiding anything that is
 *	declared within it from the global namespace. In the above instance, only "a_closure"
 *	is visible in the global namespace, and "a_closure" represents the function called
 *	"construct". When a new instance is created, only the "construct" function is copied.
 *	"do_stuff" is just linked/referenced. That is the form the SWDF_album_viewer takes.
 *
 *	It can look a little confusing at first, but is really quite simple once you get your
 *	head around it.
 */


var SWDF_album_viewer = SWDF_album_viewer || ( function () {
	"use strict";

	var	construct, build_html, load_album, switch_to, fade, safe_image_id, find_image_id,
		stop_slideshow, start_slideshow, toggle_slideshow,
		next_image, previous_image, random_image,
		IS_IE,IS_OLD_IE,
		instances=0;

	//Check wether the browser is Internet Explorer (IE)
	if (navigator.userAgent.match(/\bMSIE\b/) && (!document.documentMode || document.documentMode < 9)) {
		IS_IE=true;
	} else {
		IS_IE=false;
	}

	if (( /\bMSIE 6/.test(navigator.userAgent) || /\bMSIE 7/.test(navigator.userAgent))&& !window.opera){
		IS_OLD_IE=true;
	} else {
		IS_OLD_IE=false;
	}


	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	construct = function (args){
		var	that = this, me = {};

		//Keep track of the number of instances
		instances+=1;

		//Default State for user-setable variables
		that.blank_image = args.blank_image || "images/blank.png";						//The location of a blank image to load at startup
		that.fade_step = args.fade_step || 2;									//How much opacity should be added/subtracted each cycle
		that.fade_time = args.fade_time || 12;									//How long in ms between each cycle
		that.slideshow_delay = args.slideshow_delay || 5000;							//How long in ms before the next image is loaded
		that.slideshow_random = args.slideshow_random || false;							//Load random images instead of start to finish
		that.endless_album = (args.endless_album===undefined || args.endless_album===true) ? true : false;	//Should the album reset when it reaches the end
		that.fade_both = args.fade_both || true;

		//Other slideshow variables
		me.c1 = {};
		me.c2 = {};
		me.slideshow_stopped = true;
		me.instance_id=instances;
		me.enable_links=(args.enable_links===undefined || args.enable_links===true) ? true : false;
		me.loading=false;
		me.loading_started_called=false;
		that.selected_image_id=null;
		that.selected_image_src=null;
		that.history=[];

		//Should we build the html elements ourselves?
		if (args.container!==null && document.getElementById(args.container)!== null){
			//Link to main container
			me.c0=document.getElementById(args.container);

			//Build HTML elements
			build_html(me, that);

			//Update args with element names
			args.container1="SWDF_album_viewer_"+me.instance_id+"_t1";
			args.link1="SWDF_album_viewer_"+me.instance_id+"_l1";
			args.img1="SWDF_album_viewer_"+me.instance_id+"_i1";
			args.container2="SWDF_album_viewer_"+me.instance_id+"_t2";
			args.link2="SWDF_album_viewer_"+me.instance_id+"_l2";
			args.img2="SWDF_album_viewer_"+me.instance_id+"_i2";
		}

		//Check all the needed html Elements are in place
		if (
			document.getElementById(args.container1)	!== null &&
			document.getElementById(args.img1)		!== null &&
			document.getElementById(args.container2)	!== null &&
			document.getElementById(args.img2)		!== null &&
			( me.enable_links===false || ( document.getElementById(args.link1) !== null && document.getElementById(args.link2) !== null ) )
			) {
			//Link Elements to me
			me.c1.table = document.getElementById(args.container1);
			me.c1.img = document.getElementById(args.img1);
			me.c2.table = document.getElementById(args.container2);
			me.c2.img = document.getElementById(args.img2);
			if (me.enable_links===true){
				me.c1.link = document.getElementById(args.link1);
				me.c2.link = document.getElementById(args.link2);
			}

			//Fix IE7 Stupidity
			if (args.container!==null){
				me.c1.img.style.width="auto";
				me.c1.img.style.height="auto";
				me.c2.img.style.width="auto";
				me.c2.img.style.height="auto";
			}
		} else {
			throw {
				name : "Error",
				message : "Not all elements could be found. Please check the correct element id has been specified. Unable to load album viewer."
			};
		}

		//list args for user refference
		that.args=args;

		//Declare functions that can be over-written by the user
		that.on_switch_to = function ( ) { };
		that.loading_started = function ( ) { };
		that.loading_completed = function ( ) { };
		that.get_src = function ( src_id ) {
			var isrc;
			if (this.images_are_array===true){
				isrc = this.album_images[src_id][this.image_name_field];
			} else {
				isrc = this.album_images[src_id];
			}
			if (this.album_location===null){
				return isrc;
			} else {
				return this.album_location+isrc;
			}
		};
		that.get_alt = function ( src_id ) {
			if (this.images_are_arrays===true){
				return this.album_images[src_id][this.image_name_field].substr(this.album_images[src_id][this.image_name_field].lastIndexOf("/")+1);
			} else {
				return this.album_images[src_id].substr(this.album_images[src_id].lastIndexOf("/")+1);
			}
		};
		that.get_link = function ( src_id ) {
			var isrc;
			if (this.images_are_array===true){
				isrc = this.album_images[src_id][this.image_name_field];
			} else {
				isrc = this.album_images[src_id];
			}
			if (this.album_location===null){
				return isrc;
			} else {
				return this.album_location+isrc;
			}
		};

		//Link our functions to this instance (rather than declaring them inside it which would copy them for every instance)
		that.load_album		= function ( album )			{
			return load_album(album, me, that);
		};
		that.switch_to		= function ( src_id )			{
			return switch_to(src_id, me, that);
		};
		that.safe_image_id	= function ( src_id )			{
			return safe_image_id(src_id, me, that);
		};
		that.find_image_id	= function ( image )			{
			return find_image_id(image, me, that);
		};
		that.start_slideshow	= function ( randomly, start_at )	{
			return start_slideshow(randomly, start_at, me, that);
		};
		that.stop_slideshow	= function ( )				{
			return stop_slideshow(me, that);
		};
		that.toggle_slideshow	= function ( )				{
			return toggle_slideshow(me, that);
		};
		that.next_image		= function ( )				{
			return next_image(me, that);
		};
		that.previous_image	= function ( )				{
			return previous_image(me, that);
		};
		that.random_image	= function ( )				{
			return random_image(me, that);
		};
		me.fade			= function ( )				{
			return fade(me, that);
		};

		return that;
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	build_html = function (me, that){
		var i, dm = {};
		//Empty the container
		me.c0.innerHTML="";
		//Build html elements
		for (i=1; i<=2; i+=1){
			dm.table=document.createElement("table");
			dm.table.setAttribute("id","SWDF_album_viewer_"+me.instance_id+"_t"+i);
			dm.table.setAttribute("cellpadding","0");
			dm.table.setAttribute("cellspacing","0");
			dm.table.style.position="absolute";
			dm.table.style.zIndex=i;
			dm.table.style.verticalAlign="middle";
			dm.table.style.textAlign="center";
			dm.table.style.width="100%";
			dm.table.style.height="100%";

			dm.tbody=document.createElement("tbody");
			dm.tr=document.createElement("tr");
			dm.td=document.createElement("td");
			if (me.enable_links===true){
				dm.a=document.createElement("a");
				dm.a.setAttribute("target","_blank");
				dm.a.setAttribute("id","SWDF_album_viewer_"+me.instance_id+"_l"+i);
				dm.img=document.createElement("img");
				dm.img.setAttribute("id","SWDF_album_viewer_"+me.instance_id+"_i"+i);
				dm.img.setAttribute("src",that.blank_image);
				dm.img.setAttribute("alt","Loading");
				dm.a.appendChild(dm.img);
				dm.td.appendChild(dm.a);
			} else {
				dm.img=document.createElement("img");
				dm.img.setAttribute("id","SWDF_album_viewer_"+me.instance_id+"_i"+i);
				dm.img.setAttribute("src",that.blank_image);
				dm.img.setAttribute("alt","Loading");
				dm.td.appendChild(dm.img);
			}
			dm.tr.appendChild(dm.td);
			dm.tbody.appendChild(dm.tr);
			dm.table.appendChild(dm.tbody);
			me.c0.appendChild(dm.table);
		}
		return true;
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	load_album = function(album, me, that) {

		if (typeof album === "object"){
			//Convert images objects into arrays
			if (typeof album.images === "object"){
				var old_album_images = album.images;
				album.images=[];
				for (var key in old_album_images) {
				    if (old_album_images.hasOwnProperty(key)) {
				      album.images.push(old_album_images[key]);
				    }
				}
			}

			if (album.name && album.images && album.images.length>0 && (album.location === null || typeof album.location==="string") ){

				//Cancel any current actions
				that.stop_slideshow();

				//Populate object

				that.album_name = album.name;
				that.album_images = album.images;
				that.selected_image_id = null;
				that.selected_image_id = null;

				that.image_name_field = album.image_name_field || "name";
				that.images_are_arrays = false;
				if ( typeof that.album_images[0] !== "string"){
					that.images_are_arrays = true;
				}
				that.images_are_arrays = that.images_are_arrays;

				if (album.location!==null){
					album.location=album.location.replace(/\\/g,"/");
					that.album_location = (album.location.charAt(album.location.length-1)!=="/") ? album.location+"/" : album.location;
				} else {
					that.album_location = null;
				}


				//Reset Element variables

				me.selected_image_id = -1;
				me.selected_container = 1;
				me.c1.opacity = 100;
				me.c2.opacity = 0;

				me.image_name_field = that.image_name_field;
				me.images_are_arrays = that.images_are_arrays;

				//Reset Opacity
				if (IS_IE===false){
					me.c1.table.style.opacity=(me.c1.opacity/100);
					me.c2.table.style.opacity=(me.c2.opacity/100);
				} else {
					me.c1.table.style.filter="alpha(opacity="+me.c1.opacity+")";
					me.c2.table.style.filter="alpha(opacity="+me.c2.opacity+")";
				}
				return true;
			}
		}

		throw {
			name: "InvalidObject",
			message: "The album object you passed is invalid. Please make sure it contains the properties 'name','images' (and array of 1 or more image file names) and 'location' (the path to the folder containting the images)."
		};

	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	switch_to = function(src_id, me, that) {

		//Catch over-runs and handle endless_album setting
		me.next_image_id=that.safe_image_id(src_id);

		//If attempting to switch to the current image, just return true (unless in random slideshow)
		if (me.next_image_id===me.selected_image_id && (that.slideshow_random===false || me.slideshow_stopped===false )){
			return true;
		}

		//Update that with currently selected image
		if (me.selected_image_id>-1){
			that.history.unshift(me.selected_image_id);
		}
		that.selected_image_id=me.next_image_id;
		if (me.images_are_arrays===true) {
			that.selected_image_src=that.album_images[me.next_image_id][me.image_name_field];
		} else {
			that.selected_image_src=that.album_images[me.next_image_id];
		}

		//Call loading_started() in case the user has reassigned that function
		me.loading=true;
		setTimeout(
			function(){
				if (me.loading===true && me.loading_started_called===false){
					that.loading_started();
					me.loading_started_called=true;
				}
			}
			,10
			);

		//Apply actions to appropriate container
		if (me.selected_container===1) {
			//Stop any actions currently pending
			me.c2.img.onload=null;
			me.c2.img.src=that.blank_image;

			//Set onload to trigger fade to switch to hidden container
			me.c2.img.onload=function(){
				clearTimeout(me.timer);
				me.fade();
				if (me.c1.img.onload===null && me.loading===true) {
					me.loading_started_called=false;
					me.loading=false;
					that.loading_completed();
				}
			};

			//Load next source into currently hidden container
			me.c2.img.src=that.get_src(me.next_image_id);
			me.c2.img.alt=that.get_alt(me.next_image_id);
			if (me.enable_links===true){
				me.c2.link.href=that.get_link(me.next_image_id);
			}

		} else {
			//Stop any actions currently pending
			me.c1.img.onload=null;
			me.c1.img.src=that.blank_image;

			//Set onload to trigger fade to switch to hidden container
			me.c1.img.onload=function(){
				me.timer = clearTimeout(me.timer);
				me.fade();
				if (me.c2.img.onload===null && me.loading===true) {
					me.loading_started_called=false;
					me.loading=false;
					that.loading_completed();
				}
			};

			//Load next source into currently hidden container
			me.c1.img.src=that.get_src(me.next_image_id);
			me.c1.img.alt=that.get_alt(me.next_image_id);
			if (me.enable_links===true){
				me.c1.link.href=that.get_link(me.next_image_id);
			}

		}

		that.on_switch_to(me.next_image_id);
		return true;
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	fade = function(me, that) {
		if (me.selected_container===1) {
			me.c1.opacity=me.c1.opacity-that.fade_step;
			me.c2.opacity=me.c2.opacity+that.fade_step;
		} else {
			me.c1.opacity=me.c1.opacity+that.fade_step;
			me.c2.opacity=me.c2.opacity-that.fade_step;
		}

		//Catch over-runs
		me.c1.opacity=(me.c1.opacity<0 ? 0 : (me.c1.opacity>100 ? 100 : me.c1.opacity));
		me.c2.opacity=(me.c2.opacity<0 ? 0 : (me.c2.opacity>100 ? 100 : me.c2.opacity));

		if (IS_IE===false){
			if (that.fade_both===true) me.c1.table.style.opacity=(me.c1.opacity/100);
			me.c2.table.style.opacity=(me.c2.opacity/100);
		} else {
			if (that.fade_both===true) me.c1.table.style.filter="alpha(opacity="+me.c1.opacity+")";
			me.c2.table.style.filter="alpha(opacity="+me.c2.opacity+")";
		}

		//Set display to none to allow links on lower layers to work
		if (me.c1.opacity<=0) {
			me.c1.table.style.display="none";
		} else if (IS_OLD_IE){
			me.c1.table.style.display="inline-block";
		} else {
			me.c1.table.style.display="table";
		}
		if (me.c2.opacity<=0) {
			me.c2.table.style.display="none";
		} else if (IS_OLD_IE){
			me.c2.table.style.display="inline-block";
		} else {
			me.c2.table.style.display="table";
		}

		if (me.c1.opacity>0 && me.c1.opacity<100) {
			me.timer=setTimeout(function(){ me.fade(); },that.fade_time);
		} else {
			//Update Selected source
			me.selected_image_id=me.next_image_id;

			//Finished fading so update me.selected_container
			if (me.selected_container===1) {
				me.c2.img.onload=null;
				me.selected_container=2;
				//Auto-load the next image if no action is currently taking place
				if (me.c1.img.onload===null) {
					me.c1.img.src=that.get_src(that.safe_image_id(me.selected_image_id+1));
				}
			} else {
				me.c1.img.onload=null;
				me.selected_container=1;
				//Auto-load the next image if no action is currently taking place
				if (me.c2.img.onload===null) {
					me.c2.img.src=that.get_src(that.safe_image_id(me.selected_image_id+1));
				}
			}

			//Should we move onto the next picture?
			if (me.slideshow_stopped!==true) {
				if (that.slideshow_random===false){
					//Just move onto the next in the sequence
					me.timer=setTimeout(
						function(){
							that.next_image();
						},
						that.slideshow_delay
						);
				} else {
					//Pick a random picture to move onto
					me.timer=setTimeout(
						function(){
							that.random_image();
						},
						that.slideshow_delay
						);
				}
			}

		}
		return true;
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	safe_image_id = function(src_id, me, that){
		if (src_id>=that.album_images.length) {
			src_id = that.endless_album ? 0 : that.album_images.length-1;
		}
		if (src_id<0) {
			src_id = that.endless_album ? that.album_images.length-1 : 0;
		}
		if (that.album_images[src_id]===undefined){
			//try to find the next id in the array
			while (that.album_images[src_id]===undefined && src_id<=that.album_images.length){
				src_id+=1;
			}
			//If still not found return 0
			if (that.album_images[src_id]===undefined){
				src_id = 0;
			}
		}
		return src_id;
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	find_image_id = function(image, me, that){
		var img,i=0;
		if (me.images_are_arrays===true){
			for (img in that.album_images){
				if (that.album_images.hasOwnProperty(img)){
					if (that.album_images[img][me.image_name_field]==image) {
						return i;
					}
					i+=1;
				}
			}
		} else {
			return that.safe_image_id(that.album_images.indexOf(image));
		}
		return false;
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	stop_slideshow = function(me, that) {
		window.clearTimeout(me.timer);
		me.c1.img.onload=null;
		me.c2.img.onload=null;
		me.slideshow_stopped=true;
		that.slideshow_stopped=true;
		return true;
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	start_slideshow = function(randomly, start_at, me, that) {
		that.stop_slideshow();
		me.slideshow_stopped=false;
		that.slideshow_stopped=false;
		if (randomly===true){
			that.slideshow_random=true;
		}
		if (that.slideshow_random===true){
			that.switch_to(Math.floor(Math.random()*(that.album_images.length-1)));
		} else if (me.selected_image_id===that.album_images.length-1){
			that.switch_to(0);
		} else {
			if (start_at===null || start_at===undefined){
				that.next_image();
			} else {
				that.switch_to(start_at);
			}
		}

		return true;
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	toggle_slideshow = function(me, that) {
		if (me.slideshow_stopped===true){
			that.start_slideshow();
		} else {
			that.stop_slideshow();
		}
		return true;
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	next_image = function(me, that) {
		that.switch_to(me.selected_image_id+1);
		return true;
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	previous_image = function(me, that) {
		that.switch_to(me.selected_image_id-1);
		return true;
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	random_image = function(me, that) {
		var rid=-1;
		//Check that there are more than two images before doing a true random switch (likely to get caught in a loop otherwise)
		if (that.album_images.length>2){
			do {
				rid=Math.round(Math.random()*(that.album_images.length-1));
			} while (rid===me.selected_image_id);
		} else {
			rid=me.selected_image_id+1;
		}
		that.switch_to(rid);
		return true;
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//Fix IE7 stupidity
	if(!Array.indexOf){
		Array.prototype.indexOf = function(obj, start){
			var i;
			for(i=(start||0); i<this.length; i+=1){
				if(this[i]===obj){
					return i;
				}
			}
			return undefined;
		};
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//Lastly return the constructor function
	return construct;

}());