(function(a) {
    "use strict";
	var cover;
	var profile;

	var coverWidth = 980;
    var templateHeight = 494
	var coverHeight = 300;
	var coverAndProfileHeight = 400;
	var profileFromX = 20;
	var profileFromY = 192
	var profileSize = 180;
	var marginSize = 2;
	var profileWithMargin = profileSize +marginSize;

    var b = function(a, c, d) {
        var e = document.createElement("img"),
            f, g;
        return e.onerror = c, e.onload = function() {
            g && (!d || !d.noRevoke) && b.revokeObjectURL(g), c(b.scale(e, d))
        }, window.Blob && a instanceof Blob || window.File && a instanceof File ? (f = g = b.createObjectURL(a), e._type = a.type) : f = a, f ? (e.src = f, e) : b.readFile(a, function(a) {
            var b = a.target;
            b && b.result ? e.src = b.result : c(a)
        })
    },
        c = window.createObjectURL && window || window.URL && URL.revokeObjectURL && URL || window.webkitURL && webkitURL;
		b.renderImageToCanvas = function(a, c, d, e) {
		c.width = coverWidth;
		c.height = templateHeight;
        var h = c.getContext("2d");
           
	var imageObj = new Image();
	imageObj.onload = function() {
		h.drawImage(this, 0, 0);
		var k = document.createElement("canvas"),
		l;
		k.width  = coverWidth;
		k.height = coverAndProfileHeight;
		l = k.getContext("2d");

		//first draw upload picture this should large than whole heigh of cover and profile
		l.drawImage(a,0,0, coverWidth, coverAndProfileHeight),
		//draw profile margin
		l.rect(profileFromX, profileFromY, profileWithMargin, profileWithMargin),
		l.lineWidth = marginSize,
		l.strokeStyle = 'white',
		l.stroke();
		//get cover image from process canvas
		cover = l.getImageData(0, 0, coverWidth, coverHeight);			
		//get profile image from process canvas
		profile = l.getImageData(profileFromX, profileFromY, profileWithMargin, profileWithMargin);
		//put cover into image canvas
		h.putImageData(cover, 0, 0);
		//put profile into image canvas
		h.putImageData(profile, profileFromX,profileFromY);
		k = l = null
	},
	imageObj.src = "template.jpg";
			
    }, b.coverInfo = function() {
        return [coverWidth, coverHeight];
    }, b.profileInfo = function() {
        return [profileSize, profileFromX, profileFromY];
    }, b.templateHeight = function() {
        return templateHeight;
    }, b.scale = function(a, c) {
        c = c || {};
        var d = document.createElement("canvas"),
            e = a.width,
            f = a.height,
            g = Math.max((c.minWidth || e) / e, (c.minHeight || f) / f);
        return g > 1 && (e = parseInt(e * g, 10), f = parseInt(f * g, 10)), 
			   g = Math.min((c.maxWidth || e) / e, (c.maxHeight || f) / f), 
			   g < 1 && (e = parseInt(e * g, 10), f = parseInt(f * g, 10)), 
			   a.getContext || 
			   c.canvas && d.getContext ? 
			   (d.width = e, d.height = f, a._type === "image/jpeg" ? b.renderImageToCanvas(a, d, e, f) : d.getContext("2d").drawImage(a, 0, 0, e, f), d) : 
			   (a.width = e, a.height = f, a)
    }, b.createObjectURL = function(a) {
        return c ? c.createObjectURL(a) : !1
    }, b.revokeObjectURL = function(a) {
        return c ? c.revokeObjectURL(a) : !1
    }, b.readFile = function(a, b) {
        if (window.FileReader && FileReader.prototype.readAsDataURL) {
            var c = new FileReader;
            return c.onload = c.onerror = b, c.readAsDataURL(a), c
        }
        return !1
    }, typeof define == "function" && define.amd ? define(function() {
        return b
    }) : a.loadImage = b
})(this);