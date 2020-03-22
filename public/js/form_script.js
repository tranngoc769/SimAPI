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



		$("#APItest").submit(function (event) {
			// prevent default submit
			console.log('Send request');
			$('#waitRequest').html(`
			<div id='loadProcess'  class="loader">
			<div class="inner one"></div>
			<div class="inner two"></div>
			<div class="inner three"></div>
			<p style="margin-top: 70px;"> Loading</p>
			</div>
			`);
			event.preventDefault();
			var messages = $('#messagesParam').val();
			var language = $('#lanParam').val();
			$.getJSON(`../api/text=${messages}&lan=${language}`, function (data, textStatus, jqXHR) {
				$('#loadProcess').remove();
			})
				.done(function (data) {
					console.log(data);
					$('#myModal').modal('show');
					$('.modal-body p').html(`
					<p> Request messages  : ${messages}</p>
					<p> Request language  : ${language}</p>
					<p> Response messages : ${data.messages[0].text}</p>
					`)
				})
				.fail(function (jqxhr, settings, ex) {
					$('#myModal').modal('show');
					$('.modal-title').html('Request failed');
					$('.modal-body p').html(`
					<p> Erro : ${ex}</p>
					`)
				});
		});
	};

}(jQuery));

/* End of ajax */


// Make them as plugin
