let playVideoOnMobile = function () {
	const screenWidth = jQuery(window).width();
	let timeout;
	const videoEle = document.querySelector('video');
	if (screenWidth < 767) {
		if (videoEle) {
			videoEle.pause()
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				videoEle.play()
			}, 500);
		}
	}
}

let lazyLoadImage = function () {
	function preload_image(img) {
		img.src = img.dataset.src;
	}

	const config_opts = {
		rootMargin: "0px 0px 250px 0px",
	};

	let observer = new IntersectionObserver(function (entries, self) {
		for (entry of entries) {
			if (entry.isIntersecting) {
				let elem = entry.target;
				preload_image(elem);
				self.unobserve(elem);
			}
		}
	}, config_opts);

	let images = document.querySelectorAll('.lazy-load');

	for (image of images) {
		observer.observe(image);
	}
}

function randomVideo() {
	let xvideos = jQuery('.videos').data('videos')
	let temp1 = xvideos?.split(',');
	const myvideos = temp1.filter((x) => x != '')
	const arrVideos = myvideos

	var video = document.querySelector('.video-test');
	var sources = video.getElementsByTagName('source');

	const recallMe = () => {
		const random = Math.floor(Math.random() * arrVideos.length);
		const resultRan = arrVideos[random]
		sources[0].src = "../videos/short/" + resultRan;
		video.load();
		setTimeout(function () {
			video.play()
		}, 150);
	}

	recallMe()

	video.addEventListener("ended", function (e) {
		recallMe()
	});

}

let checkVideoWhenEnd = function () {
	const videos = jQuery('.home2 input[name="videos-list"]')?.val()?.toString();
	if (videos) {
		let n = 0;
		let array_vis = [];
		if (videos) {
			let temp1 = videos?.split(',');
			array_vis = temp1.filter((x) => x != '');
		}

		var video = document.querySelector('.video-item');
		var sources = video?.getElementsByTagName('source');

		let videoLoop = function () {
			if (array_vis.length > 0) {

				if (n === 0) {
					sources[0].src = array_vis[n];
					video.load();
					setTimeout(function () {
						video.play();
					}, 150);
				}

				video.addEventListener("ended", function (e) {
					n = (n === array_vis.length - 1) ? 0 : n + 1;
					sources[0].src = array_vis[n];
					video.load();
					setTimeout(function () {
						video.play();
					}, 150);

				});
			}
		}

		videoLoop()
	}
}

// let checkNamePageForHeader = function () {
//   const url = location.href;
//   let result = url.includes("work");

//   if (result === false) {
//     jQuery('.header').addClass('only-toggle')
//   }
// }

// click and go to block with ID ---------------------------------------------
let goToBlock = function (eClick, eToGo) {
	jQuery(eClick).click(function (e) {
		e.preventDefault()
		jQuery('html, body').animate({
			scrollTop: jQuery(eToGo).offset().top
		}, 1000);
	});
}

// contact form ---------------------------------------------
let contactForm = function () {
	// form contact -> chưa làm ------------------------------------------------
	function isValidForm(form) {
		isValid = true;
		var REX_IS_NUMBER = new RegExp('^[0-9]*jQuery');
		var REX_LOWERCASE = new RegExp('(?=.*[a-z])');
		var REX_UPPERCASE = new RegExp('(?=.*[A-Z])');
		var REX_NUMBER = new RegExp('(?=.*[0-9])');
		var REX_SPECIAL = new RegExp('(?=.[!@#\jQuery%\^&])');
		var REX_INTERGER = new RegExp('^[0-9]*jQuery');
		var REX_PHONE = new RegExp('^(0|84)[0-9]*jQuery');
		var REX_EMAIL = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))jQuery/);
		var REX_URL = new RegExp(/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.​\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[​6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1​,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00​a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u​00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?jQuery/i);


		form.forEach(function (input) {
			var value = jQuery(input.name).val();
			input.validators.forEach(function (validator) {
				switch (validator) {
					case 'required':
						if (value === '') {
							isValid = false;
						}
						break;
					case 'isNumber':
						if (REX_IS_NUMBER.test(value) === false) {
							isValid = false;
						}
						break;
					case 'min':
						if (+value < input.min) {
							isValid = false;
						}
						break;
					case 'max':
						if (+value > input.max) {
							isValid = false;
						}
						break;
					case 'minLength':
						if (value.length < input.minLength) {
							isValid = false;
						}
						break;
					case 'maxLength':
						if (value.length > input.maxLength) {
							isValid = false;
						}
						break;
					case 'email':
						if (REX_EMAIL.test(value) === false) {
							isValid = false;
						}
						break;
				}
			});
		});

		return isValid;
	}

	function validateForm(jQuerysubmit, form) {

		function updateView() {
			jQuery(jQuerysubmit).attr("disabled", !isValidForm(form));
		}

		var arrElement = [];
		form.forEach(function (element) {
			arrElement.push(element.name);
		});

		jQuery(arrElement.join(",")).on("change keyup", function () {
			updateView();
		});
		updateView();
	}

	let contactValidateForm = function () {
		console.log('contactValidateForm');
		var form = [{
			name: '.contact .firstname',
			validators: ['required']
		}, {
			name: '.contact .lastname',
			validators: ['required']
		}, {
			name: '.contact .phone',
			validators: ['required', 'isNumber'],
		}, {
			name: '.contact .email',
			validators: ['required']
		}]
		var jQuerysubmit = ".contact .submit";
		validateForm(jQuerysubmit, form);
	}
}

// slider on our works page -> chưa làm-----------------------------------
let ourWorkSlider = function () {

	// const quantityEle = jQuery('.work-detail [data-quantity]');
	// const quantityNumber = parseInt(quantityEle[0]?.attributes["data-quantity"].value)

	jQuery(".work-detail .slider-single").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		arrows: false,
		useTransform: true,
		asNavFor: ".work-detail .slider-nav"
	});
	jQuery(".work-detail .slider-nav").slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		asNavFor: ".work-detail .slider-single",
		arrows: true,
		focusOnSelect: true
	});

	jQuery('.slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		autoplay: true
	});

	jQuery(".slider-wrapper").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		autoplay: true,
		arrows: false,
		dots: false
	});
	jQuery(".slider-text-wrap").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: false,
		autoplay: false,
		arrows: true,
		dots: false,
		prevArrow: jQuery('.slider-text .prev'),
		nextArrow: jQuery('.slider-text .next')
	});

}

let turnOffVideoOnLocal = function () {
	// playVideoOnMobile();
	// checkVideoWhenEnd()
}

jQuery(window).on('resize', function () {
	lazyLoadImage();
	turnOffVideoOnLocal()
})

jQuery(document).ready(function () {
	goToBlock('.home1 .home3__link', ".home2")
	goToBlock('.home2 .home2__arrow', ".home3")

	lazyLoadImage();
	ourWorkSlider()
	contactForm()

	turnOffVideoOnLocal()

})

document.addEventListener("DOMContentLoaded", function () {
	window.onload = function () {
		jQuery('.loading').removeClass('active');
		window.requestAnimationFrame(function () {
			turnOffVideoOnLocal()
		})
	}
})

// document.addEventListener("resize", function () {
// 	window.onload = function () {

// 		window.requestAnimationFrame(function () {
// 			AnimationGsap()
// 		})
// 	}
// })

jQuery(window).on("scroll", function () {
	// activeMenuOnScroll()
});

// --------------------------------


// variables
var $header_top = $('.header-top');
var $nav = $('nav');



// toggle menu 
$header_top.find('a').on('click', function () {
	$(this).parent().toggleClass('open-menu');
});



// fullpage customization
$('#fullpage').length && $('#fullpage').fullpage({
	sectionsColor: ['#B8AE9C', '#348899', '#F2AE72', '#5C832F', '#B8B89F'],
	sectionSelector: '.vertical-scrolling',
	slideSelector: '.horizontal-scrolling',
	navigation: true,
	slidesNavigation: true,
	controlArrows: false,
	anchors: ['firstSection', 'secondSection', 'thirdSection', 'fourthSection', 'fifthSection'],
	menu: '#menu',

	afterLoad: function (anchorLink, index) {
		$header_top.css('background', 'rgba(0, 47, 77, .3)');
		$nav.css('background', 'rgba(0, 47, 77, .25)');
		if (index == 5) {
			$('#fp-nav').hide();
		}
	},

	onLeave: function (index, nextIndex, direction) {
		if (index == 5) {
			$('#fp-nav').show();
		}
	},

	afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
		if (anchorLink == 'fifthSection' && slideIndex == 1) {
			$.fn.fullpage.setAllowScrolling(false, 'up');
			$header_top.css('background', 'transparent');
			$nav.css('background', 'transparent');
			$(this).css('background', '#374140');
			$(this).find('h2').css('color', 'white');
			$(this).find('h3').css('color', 'white');
			$(this).find('p').css({
				'color': '#DC3522',
				'opacity': 1,
				'transform': 'translateY(0)'
			});
		}
	},

	onSlideLeave: function (anchorLink, index, slideIndex, direction) {
		if (anchorLink == 'fifthSection' && slideIndex == 1) {
			$.fn.fullpage.setAllowScrolling(true, 'up');
			$header_top.css('background', 'rgba(0, 47, 77, .3)');
			$nav.css('background', 'rgba(0, 47, 77, .25)');
		}
	}
});

function countUp(max, time) {
	var num = 0;
	var step = time / max; // calculate the time between two steps of counting
	// create an inner function that performs one step of counting
	var fn = function () {
		num++;
		if (num <= max) {
			$('.line-run').attr("stroke-dashoffset", num)
			window.setTimeout(fn, step);
		} else {
			num = 0
		}
	}
	// call the inner function for the first time
	setInterval(() => {
		fn();
	}, time);
}

countUp(40, 1500);