(function($){

	// defaults options
	var def_options = {
		visible_elems: 3,
		speed: 300
	};

	// user options
	var user_options;
	
	$.fn.tanciScroll = function(params){

		var options = $.extend({}, def_options, user_options, params),
			wrp = $(".video__wrp"),
			inner = wrp.find(".video-list"),
			elems = inner.children(),
			btn_prev = $(".video__btn-prev"),
			btn_next = $(".video__btn-next"),
			ribbon_inner = wrp.find(".video-ribbon"),
			ribbon_spinner = wrp.find(".video-ribbon__spinner"),
			ribbon_item = "<div class='video-ribbon__item'></div>",
			ribbon_btn_prev = ribbon_inner.find(".video-ribbon__btn-prev"),
			ribbon_btn_next = ribbon_inner.find(".video-ribbon__btn-next");

		var init = function(){

			var bindEvents = function(){
				ribbon_btn_next.on("click", makeStepNext);
				ribbon_btn_prev.on("click", makeStepPrev);

				btn_prev.on("click", function(){
					ribbon_btn_prev.trigger("click");
				});

				btn_next.on("click", function(){
					ribbon_btn_next.trigger("click");
				});
			};

			var makeRibbon = function(){
				wrp.addClass("js-has-ribbon");
				ribbon_inner.css({"width": 40 * elems.length});

				for(var i = 0; i < elems.length; i++){
					ribbon_inner.append(ribbon_item);
				}
			};

			var makeStepPrev = function(){
				var prev_val = ribbon_spinner.css("left");

				if(prev_val == "auto"){
					prev_val = 0;
				}

				if(parseInt(prev_val) == 0){
					return false;
				}

				ribbon_spinner.animate({"left": parseInt(prev_val) - 40}, options.speed);

				/* slide prev */
				var pos = parseInt($(".video-ribbon__spinner").css("left")),
					ribbon_el_width_and_margin = parseInt($(".video-ribbon__spinner .video-ribbon__item").css("width")) + parseInt($(".video-ribbon__spinner .video-ribbon__item").css("marginRight")) + parseInt($(".video-ribbon__spinner .video-ribbon__item").css("marginLeft")),
					el_width = elems.eq(0).width() + 16,
					step = Number(pos/ribbon_el_width_and_margin);

				$(".video-list").animate({"marginLeft": -el_width * (step - 1)}, options.speed);
			};

			var makeStepNext = function(){
				var prev_val = ribbon_spinner.css("left");

				if(prev_val == "auto"){
					prev_val = 0;
				}

				if(parseInt(prev_val) == (elems.length - (options.visible_elems - 1)) * 36){
					return false;
				}

				ribbon_spinner.animate({"left": parseInt(prev_val) + 40}, options.speed);

				/* slide next */
				var pos = parseInt($(".video-ribbon__spinner").css("left")),
					ribbon_el_width_and_margin = parseInt($(".video-ribbon__spinner .video-ribbon__item").css("width")) + parseInt($(".video-ribbon__spinner .video-ribbon__item").css("marginRight")) + parseInt($(".video-ribbon__spinner .video-ribbon__item").css("marginLeft")),
					el_width = elems.eq(0).width() + 16,
					step = Number(pos/ribbon_el_width_and_margin);

				$(".video-list").animate({"marginLeft": -el_width * (step + 1)}, options.speed);
			};

			if(elems.length > 3) {
				makeRibbon();
			}

			bindEvents();

		};

		init();

		return this;

	};

})(jQuery);