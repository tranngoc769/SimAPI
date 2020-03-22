"use strict";

/* Ajax Form Plugin V 1.0.1
 * Send contact and newsletter form data to a server and waiting for its response.
 * Compatible with jqery validator plugin
 */

(function ($) {

	$.fn.initForm = function (options) {
		var settings = $.extend({
			type: 'post',
			serverUrl: '#',
			successClean: this.find('.form-success-clean'),
			successGone: this.find('.form-success-gone'),
			successInvisible: this.find('.form-success-invisible'),
			successVisible: this.find('.form-success-visible'),
			textFeedback: this.find('.form-text-feedback'),
		}, options);
		//if jquery validator plugin is enable, use it	
		if (jQuery.validator) {
			jQuery.validator.setDefaults({
				success: "valid"
			});
			this.validate({
				rules: {
					field: {
						required: true,
						email: true
					}
				}
			});
		}



	
	};

}(jQuery));

/* End of ajax */


// Make them as plugin
