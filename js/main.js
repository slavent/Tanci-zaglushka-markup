$(function(){

	$(".js-video-popup").attr('rel', 'playlist').fancybox({
		fitToView	: false,
		width		: 960,
		height		: 540,
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none',
		prevEffect 	: 'none',
	    nextEffect 	: 'none',
		padding		: 20,
		autoResize	: false
	});

	$(".share-block a").on("click", function(){
		$(".social-likes").find(".social-likes__widget_" + $(this).data("social")).click();

		return false;
	});

	$(".video__wrp").tanciScroll();

	$('.draggable').draggable({
		axis: "x",
		grid: [40,18],
		containment: "parent",
		start: function(){
			
		},
		stop: function(){
			var pos = parseInt($(".video-ribbon__spinner").css("left")),
				ribbon_el_width_and_margin = parseInt($(".video-ribbon__spinner .video-ribbon__item").css("width")) + parseInt($(".video-ribbon__spinner .video-ribbon__item").css("marginRight")) + parseInt($(".video-ribbon__spinner .video-ribbon__item").css("marginLeft")),
				el_width = $(".video-list").children().eq(0).width() + 16,
				step = Number(pos/ribbon_el_width_and_margin);

			$(".video-list").animate({"marginLeft": -el_width * step}, 500);
		}
	});
});
