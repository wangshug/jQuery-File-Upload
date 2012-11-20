/*
 * jQuery File Upload Plugin JS Example 6.11
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint nomen: true, unparam: true, regexp: true */
/*global $, window, document */

$(function () {
    'use strict';

    // Initialize the jQuery File Upload widget:
    $('#fileupload').fileupload({
        // Uncomment the following to send cross-domain cookies:
        //xhrFields: {withCredentials: true},
        url: 'server/php/'
    });
$('#fileupload').bind('fileuploadsubmit', function (e, data) {
    // The example input, doesn't have to be part of the upload form:
    var input = $('#input');
	var cover = loadImage.coverInfo();
	var profile = loadImage.profileInfo();
    var tHeight = loadImage.templateHeight();
    data.formData = {cover_info_width :cover[0] , cover_info_height: cover[1], profile_size:profile[0] , profile_x:profile[1], profile_y:profile[2], template_height:tHeight};
});
    // Enable iframe cross-domain access via redirect option:
    $('#fileupload').fileupload(
        'option',
        'redirect',
        window.location.href.replace(
            /\/[^\/]*$/,
            '/cors/result.html?%s'
        )
    );
    if (window.location.hostname === 'lab.sunshine-wang.info') {
        // Demo settings:
        $('#fileupload').fileupload('option', {
            url: '//sunshine-wangsg.appspot.com:8080',
            maxFileSize: 5000000,
            maxNumberOfFiles: 1,
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
        });
        // Upload server status check for browsers with CORS support:
        if ($.support.cors) {
            $.ajax({
                url: '//sunshine-wangsg.appspot.com:8080/',
                type: 'HEAD'
            }).fail(function () {
                $('<span class="alert alert-error"/>')
                    .text('图片保存在google app engine上，如果您想下载请翻过我们伟大的墙 - ' +
                            new Date())
                    .appendTo('#fileupload');
            });

        }
    } else {
        // Load existing files:
        $.ajax({
            // Uncomment the following to send cross-domain cookies:
            //xhrFields: {withCredentials: true},
            url: $('#fileupload').fileupload('option', 'url'),
            dataType: 'json',
            context: $('#fileupload')[0]
        }).done(function (result) {
            if (result && result.length) {
                $(this).fileupload('option', 'done')
                    .call(this, null, {result: result});
            }
        });
    }

});
