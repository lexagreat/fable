(function isWebP() {
   function testWebP(callback) {
      let webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height == 2);
      };
      webP.src =
         "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
   }
   testWebP(function (support) {
      if (support == true) {
         document.querySelector("html").classList.add("webp");
      } else {
         document.querySelector("html").classList.add("no-webp");
      }
   });
})();
const maskOptions = {
   mask: "+{7} (000) 000-00-00",
   // lazy: false,  // make placeholder always visible
   // placeholderChar: '0'     // defaults to '_'
};
if (document.querySelectorAll("[data-phone]").length) {
   document.querySelectorAll("[data-phone]").forEach((item) => {
      const mask = IMask(item, maskOptions);
   });
}
document.addEventListener("DOMContentLoaded", () => {
   home();
   accordion(".faq-item__header", ".faq-item__spoiler");
   headerWork();
   productPage();
});

function home() {
   const initHeroSwiper = () => {
      let slider = new Swiper(".home-hero .swiper", {
         slidesPerView: 1,
         loop: true,
         speed: 1600,
         navigation: {
            prevEl: ".home-hero__nav_prev",
            nextEl: ".home-hero__nav_next",
         },
         pagination: {
            el: ".home-hero__pagination",
         },
      });
   };
   initHeroSwiper();
}
function headerWork() {
   const header = document.querySelector(".header");
   const burger = document.querySelector(".header__burger");

   const closeAll = () => {
      const openModal = document.querySelector(".modal.open");
      if (openModal) {
         popupClose(openModal);
      } else {
         header.classList.remove("menu-open");
      }
      body.classList.remove("lock");
      burger.classList.remove("active");
   };
   const openMenu = () => {
      body.classList.add("lock");
      header.classList.add("menu-open");
      burger.classList.add("active");
   };

   const burgerWork = () => {
      if (burger.classList.contains("active")) {
         closeAll();
      } else {
         openMenu();
      }
   };
   burger.addEventListener("click", burgerWork);

   const assortmentsWork = () => {
      const modal = document.querySelector(".header__modal");
      const assortments = document.querySelectorAll(".header-assort");
      const links = document.querySelectorAll("[data-assort]");
      links.forEach((item) => {
         item.onmouseenter = () => {
            modal.classList.add("show");
            let attr = item.getAttribute("data-assort");
            assortments.forEach((item) => {
               if (item.getAttribute("data-assort-id") !== attr) {
                  item.classList.remove("active");
                  item.classList.remove("anim");

                  return;
               }
               item.classList.add("active");
               setTimeout(() => {
                  item.classList.add("anim");
               }, 200);
            });
         };
         item.onmouseleave = (e) => {
            if (!e.relatedTarget.closest(".header__modal")) {
               modal.classList.remove("show");
               assortments.forEach((item) => {
                  item.classList.remove("anim");
                  item.classList.remove("active");
               });
            }
         };
      });
      modal.onmouseleave = (e) => {
         if (!e.relatedTarget.closest("[data-assort]")) {
            modal.classList.remove("show");
            setTimeout(() => {
               assortments.forEach((item) => {
                  item.classList.remove("anim");
                  item.classList.remove("active");
               });
            }, 300);
         }
      };
   };

   const mobileMenu = () => {
      const menus = document.querySelectorAll(".header-menu");
      menus.forEach((menu) => {
         menu.previousElementSibling.onclick = (e) => {
            e.preventDefault();
            menu.classList.add("active");
         };
      });
      const backs = document.querySelectorAll(".header-back");
      backs.forEach((back) => {
         back.onclick = () => {
            back.closest(".header-menu").classList.remove("active");
         };
      });
   };
   mobileMenu();
   assortmentsWork();
}
function productPage() {
   if (!document.querySelector(".product-buy")) return;
   tabs('[name="installmentWay"]', ".installment-modal__tab");
   const initSliders = () => {
      if (!document.querySelector(".product-gallery__main")) {
         return;
      }
      const mainSwiper = new Swiper(".product-gallery__main", {
         slidesPerView: 1,
         navigation: {
            prevEl: ".product-gallery__main .slider-btn-prev",
            nextEl: ".product-gallery__main .slider-btn-next",
         },
         zoom: true,
      });
   };
   const makeShutter = () => {
      if (window.innerWidth > 1024) return;
      const section = document.querySelectorAll(".products-section")[0];
      const shutter = document.querySelector(".product-buy");
      if (section.getBoundingClientRect().top - window.innerHeight < 0) {
         shutter.style.position = "relative";
         shutter.style.left = "";
         shutter.style.right = "";
         shutter.style.bottom = "";
         section.style.marginTop = "";
      } else {
         section.style.marginTop = shutter.clientHeight + "px";

         shutter.style.position = "fixed";
         shutter.style.left = "8px";
         shutter.style.right = "8px";
         shutter.style.bottom = "0";
      }
   };
   initSliders();
   makeShutter();
   window.addEventListener("scroll", makeShutter);
   accordion(".product-spoiler__header", ".product-spoiler__spoiler");
}
// Popup
const popupLinks = document.querySelectorAll(".modal__link");
const body = document.querySelector("body");
const lockPadding = document.querySelectorAll(".lock-padding");
const popupCloseIcon = document.querySelectorAll(".modal__close");

let unlock = true;

const timeout = 500;

if (popupLinks.length > 0) {
   for (let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      popupLink.addEventListener("click", function (e) {
         const popupName = popupLink.getAttribute("href").replace("#", "");
         const curentPopup = document.getElementById(popupName);
         popupOpen(curentPopup);
         e.preventDefault();
      });
   }
}

if (popupCloseIcon.length > 0) {
   for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener("click", function (e) {
         popupClose(el.closest(".modal"));
         e.preventDefault();
      });
   }
}

function popupOpen(curentPopup) {
   if (curentPopup && unlock) {
      const popupActive = document.querySelector(".modal.open");
      if (popupActive) {
         popupClose(popupActive, false);
      } else {
         bodyLock();
      }
      curentPopup.classList.add("open");
      document.querySelector(".header__burger").classList.add("active");
      document.querySelector(".header").classList.remove("menu-open");
      curentPopup.addEventListener("click", function (e) {
         if (!e.target.closest(".modal__content")) {
            popupClose(e.target.closest(".modal"));
         }
      });
   }
}
function popupClose(popupActive, doUnlock = true) {
   if (unlock) {
      popupActive.classList.remove("open");
      document.querySelector(".header__burger").classList.remove("active");

      if (doUnlock) {
         bodyUnLock();
      }
   }
}

function bodyLock() {
   const lockPaddingValue =
      window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";

   if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
         const el = lockPadding[index];
         el.style.paddingRight = lockPaddingValue;
      }
   }
   body.style.paddingRight = lockPaddingValue;
   body.classList.add("lock");

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

function bodyUnLock() {
   setTimeout(function () {
      if (lockPadding.length > 0) {
         for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = "0px";
         }
      }
      body.style.paddingRight = "0px";
      body.classList.remove("lock");
   }, timeout);

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

document.addEventListener("keydown", function (e) {
   if (e.which === 27) {
      const popupActive = document.querySelector(".modal.open");
      popupClose(popupActive);
   }
});
function accordion(linkSelector, contentSelector) {
   // получаем линки
   const openLinks = document.querySelectorAll(`${linkSelector}`);
   // контенты
   const contents = document.querySelectorAll(`${contentSelector}`);
   if (openLinks.length > 0) {
      for (let i = 0; i < openLinks.length; i++) {
         let openLink = openLinks[i];
         openLink.addEventListener("click", () => {
            // все прячем
            for (let j = 0; j < contents.length; j++) {
               // если хоть один открывается - return
               if (contents[j].classList.contains("collapsing")) {
                  return;
               } // Иначе
               // все прячем
               slideHide(contents[j]);
            }
            for (let j = 0; j < openLinks.length; j++) {
               openLinks[j].classList.remove("active");
            }
            // записываем в переменную нужный таб
            let content = openLink.nextElementSibling;
            // работаем с классами линка
            if (content.classList.contains("collapsing")) {
               return;
            } else if (content.classList.contains("collapse_show")) {
               openLink.classList.remove("active");
            } else {
               openLink.classList.add("active");
            }
            // показываем нужный
            slideShow(content);
         });
      }
   }
}
function slideShow(el, duration = 500) {
   // завершаем работу метода, если элемент содержит класс collapsing или collapse_show
   if (
      el.classList.contains("collapsing") ||
      el.classList.contains("collapse_show")
   ) {
      return;
   }
   // удаляем класс collapse
   el.classList.remove("collapse");
   // сохраняем текущую высоту элемента в константу height (это значение понадобится ниже)
   const height = el.offsetHeight;
   // устанавливаем высоте значение 0
   el.style["height"] = 0;
   // не отображаем содержимое элемента, выходящее за его пределы
   el.style["overflow"] = "hidden";
   // создание анимации скольжения с помощью CSS свойства transition
   el.style["transition"] = `height ${duration}ms ease`;
   // добавляем класс collapsing
   el.classList.add("collapsing");
   // получим значение высоты (нам этого необходимо для того, чтобы просто заставить браузер выполнить перерасчет макета, т.к. он не сможет нам вернуть правильное значение высоты, если не сделает это)
   el.offsetHeight;
   // установим в качестве значения высоты значение, которое мы сохранили в константу height
   el.style["height"] = `${height}px`;
   // по истечении времени анимации this._duration
   window.setTimeout(() => {
      // удалим класс collapsing
      el.classList.remove("collapsing");
      // добавим классы collapse и collapse_show
      el.classList.add("collapse");
      el.classList.add("collapse_show");
      // удалим свойства height, transition и overflow
      el.style["height"] = "";
      el.style["transition"] = "";
      el.style["overflow"] = "";
   }, duration);
}
function slideHide(el, duration = 500) {
   // завершаем работу метода, если элемент содержит класс collapsing или collapse_show
   if (
      el.classList.contains("collapsing") ||
      !el.classList.contains("collapse_show")
   ) {
      return;
   }
   // установим свойству height текущее значение высоты элемента
   el.style["height"] = `${el.offsetHeight}px`;
   // получим значение высоты
   el.offsetHeight;
   // установим CSS свойству height значение 0
   el.style["height"] = 0;
   // обрежем содержимое, выходящее за границы элемента
   el.style["overflow"] = "hidden";
   // добавим CSS свойство transition для осуществления перехода длительностью this._duration
   el.style["transition"] = `height ${duration}ms ease`;
   // удалим классы collapse и collapse_show
   el.classList.remove("collapse");
   el.classList.remove("collapse_show");
   // добавим класс collapsing
   el.classList.add("collapsing");
   // после завершения времени анимации
   window.setTimeout(() => {
      // удалим класс collapsing
      el.classList.remove("collapsing");
      // добавим класс collapsing
      el.classList.add("collapse");
      // удалим свойства height, transition и overflow
      el.style["height"] = "";
      el.style["transition"] = "";
      el.style["overflow"] = "";
   }, duration);
}
function tabs(linkSelector, contentSelector) {
   const inputs = document.querySelectorAll(linkSelector);
   const contents = document.querySelectorAll(contentSelector);
   let value;
   if (inputs.length) {
      inputs.forEach((item) => {
         item.addEventListener("change", () => {
            if (item.checked) {
               value = item.value;
            }
            contents.forEach((item) => {
               item.classList.remove("active");
               if (item.getAttribute("data-tab") == value) {
                  item.classList.add("active");
               }
            });
         });
      });
   }
}
