//BildSlider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');

			if (slider.classList.contains('_swiper_scroll')) {
				let sliderScroll = document.createElement('div');
				sliderScroll.classList.add('swiper-scrollbar');
				slider.appendChild(sliderScroll);
			}
		}
		if (slider.classList.contains('_gallery')) {
			//slider.data('lightGallery').destroy(true);
		}
	}
	sliders_bild_callback();
}

function sliders_bild_callback(params) {}

let sliderScrollItems = document.querySelectorAll('._swiper_scroll');
if (sliderScrollItems.length > 0) {
	for (let index = 0; index < sliderScrollItems.length; index++) {
		const sliderScrollItem = sliderScrollItems[index];
		const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
		const sliderScroll = new Swiper(sliderScrollItem, {
			direction: 'vertical',
			slidesPerView: 'auto',
			freeMode: true,
			scrollbar: {
				el: sliderScrollBar,
				draggable: true,
				snapOnRelease: false
			},
			mousewheel: {
				releaseOnEdges: true,
			},
		});
		sliderScroll.scrollbar.updateSize();
	}
}


function sliders_bild_callback(params) {}

let slider_main = new Swiper('.slider-block__slider', {
	/*
	effect: 'fade',
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	*/
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 0,
	autoHeight: false,
	speed: 800,
	//touchRatio: 0,
	//simulateTouch: false,
	//loop: true,
	//preloadImages: false,
	//lazy: true,
	// Dotts
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	// Arrows
	navigation: {
		nextEl: '.slider-block__next',
		prevEl: '.slider-block__prev',
	},
	/*
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		992: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
		1268: {
			slidesPerView: 4,
			spaceBetween: 30,
		},
	},
	*/
	on: {
		lazyImageReady: function () {
			ibg();
		},
	}
	// And if we need scrollbar
	//scrollbar: {
	//	el: '.swiper-scrollbar',
	//},
});

let slider_hot = new Swiper('.hot-offer__slider', {
	/*
	effect: 'fade',
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	*/
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 0,
	autoHeight: true,
	speed: 800,
	watchOverflow: true,
	hashNavigation: {
		watchState: true,
	},
	//touchRatio: 0,
	//simulateTouch: false,
	//loop: true,
	//preloadImages: false,
	//lazy: true,
	// Dotts
	pagination: {
		el: '.hot-offer__pagination',
		clickable: true,
		type: "custom",
		renderCustom: function (swiper, current, total) {
			let dots = '<p class="pagination-hot-offer__dots">...</p>'
			let activeStr = ' _active';
			let currentStr = " _current";
			let isActive = true;
			let isCurrent = true;
			let countVisible = 3;

			if (total < countVisible) {
				countVisible = total
			}

			result = `<ul class="pagination-hot-offer__current-list">`

			if (countVisible == total) {
				for (let i = 0; i < countVisible; i++) {
					result += `<li><a href="#hot-${i+1}" class="pagination-hot-offer__current${current-1==i?currentStr:''}">${i+1}</a></li>`
				}
				result += `</ul>`
				return result
			}

			//Если количествено разное
			//if ((current - countVisible) <= 1 && (total - countVisible) < current - 1) {
			//  for (let index = 0; index < total; index++) {
			//    result += `<li><a href="#" class="pagination-hot-offer__current${current-1==index?currentStr:''}">${index+1}</a></li>`
			//  }
			//} else
			if (!((current - countVisible) < 1) && !((total - countVisible) < current)) {
				//Стоит в центре
				result += `<li><a href="#hot-${1}" class="pagination-hot-offer__current">${1}</a></li>`
				result += dots
				let startIndex = current - Math.floor(countVisible / 2) - 1
				for (let index = startIndex; index < startIndex + countVisible; index++) {
					result += `<li><a href="#hot-${index+1}" class="pagination-hot-offer__current${current-1==index?currentStr:''}">${index+1}</a></li>`
				}
				result += dots
				result += `<li><a href="#hot-${total}" class="pagination-hot-offer__current">${total}</a></li>`
			} else if ((current - countVisible) < 1) {
				//Стоит в начале
				let plus = (current - countVisible) == 0 ? 1 : 0;
				for (let index = 0; index < countVisible + plus; index++) {
					result += `<li><a href="#hot-${index+1}" class="pagination-hot-offer__current${current-1==index?currentStr:''}">${index+1}</a></li>`
				}

				result += dots
				result += `<li><a href="#hot-${total}" class="pagination-hot-offer__current">${total}</a></li>`
			} else {
				//Стоит в конце
				result += `<li><a href="#hot-${1}" class="pagination-hot-offer__current">${1}</a></li>`
				result += dots

				let plus = (total - countVisible) < current ? 1 : 0;
				for (let index = total - countVisible - plus; index < total; index++) {
					result += `<li><a href="#hot-${index+1}" class="pagination-hot-offer__current${current-1==index?currentStr:''}">${index+1}</a></li>`
				}
			}


			result += `</ul>`
			return result
		}
	},
	// Arrows
	navigation: {
		nextEl: '.hot-offer__next',
		prevEl: '.hot-offer__prev',
	},
	/*
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		992: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
		1268: {
			slidesPerView: 4,
			spaceBetween: 30,
		},
	},
	*/
	//on: {
	//  lazyImageReady: function () {
	//    ibg();
	//  },
	//}
	// And if we need scrollbar
	//scrollbar: {
	//	el: '.swiper-scrollbar',
	//},
});

let searchResult = new Swiper('.search-result__tickets', {
	/*
	effect: 'fade',
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	*/
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 100,
	autoHeight: true,
	speed: 800,
	watchOverflow: true,
	hashNavigation: {
		watchState: true,
	},
	//touchRatio: 0,
	//simulateTouch: false,
	//loop: true,
	//preloadImages: false,
	//lazy: true,
	// Dotts
	pagination: {
		el: '.hot-offer__pagination',
		clickable: true,
		type: "custom",
		renderCustom: function (swiper, current, total) {
			let dots = '<p class="pagination-hot-offer__dots">...</p>'
			let activeStr = ' _active';
			let currentStr = " _current";
			let isActive = true;
			let isCurrent = true;
			let countVisible = 3;

			if (total < countVisible) {
				countVisible = total
			}

			result = `<ul class="pagination-hot-offer__current-list">`

			if (countVisible == total) {
				for (let i = 0; i < countVisible; i++) {
					result += `<li><a href="#hot-${i+1}" class="pagination-hot-offer__current${current-1==i?currentStr:''}">${i+1}</a></li>`
				}
				result += `</ul>`
				return result
			}

			//Если количествено разное
			//if ((current - countVisible) <= 1 && (total - countVisible) < current - 1) {
			//  for (let index = 0; index < total; index++) {
			//    result += `<li><a href="#" class="pagination-hot-offer__current${current-1==index?currentStr:''}">${index+1}</a></li>`
			//  }
			//} else
			if (!((current - countVisible) < 1) && !((total - countVisible) < current)) {
				//Стоит в центре
				result += `<li><a href="#hot-${1}" class="pagination-hot-offer__current">${1}</a></li>`
				result += dots
				let startIndex = current - Math.floor(countVisible / 2) - 1
				for (let index = startIndex; index < startIndex + countVisible; index++) {
					result += `<li><a href="#hot-${index+1}" class="pagination-hot-offer__current${current-1==index?currentStr:''}">${index+1}</a></li>`
				}
				result += dots
				result += `<li><a href="#hot-${total}" class="pagination-hot-offer__current">${total}</a></li>`
			} else if ((current - countVisible) < 1) {
				//Стоит в начале
				let plus = (current - countVisible) == 0 ? 1 : 0;
				for (let index = 0; index < countVisible + plus; index++) {
					result += `<li><a href="#hot-${index+1}" class="pagination-hot-offer__current${current-1==index?currentStr:''}">${index+1}</a></li>`
				}

				result += dots
				result += `<li><a href="#hot-${total}" class="pagination-hot-offer__current">${total}</a></li>`
			} else {
				//Стоит в конце
				result += `<li><a href="#hot-${1}" class="pagination-hot-offer__current">${1}</a></li>`
				result += dots

				let plus = (total - countVisible) < current ? 1 : 0;
				for (let index = total - countVisible - plus; index < total; index++) {
					result += `<li><a href="#hot-${index+1}" class="pagination-hot-offer__current${current-1==index?currentStr:''}">${index+1}</a></li>`
				}
			}


			result += `</ul>`
			return result
		}
	},
	// Arrows
	navigation: {
		nextEl: '.hot-offer__next',
		prevEl: '.hot-offer__prev',
	},
	/*
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		992: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
		1268: {
			slidesPerView: 4,
			spaceBetween: 30,
		},
	},
	*/
	//on: {
	//  lazyImageReady: function () {
	//    ibg();
	//  },
	//}
	// And if we need scrollbar
	//scrollbar: {
	//	el: '.swiper-scrollbar',
	//},
});

let articleshResult = new Swiper('.articles-main__slider', {
	/*
	effect: 'fade',
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	*/
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 10,
	autoHeight: true,
	speed: 800,
	watchOverflow: true,
	hashNavigation: {
		watchState: true,
	},
	//touchRatio: 0,
	//simulateTouch: false,
	//loop: true,
	//preloadImages: false,
	//lazy: true,
	// Dotts
	pagination: {
		el: '.articles-main__pagination',
		clickable: true,
		type: "custom",
		renderCustom: function (swiper, current, total) {
			let dots = '<p class="pagination-hot-offer__dots">...</p>'
			let activeStr = ' _active';
			let currentStr = " _current";
			let isActive = true;
			let isCurrent = true;
			let countVisible = 3;

			if (total < countVisible) {
				countVisible = total
			}

			result = `<ul class="pagination-hot-offer__current-list">`

			if (countVisible == total) {
				for (let i = 0; i < countVisible; i++) {
					result += `<li><a href="#articles-${i+1}" class="pagination-hot-offer__current${current-1==i?currentStr:''}">${i+1}</a></li>`
				}
				result += `</ul>`
				return result
			}

			//Если количествено разное
			//if ((current - countVisible) <= 1 && (total - countVisible) < current - 1) {
			//  for (let index = 0; index < total; index++) {
			//    result += `<li><a href="#" class="pagination-hot-offer__current${current-1==index?currentStr:''}">${index+1}</a></li>`
			//  }
			//} else
			if (!((current - countVisible) < 1) && !((total - countVisible) < current)) {
				//Стоит в центре
				result += `<li><a href="#articles-${1}" class="pagination-hot-offer__current">${1}</a></li>`
				result += dots
				let startIndex = current - Math.floor(countVisible / 2) - 1
				for (let index = startIndex; index < startIndex + countVisible; index++) {
					result += `<li><a href="#articles-${index+1}" class="pagination-hot-offer__current${current-1==index?currentStr:''}">${index+1}</a></li>`
				}
				result += dots
				result += `<li><a href="#articles-${total}" class="pagination-hot-offer__current">${total}</a></li>`
			} else if ((current - countVisible) < 1) {
				//Стоит в начале
				let plus = (current - countVisible) == 0 ? 1 : 0;
				for (let index = 0; index < countVisible + plus; index++) {
					result += `<li><a href="#articles-${index+1}" class="pagination-hot-offer__current${current-1==index?currentStr:''}">${index+1}</a></li>`
				}

				result += dots
				result += `<li><a href="#articles-${total}" class="pagination-hot-offer__current">${total}</a></li>`
			} else {
				//Стоит в конце
				result += `<li><a href="#articles-${1}" class="pagination-hot-offer__current">${1}</a></li>`
				result += dots

				let plus = (total - countVisible) < current ? 1 : 0;
				for (let index = total - countVisible - plus; index < total; index++) {
					result += `<li><a href="#articles-${index+1}" class="pagination-hot-offer__current${current-1==index?currentStr:''}">${index+1}</a></li>`
				}
			}


			result += `</ul>`
			return result
		}
	},
	// Arrows
	navigation: {
		nextEl: '.hot-offer__next',
		prevEl: '.hot-offer__prev',
	},
	/*
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		992: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
		1268: {
			slidesPerView: 4,
			spaceBetween: 30,
		},
	},
	*/
	//on: {
	//  lazyImageReady: function () {
	//    ibg();
	//  },
	//}
	// And if we need scrollbar
	//scrollbar: {
	//	el: '.swiper-scrollbar',
	//},
});

//articles-main__slider
var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};

function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}
if (isIE()) {
	document.querySelector('body').classList.add('ie');
}
if (isMobile.any()) {
	document.querySelector('body').classList.add('_touch');
}

function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('_webp');
	} else {
		document.querySelector('body').classList.add('_no-webp');
	}
});

function ibg() {
	if (isIE()) {
		let ibg = document.querySelectorAll("._ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}
ibg();

if (document.querySelector('.wrapper')) {
	document.querySelector('.wrapper').classList.add('_loaded');
}

let unlock = true;

//=================
//Menu
let iconMenu = document.querySelector(".up-header__btn-search");
if (iconMenu != null) {
	let delay = 500;
	let menuBody = document.querySelector(".menu__body");
	let headerMenu = document.querySelector(".header__menu");
	iconMenu.addEventListener("click", function (e) {
		if (unlock) {
			//body_lock(delay);
			iconMenu.classList.toggle("_active");
			menuBody.classList.toggle("_active");
			headerMenu.classList.toggle("_active");
		}
	});
};

function menu_close() {
	let iconMenu = document.querySelector(".icon-menu");
	let menuBody = document.querySelector(".menu__body");
	iconMenu.classList.remove("_active");
	menuBody.classList.remove("_active");
}
//=================
//Spollers
let spollers = document.querySelectorAll("._spoller");
let spollersGo = true;
if (spollers.length > 0) {
	for (let index = 0; index < spollers.length; index++) {
		const spoller = spollers[index];
		spoller.addEventListener("click", function (e) {
			if (spollersGo) {
				spollersGo = false;
				if (spoller.classList.contains('_spoller-992') && window.innerWidth > 992) {
					return false;
				}
				if (spoller.classList.contains('_spoller-768') && window.innerWidth > 768) {
					return false;
				}
				if (spoller.closest('._spollers').classList.contains('_one')) {
					let curent_spollers = spoller.closest('._spollers').querySelectorAll('._spoller');
					for (let i = 0; i < curent_spollers.length; i++) {
						let el = curent_spollers[i];
						if (el != spoller) {
							el.classList.remove('_active');
							_slideUp(el.nextElementSibling);
						}
					}
				}
				spoller.classList.toggle('_active');
				_slideToggle(spoller.nextElementSibling);

				setTimeout(function () {
					spollersGo = true;
				}, 500);
			}
		});
	}
}
//=================
//SlideToggle
let _slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideDown = (target, duration = 500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}
//========================================
//Wrap
function _wrap(el, wrapper) {
	el.parentNode.insertBefore(wrapper, el);
	wrapper.appendChild(el);
}
//========================================
//RemoveClasses
function _removeClasses(el, class_name) {
	for (var i = 0; i < el.length; i++) {
		el[i].classList.remove(class_name);
	}
}
//========================================
//IsHidden
function _is_hidden(el) {
	return (el.offsetParent === null)
}
//Полифилы
(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();
//let btn = document.querySelectorAll('button[type="submit"],input[type="submit"]');
let forms = document.querySelectorAll('form');
if (forms.length > 0) {
  for (let index = 0; index < forms.length; index++) {
    const el = forms[index];
    el.addEventListener('submit', form_submit);
  }
}
async function form_submit(e) {
  let btn = e.target;
  let form = btn.closest('form');
  let error = form_validate(form);
  if (error == 0) {
    let formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
    let formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
    const message = form.getAttribute('data-message');
    const ajax = form.getAttribute('data-ajax');

    //SendForm
    if (ajax) {
      e.preventDefault();
      let formData = new FormData(form);
      form.classList.add('_sending');
      let response = await fetch(formAction, {
        method: formMethod,
        body: formData
      });
      if (response.ok) {
        let result = await response.json();
        form.classList.remove('_sending');
        if (message) {
          popup_open('_' + message + '-message');
        }
        form_clean(form);
      } else {
        alert("Ошибка");
        form.classList.remove('_sending');
      }
    }
  } else {
    let form_error = form.querySelectorAll('._error');
    if (form_error && form.classList.contains('_goto-error')) {
      _goto(form_error[0], 1000, 50);
    }
    e.preventDefault();
  }
}

function form_validate(form) {
  let error = 0;
  let form_req = form.querySelectorAll('._req');
  if (form_req.length > 0) {
    for (let index = 0; index < form_req.length; index++) {
      const el = form_req[index];
      if (!_is_hidden(el)) {
        error += form_validate_input(el);
      }
    }
  }
  return error;
}

function form_validate_input(input) {
  let error = 0;
  let input_g_value = input.getAttribute('data-value');

  if (input.getAttribute("name") == "email" || input.classList.contains("_email")) {
    if (input.value != input_g_value) {
      let em = input.value.replace(" ", "");
      input.value = em;
    }
    if (email_test(input)) {
      form_add_error(input);
      error++;
    } else {
      form_remove_error(input);
    }
  } else if (input.getAttribute("type") == "checkbox" && input.checked == false) {
    form_add_error(input);
    error++;
  } else {
    if (input.value == '') {
      form_add_error(input);
      error++;
    } else {
      form_remove_error(input);
    }
  }
  return error;
}

function form_add_error(input) {
  input.classList.add('_error');
  input.parentElement.classList.add('_error');

  let input_error = input.parentElement.querySelector('.form__error');
  if (input_error) {
    input.parentElement.removeChild(input_error);
  }
  let input_error_text = input.getAttribute('data-error');
  if (input_error_text && input_error_text != '') {
    input.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + input_error_text + '</div>');
  }
}

function form_remove_error(input) {
  input.classList.remove('_error');
  input.parentElement.classList.remove('_error');

  let input_error = input.parentElement.querySelector('.form__error');
  if (input_error) {
    input.parentElement.removeChild(input_error);
  }
}

function form_clean(form) {
  let inputs = form.querySelectorAll('input,textarea');
  for (let index = 0; index < inputs.length; index++) {
    const el = inputs[index];
    el.parentElement.classList.remove('_focus');
    el.classList.remove('_focus');
    el.value = el.getAttribute('data-value');
  }
  let checkboxes = form.querySelectorAll('.checkbox__input');
  if (checkboxes.length > 0) {
    for (let index = 0; index < checkboxes.length; index++) {
      const checkbox = checkboxes[index];
      checkbox.checked = false;
    }
  }
  let selects = form.querySelectorAll('select');
  if (selects.length > 0) {
    for (let index = 0; index < selects.length; index++) {
      const select = selects[index];
      const select_default_value = select.getAttribute('data-default');
      select.value = select_default_value;
      select_item(select);
    }
  }
}

let viewPass = document.querySelectorAll('.form__viewpass');
for (let index = 0; index < viewPass.length; index++) {
  const element = viewPass[index];
  element.addEventListener("click", function (e) {
    if (element.classList.contains('_active')) {
      element.parentElement.querySelector('input').setAttribute("type", "password");
    } else {
      element.parentElement.querySelector('input').setAttribute("type", "text");
    }
    element.classList.toggle('_active');
  });
}


//Select
let selects = document.getElementsByTagName('select');
let selectsClassName = ""
try {
  selectsClassName = selects[1].classList[0];
} catch (error) {}
if (selects.length > 0) {
  selects_init();
}

function selects_init() {
  for (let index = 0; index < selects.length; index++) {
    const select = selects[index];
    select_init(select, index);
  }
  //select_callback();
  document.addEventListener('click', function (e) {
    selects_close(e);
  });
  document.addEventListener('keydown', function (e) {
    if (e.code === 'Escape') {
      selects_close(e);
    }
  });
}

function selects_close(e) {
  const selects = document.querySelectorAll('.select');
  if (!e.target.closest('.select')) {
    for (let index = 0; index < selects.length; index++) {
      const select = selects[index];
      const select_body_options = select.querySelector('.select__options');
      select.classList.remove('_active');
      select.children[1].children[0].classList.remove('_active');
      select.children[1].classList.remove('_active');
      _slideUp(select_body_options, 250);
    }
  }
}

function select_init(select, index) {
  const select_parent = select.parentElement;
  const select_modifikator = select.getAttribute('class');
  const select_selected_option = select.querySelector('option:checked');
  select.setAttribute('data-default', select_selected_option.value);
  select.style.display = 'none';

  select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');

  let new_select = select.parentElement.querySelector('.select');
  new_select.appendChild(select);
  select_item(select, index);
}

function select_item(select, index) {
  const select_parent = select.parentElement;
  const select_items = select_parent.querySelector(`.select__item_${index} ${selectsClassName}_item`);
  const select_options = select.querySelectorAll('option');
  const select_selected_option = select.querySelector('option:checked');
  const select_selected_text = select_selected_option.text;
  const select_type = select.getAttribute('data-type');

  if (select_items) {
    select_items.remove();
  }

  let select_type_content = '';
  if (select_type == 'input') {
    select_type_content = `<div class="select__value select__value_${index} ${selectsClassName}_value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="` + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
  } else {
    select_type_content = `<div class="select__value select__value_${index} ${selectsClassName}_value icon-select-arrow"><span>` + select_selected_text + '</span></div>';
  }

  select_parent.insertAdjacentHTML('beforeend',
    `<div class="select__item select__item_${index} ${selectsClassName}_item">` +
    `<div class="select__title select__title_${index} ${selectsClassName}_title">` + select_type_content + '</div>' +
    `<div class="select__options select__options_${index} ${selectsClassName}_options">` + select_get_options(select_options) + '</div>' +
    '</div></div>');

  select_actions(select, select_parent, index);
}

function select_actions(original, select, index) {
  const select_item = select.querySelector(`.select__item`);
  const select_body_options = select.querySelector(`.select__options_${index}`);
  const select_options = select.querySelectorAll('.select__option');
  const select_type = original.getAttribute('data-type');
  const select_input = select.querySelector('.select__input');

  select_item.addEventListener('click', function () {
    let selects = document.querySelectorAll('.select');
    for (let index = 0; index < selects.length; index++) {
      const select = selects[index];
      const select_body_options = select.querySelector('.select__options');
      if (select != select_item.closest('.select')) {
        select.classList.remove('_active');
        select.children[1].children[0].classList.remove('_active');
        select.children[1].classList.remove('_active');
        _slideUp(select_body_options, 250);
      }
    }
    _slideToggle(select_body_options, 250);
    select.classList.toggle('_active');
    select.children[1].children[0].classList.toggle('_active');
    select.children[1].classList.toggle('_active');
  });

  for (let index = 0; index < select_options.length; index++) {
    const select_option = select_options[index];
    const select_option_value = select_option.getAttribute('data-value');
    const select_option_text = select_option.innerHTML;

    if (select_type == 'input') {
      select_input.addEventListener('keyup', select_search);
    } else {
      if (select_option.getAttribute('data-value') == original.value) {
        select_option.style.display = 'none';
      }
    }
    select_option.addEventListener('click', function () {

      for (let index = 0; index < select_options.length; index++) {
        const el = select_options[index];
        el.style.display = 'block';
      }
      if (select_type == 'input') {
        select_input.value = select_option_text;
        original.value = select_option_value;
      } else {
        select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
        original.value = select_option_value;
        select_option.style.display = 'none';
      }
    });
  }
}

function select_get_options(select_options) {
  if (select_options) {
    let select_options_content = '';
    for (let index = 0; index < select_options.length; index++) {
      const select_option = select_options[index];
      const select_option_value = select_option.value;
      if (select_option_value != '') {
        const select_option_text = select_option.text;
        select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
      }
    }
    return select_options_content;
  }
}

function select_search(e) {
  let select_item = select.querySelector(`.select__item`);
  let select_title = select.querySelector(`.select__title`);
  let select_block = e.target.closest('.select ').querySelector('.select__options');
  let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
  let select_search_text = e.target.value.toUpperCase();

  for (let i = 0; i < select_options.length; i++) {
    let select_option = select_options[i];
    let select_txt_value = select_option.textContent || select_option.innerText;
    if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
      select_option.style.display = "";
    } else {
      select_option.style.display = "none";
    }
  }
}

function selects_update_all() {
  let selects = document.querySelectorAll('select');
  if (selects) {
    for (let index = 0; index < selects.length; index++) {
      const select = selects[index];
      select_item(select);
    }
  }
}

//Placeholers
let inputs = document.querySelectorAll('input[data-value],textarea[data-value]');
inputs_init(inputs);

function inputs_init(inputs) {
  if (inputs.length > 0) {
    for (let index = 0; index < inputs.length; index++) {
      const input = inputs[index];
      const input_g_value = input.getAttribute('data-value');
      input_placeholder_add(input);
      if (input.value != '' && input.value != input_g_value) {
        input_focus_add(input);
      }
      input.addEventListener('focus', function (e) {
        if (input.value == input_g_value) {
          input_focus_add(input);
          input.value = '';
        }
        form_remove_error(input);
      });
      input.addEventListener('blur', function (e) {
        if (input.value == '') {
          input.value = input_g_value;
          input_focus_remove(input);
        }
      });
    }
  }
}

function input_placeholder_add(input) {
  const input_g_value = input.getAttribute('data-value');
  if (input.value == '' && input_g_value != '') {
    input.value = input_g_value;
  }
}

function input_focus_add(input) {
  input.classList.add('_focus');
  input.parentElement.classList.add('_focus');
}

function input_focus_remove(input) {
  input.classList.remove('_focus');
  input.parentElement.classList.remove('_focus');
}

function input_clear_mask(input, input_g_value) {
  input.inputmask.remove();
  input.value = input_g_value;
  input_focus_remove(input);
}

//RANGE
const priceSlider = document.querySelector('.return-main-info-ticket__range');
if (priceSlider) {
  noUiSlider.create(priceSlider, {
    start: [10, 45],
    behaviour: 'drag',
    step: 1,
    connect: true,
    range: {
      'min': 1,
      'max': 60
    }
  });
}

const filterSlider = document.querySelector('.filters-search-result__range');
if (filterSlider) {
  noUiSlider.create(filterSlider, {
    start: [10, 45],
    behaviour: 'drag',
    step: 1,
    connect: true,
    range: {
      'min': 1,
      'max': 60
    }
  });
}
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";


function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();
let menuPageBurger = document.querySelector('.up-header__btn-search');
let menuPageBody = document.querySelector('.header__menu');
let openBurger = sessionStorage.getItem('burger') == 'true' ? true : false
if (menuPageBurger && menuPageBody) {
  menuPageBurger.addEventListener("click", function (e) {
    //menuPageBurger.classList.toggle('_active');
    _slideToggle(menuPageBody);
    openBurger = !openBurger;
    sessionStorage.setItem('burger', openBurger)
  });
}

if (openBurger) {
  _slideToggle(menuPageBody, 0); // Операция, которая должна быть выполнена
}



let filtersList = document.querySelectorAll('.filters-hot-offer__btn');
if (filtersList.length > 0) {
  for (let index = 0; index < filtersList.length; index++) {
    const element = filtersList[index];
    element.addEventListener("click", function (e) {
      element.classList.toggle('_active');
    });
  }
}

let searchFilters = document.querySelector('.search-result__filters');
let searchBtnFilters = document.querySelector('.search-result__filters-btn');
if (searchFilters && searchBtnFilters) {
  searchBtnFilters.addEventListener("click", function (e) {
    //menuPageBurger.classList.toggle('_active');
    _slideToggle(searchFilters);
  });
}

let resultCheckbox = document.querySelectorAll('.filters-search-result__checkbox');
if (resultCheckbox.length > 0) {
  resultCheckbox[0].addEventListener("change", function (e) {
    if (this.checked) {
      for (let i = 0; i < resultCheckbox.length; i++) {
        resultCheckbox[i].checked = true;
      }
    }
  });
  for (let i = 1; i < resultCheckbox.length; i++) {
    const element = resultCheckbox[i];
    element.addEventListener("change", function (e) {
      if (!this.checked) {
        resultCheckbox[0].checked = false;
      }
    });
  }
}

let trash = document.querySelectorAll('#trash')[0]
if (trash && spollersGo && filterSlider) {
  trash.addEventListener("click", function (e) {
    spollersGo = false
    for (let i = 0; i < resultCheckbox.length; i++) {
      const element = resultCheckbox[i];
      element.checked = false;
    }
    filterSlider.noUiSlider.updateOptions({
      start: [10, 45],
    });
    setTimeout(function () {
      spollersGo = true;
    }, 500);
  });
  trash.addEventListener("mouseover", function (e) {
    this.classList.toggle("_active");
  });
  trash.addEventListener("mouseout", function (e) {
    this.classList.toggle("_active");
  });

}

const menuBtn = document.querySelector('.menu__btn');
const input2 = document.querySelectorAll('.autocomplete-wrap')[1]
const input1 = document.querySelectorAll('.autocomplete-wrap')[0]
//console.log(document.querySelectorAll('.autocomplete-wrap')[0]);
menuBtn.addEventListener('click', (event) => {
  event.preventDefault()
  let data1 = searchInputs[0].dataset.value
  let data2 = searchInputs[1].dataset.value
  //console.log(searchInputs[0].dataset.value.split(' '), searchInputs[1].dataset.value.split(' '));
  if (data1.length > 0 && data2.length > 0) {

    if (data1 == data2) {
      searchInputs[1].classList.add('_error')
      let tip = document.querySelectorAll('.antother-city')[1]
      tip.classList.add('_active');

      return false
    }
    let tempSelectedDay = String(selectedDay).length == 1 ? `0${selectedDay}` : selectedDay
    let tempSelectedMonth = String(selectedMonth).length == 1 ? `0${selectedMonth+1}` : selectedMonth + 1
    let tempSelectedYear = String(year).substr(2, 2)
    let tempSelectedDay2 = isNaN(selectedDay2) || !selectedDay2 ? "" : String(selectedDay2).length == 1 ? `0${selectedDay2}` : selectedDay2
    let tempSelectedMonth2 = isNaN(selectedMonth2) || !selectedMonth2 ? "" : String(selectedMonth2).length == 1 ? `0${selectedMonth2+1}` : selectedMonth2 + 1
    let tempSelectedYear2
    if (String(selectedYear2).length > 2) {
      tempSelectedYear2 = String(selectedYear2).substr(2, 2)
    } else {
      tempSelectedYear2 = String(selectedYear2)
    }
    //let tempSelectedYear2 = String(selectedYear2) //isNaN(year2) || !selectedYear2 ? "" : String(selectedYear2).substr(2, 2)
    tempPeoplesGrown = document.getElementsByClassName('peoples-filter__grown-num')[0].innerHTML
    tempPeoplesChild = document.getElementsByClassName('peoples-filter__child-num')[0].innerHTML
    tempPeoplesBaby = document.getElementsByClassName('peoples-filter__baby-num')[0].innerHTML
    tempPeoplesNum = document.getElementsByClassName('menu__select-num')[0].outerHTML
    //console.log(tempPeoplesGrown, tempPeoplesChild, tempPeoplesBaby);


    document.location.href = `./searchresult.html?search=${searchInputs[0].dataset.value.split('\n')[1]}` +
      `${tempSelectedDay}${tempSelectedMonth}${tempSelectedYear}` +
      `${searchInputs[1].dataset.value.split('\n')[1]}${tempSelectedDay2}${tempSelectedMonth2}${tempSelectedYear2}` +
      `${tempPeoplesGrown}${tempPeoplesChild}${tempPeoplesBaby}`;
  } else {
    if (!data1.length > 0) {
      searchInputs[0].classList.add('_error')
      let tip = document.querySelectorAll('.empty-city')[0]
      tip.innerHTML = "Укажите город отправления"
      tip.classList.add('_active');
    }
    if (!data2.length > 0) {
      searchInputs[1].classList.add('_error')
      let tip = document.querySelectorAll('.empty-city')[1]
      tip.classList.add('_active');

      return false
    }
  }

})
