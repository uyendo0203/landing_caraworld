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

jQuery(window).on('resize', function () {
})
jQuery(document).ready(function () {
	// goToBlock('.home1 .home3__link', ".home2")

	lazyLoadImage();
	contactForm()
})
jQuery(window).on("scroll", function () {
});

// --------------------------------


// variables
var $header_top = $('.header-top');
var $nav = $('nav');


// toggle menu 
$header_top.find('a').on('click', function () {
	$(this).parent().toggleClass('open-menu');
});


