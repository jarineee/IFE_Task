
'use strict';
				       
(function (global) {
				// carousel的处理代码在这里
				var carousel = function () {
					$('.carousel .item').each(function (i, e) {
						var imgsrc = $(e).data('img-src');
						$(e).css('background-image', 'url(' + imgsrc + ')');
					});
				};
				carousel();
				//tooltip工具激活
				 $('[data-toggle="tooltip"]').tooltip();
			})(window);