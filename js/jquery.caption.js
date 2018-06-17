/*
* jQuery.caption v0.9.1
*
*/

(function($){

	var settings = {};

	var methods = {

		init : function(options){

			settings = $.extend({
				'figureClass' : 'figure',
				'figcaptionClass' : 'figcaption',
				'lineBreak' : ' - ',
				'visible' : false
			}, options);

			return this.each(function(){

				var alt = $(this).attr('alt');

				if(alt !== undefined){

					if(!$(this).data('caption')){
						var html = "";
						var lines = alt.split(new RegExp(settings.lineBreak));
						for(var i = 0;i < lines.length;i++){
							if(i === 0){
								html += "<em>"+lines[i]+"</em>";
							}
							else{
								html += "<br/>"+lines[i];
							}
						}
						var figure = $('<figure />', {'class' : settings.figureClass});
						var figcaption = $('<figcaption />', {html : html, 'class' : settings.figcaptionClass});
						$(this).data('caption', {target : $(this), figure : figure, figcaption : figcaption});
					}

					$(this).wrap($(this).data('caption').figure);
					$(this).after($(this).data('caption').figcaption);

					if(settings.visible !== true){
						$(this).data('caption').figcaption.hide();
					}

					$(this).bind('mouseenter.caption mouseleave.caption', function(){
						$(this).data('caption').figcaption.stop().fadeToggle();
					});
				}
				else{
					$.error("'alt' attribute is not present on element");
				}
			});
		},

		destroy : function(){

			return this.each(function(){

				$(window).unbind('.caption');
				$(this).data('caption').figure.remove();
				$(this).data('caption').figcaption.remove();
				$(this).removeData('caption');
			});
		}
	};

	$.fn.caption = function(method){

		if(typeof method === 'object' || !method){
			return methods.init.apply( this, arguments );
		}
		else if(methods[method]){
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		}
		else{
			$.error( 'Method ' +  method + ' does not exist on jQuery.caption' );
		}
	};

})(jQuery);
