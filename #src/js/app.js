(function isWebP() {
   function testWebP(callback) {
      let webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height == 2);
      };
      webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
   }
   testWebP(function (support) {

      if (support == true) {
         document.querySelector('html').classList.add('webp');
      } else {
         document.querySelector('html').classList.add('no-webp');
      }
   });
})()
document.addEventListener("DOMContentLoaded", () => {
   // header
   workBurger()
   workHeaderAssortment()
   workHeaderPopups()
   // cartSelects()
   countProducts("#cartItemCount1", "#cartItemCount1Decr", "#cartItemCount1Incr")
   countProducts("#cartItemCount2", "#cartItemCount2Decr", "#cartItemCount2Incr")
   // productPage
   productPageWorkTabs()
   productGuideWork()
   productShutter()
   selectItem('.today-item')
   whereBuyToday()
   productSliders()
   addToWishlist()
   productInfo()
   // orderPage
   accordion('.order-detail__header', '.order-detail__content')
   orderBtnWork()
   deliveryWay()
   choosePickup()
   tabsWork(".pickup-mobile__tab", ".pickup-mobile__content")
   selectItem('.pickup-detail')
   inputValidation()
   // accountPage
   tabsWork(".account-nav__item", ".account__tab")
   accountHistoryPopups('#historyDetailsBtn', '.history-detail__back', '.history-detail')
   accountPagePopups('.account-address__add', '.new-address__back', '.new-address')
   accountPagePopups('.account-address__add', '.new-address__btn', '.new-address')
   accountPagePopups('.account-address__btn', '.new-address__back', '.new-address')
   accountPagePopups('.account-address__btn', '.new-address__btn', '.new-address')
   accountSaveSettings()
   // helpPage
   tabsWork(".help-nav__item", ".help-tab")
   accordion('.help-accordion__header', '.help-accordion__content')
   // contacts
   tabsWork(".contacts-nav__item", ".contacts-tab")
   // 03.10
   likeProduct()
   changeColorContent()
   removeFromWishList()
})

const body = document.querySelector('body')
// Бэкдроп блюр
const headerBackdrop = document.querySelector('.header-backdrop')
function workBurger() {
   // Получаем бургер иконку
   const burger = document.querySelector('.header__burger')
   if (burger) {
      // Получаем бургер меню
      const burgerMenu = document.querySelector('.header-menu')
      burger.addEventListener("click", () => {
         // Закрываем открытый попап
         document.querySelectorAll('.header-popup').forEach(item => {
            item.classList.remove("open")
         })
         // очищаем active link
         document.querySelectorAll('.header-popup__open').forEach(item => {
            item.classList.remove("active")
         })
         // Проверка на блокировку скролла
         if (burgerMenu.classList.contains("open")) {
            body.classList.remove("lock")
         } else {
            body.classList.add("lock")
         }
         // Работа бургера
         burger.classList.toggle("active")
         burgerMenu.classList.toggle("open")


         // Каждый раз при выходе и входе в бургер мы закрываем подменю
         document.querySelectorAll('.header-menu__submenu.open').forEach(item => {
            item.classList.remove("open")
         })
      })
      // Получаем линки на подсписки
      const subLinks = document.querySelectorAll('.header-menu__link_sub')
      subLinks.forEach(item => {
         // При клике на спан открываем подсписок
         item.querySelector(".header-menu__link_sub_span").addEventListener("click", () => {
            item.querySelector(".header-menu__submenu").classList.add("open")
         })
         // При клике на "Назад" закрываем
         item.querySelector(".header-menu__back").addEventListener("click", () => {
            event.target.closest(".header-menu__submenu").classList.remove("open")
         })
      })
   }
}
// header work
function workHeaderPopups() {
   // Получаем линки
   const headerOpenLinks = document.querySelectorAll('.header-popup__open')
   // Получаем попапы
   const headerPopups = document.querySelectorAll('.header-popup')
   // получаем закрывающие линки
   const headerCloseLinks = document.querySelectorAll('.header-popup__close')
   const submitBack = document.querySelector('.header-submit__back')
   if (headerOpenLinks.length > 0) {
      for (let i = 0; i < headerOpenLinks.length; i++) {
         let headerOpenLink = headerOpenLinks[i];
         let headerCloseLink = headerCloseLinks[i]
         headerOpenLink.addEventListener("click", () => { // при клике на линк
            // получаем атрибут нужного попапа
            let attr = headerOpenLink.getAttribute("data-popup")
            // получаем нужный попап
            let currentPopup = document.querySelector(`.header-popup.${attr}`)
            // если нужный попап уже открыт
            if (currentPopup.classList.contains("open")) {
               if (window.innerWidth > 768) { // если пк - ничего не делаем
                  return
               } else { // если мобила - закрываем
                  currentPopup.classList.remove("open")
                  body.classList.remove("lock")
                  headerBackdrop.classList.remove("active")
                  headerOpenLink.classList.remove("active")
               }
            } else { // если нужный попап закрыт
               // закрываем все попапы, чтобы не было открыто сразу несколько
               for (let j = 0; j < headerPopups.length; j++) {
                  headerPopups[j].classList.remove("open")
                  headerOpenLinks[j].classList.remove("active")
                  body.classList.remove("lock")
                  headerBackdrop.classList.remove("active")
               }
               // открываем нужный
               currentPopup.classList.add("open")
               body.classList.add("lock")
               headerBackdrop.classList.add("active")
               headerOpenLink.classList.add("active")
               // таймер в подтверждении номера
               if (currentPopup.classList.contains("header-submit")) [
                  submitTimeInterval()
               ]
               // если это не "вход", закрываем бургер
               if (!currentPopup.classList.contains("header-sign")) {
                  document.querySelector('.header__burger').classList.remove("active")
                  document.querySelector('.header-menu').classList.remove("open")
               }

            }
         })
         // при клике на закрывающий линк
         if (headerCloseLink) {
            headerCloseLink.addEventListener("click", () => {
               // закрываем попап
               document.querySelector('.header-popup.open').classList.remove("open")
               body.classList.remove("lock")
               headerBackdrop.classList.remove("active")
               // очищаем линк
               document.querySelector('.header-popup__open.active').classList.remove("active")
            })
         }
         // Закрываем попапы по клику на бекдроп
         if (headerPopups.length) {
            headerPopups.forEach(item => {
               item.addEventListener("click", (e) => {
                  if (!e.target.closest(".header-popup__wrapper")) {
                     document.querySelector('.header-popup.open').classList.remove("open")
                     body.classList.remove("lock")
                     headerBackdrop.classList.remove("active")
                     // очищаем линк
                     document.querySelector('.header-popup__open.active').classList.remove("active")
                  }
               })
            })
         }
      }
      // register/submit
      if (submitBack) {
         submitBack.addEventListener("click", () => {
            document.querySelector('.header-submit').classList.remove("open")
            document.querySelector('.header-register').classList.add("open")
         })
      }
   }
}
function workHeaderAssortment() {
   const links = document.querySelectorAll('.header__sublink')
   const assortment = document.querySelector('.header-assortments')
   // const assortmentContents = assortment.querySelectorAll(".header-assortment")
   if (links.length > 0) {
      let lastLinkHover;
      links.forEach(link => {
         link.addEventListener("mouseenter", () => {
            if (document.querySelector('.header-popup.open')) {
               link.classList.add("disabled")
               return
            }
            let attr = link.getAttribute("data-assort")
            openAssort(attr, link)
            assortment.classList.add("show")
         })
         link.addEventListener("mouseleave", (e) => {
            if (document.querySelector('.header-popup.open')) {
               link.classList.remove("disabled")
               return
            }
            let attr = link.getAttribute("data-assort")
            if (!e.relatedTarget.closest(".header-assortments")) {
               closeAssort(attr, link, 0)
            }
            assortment.classList.remove("show")
            lastLinkHover = link;
         })
      })
      assortment.addEventListener("mouseenter", () => {
         let attr = lastLinkHover.getAttribute("data-assort")
         assortment.classList.add("show")
      })
      assortment.addEventListener("mouseleave", (e) => {
         let attr = lastLinkHover.getAttribute("data-assort")
         if (e.relatedTarget.closest(".header__sublink") && e.relatedTarget.closest(".header__sublink").getAttribute("data-assort") == attr) {
            closeAssort(attr, lastLinkHover, 1)
         } else {
            closeAssort(attr, lastLinkHover, 0)
         }
         assortment.classList.remove("show")
      })
   }
   function openAssort(attr, link, isOpen) {
      let currentContent = assortment.querySelector(`.header-assortment.${attr}`)
      currentContent.classList.add("active")
      let currentContentHeight = currentContent.clientHeight;
      assortment.style.height = `${currentContentHeight}px`;
      if (!isOpen) {
         setTimeout(() => {
            currentContent.classList.add("anim")
         }, 400);
      }
      body.classList.add("lock")
      headerBackdrop.classList.add("active")
      link.querySelector(".header__link").classList.add("active")

   }
   function closeAssort(attr, link, isOpen) {
      let currentContent = assortment.querySelector(`.header-assortment.${attr}`)
      currentContent.classList.remove("active")
      let currentContentHeight = currentContent.clientHeight;
      assortment.style.height = `${currentContentHeight}px`;
      if (!isOpen) {
         setTimeout(() => {
            currentContent.classList.remove("anim")
         }, 400);
      }
      body.classList.remove("lock")
      headerBackdrop.classList.remove("active")
      link.querySelector(".header__link").classList.remove("active")
   }
}
// cart
function countProducts(countSelector, decrBtnSelector, incrBtnSeelctor) {
   const count = document.querySelector(`${countSelector}`)
   const decrBtn = document.querySelector(`${decrBtnSelector}`)
   const incrbtn = document.querySelector(`${incrBtnSeelctor}`)
   let value = 1;
   if (count) {
      count.innerHTML = value;
      decrBtn.addEventListener("click", () => {
         if (count.innerHTML > 1) {
            value -= 1;
            count.innerHTML = value;
         }
      })
      incrbtn.addEventListener("click", () => {
         value += 1;
         count.innerHTML = value;
      })
   }
}
if (document.querySelector('.header-cart__products')) {
   new Swiper('.header-cart__products', {
      modules: [
         Navigation
      ],
      navigation: {
         nextEl: '.header-cart__arrow_next',
         prevEl: '.header-cart__arrow_prev',
      },
      slidesPerView: 2,
      breakpoints: {
         768: {
            slidesPerView: 2,
         },
         450: {
            slidesPerView: 3,
         },
         320: {
            slidesPerView: 2,
         },
      }
   })
}
// Swiper home
import Swiper from 'swiper';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
// home page
if (document.querySelector('.home-arrival__slider') && window.innerWidth <= 768) {
   new Swiper('.home-arrival__slider', {
      modules: [
         Navigation
      ],
      navigation: {
         nextEl: '.arrival-slider__btn_next',
         prevEl: '.arrival-slider__btn_prev',
      },
      slidesPerView: 2,
      loop: true,
      breakpoints: {
         768.1: {
            slidesPerView: 4,
            loop: false
         }
      }
   })
}
// product page sliders
if (document.querySelector('.product-content__slider_zoomed') && document.querySelector('.product-content__slider')) {
   let zoomedSlider = new Swiper('.product-content__slider_zoomed', {
      modules: [
         Navigation
      ],
      slidesPerView: 1,
      loop: true,
      watchSlidesProgress: true,
      // cssMode: true,
      navigation: {
         nextEl: ".swiper-btn-next_zoomed",
         prevEl: ".swiper-btn-prev_zoomed",
      }
   })
   new Swiper('.product-content__slider', {
      modules: [
         Thumbs,
         Pagination
      ],
      slidesPerView: 1,
      loop: true,
      watchSlidesProgress: true,
      pagination: {
         el: ".swiper-pagination",
      },
      thumbs: {
         swiper: zoomedSlider,
      },
   })
}
// accountPage slider
if (document.querySelector('.account-wishlist__slider')) {
   new Swiper('.account-wishlist__slider', {
      slidesPerView: 3,
   })
}
// sliders work
function productSliders() {
   const productSlides = document.querySelectorAll('.product-slide')
   const zoomedSlider = document.querySelector('.product-content__zoomed')
   const zoomedCliderClose = document.querySelector('.slider-zoomed__close')
   if (productSlides.length > 0) {
      for (let i = 0; i < productSlides.length; i++) {
         let productSlide = productSlides[i];
         productSlide.addEventListener("click", () => {
            zoomedSlider.classList.add("active")
            body.classList.add("lock")
         })
      }
      zoomedCliderClose.addEventListener("click", () => {
         zoomedSlider.classList.remove("active")
         body.classList.remove("lock")
      })
   }
}
// product page work
function productPageWorkTabs() {
   // Получаем линки
   const tabsLinks = document.querySelectorAll('.product-tabs__link')
   // контент
   const tabsItems = document.querySelectorAll('.product-tab')
   // кнопка закрытия
   const tabsBacks = document.querySelectorAll('.product-tab__back')
   // backdrop
   const backdrop = document.querySelector('.product-guide__backdrop')
   if (tabsLinks.length > 0) {
      for (let i = 0; i < tabsBacks.length; i++) {
         let tabsBack = tabsBacks[i];
         // по клику на закрытие - закрываем
         tabsBack.addEventListener("click", () => {
            for (let i = 0; i < tabsItems.length; i++) {
               tabsLinks[i].classList.remove("active")
               tabsItems[i].classList.remove("active")
            }
            backdrop.classList.remove("active")
            // body.classList.remove("lock")
         })
      }
      for (let i = 0; i < tabsLinks.length; i++) {
         let tabsLink = tabsLinks[i];
         // по клику на линк
         tabsLink.addEventListener("click", () => {
            if (window.innerWidth > 768) {
               backdrop.classList.add("active")
               // body.classList.add("lock")
            }

            // получаем атрибут линка
            let linkAttr = tabsLink.getAttribute("data-tab");
            for (let i = 0; i < tabsItems.length; i++) {
               // закрываем все табы
               tabsLinks[i].classList.remove("active")
               let tabsItem = tabsItems[i];
               tabsItem.classList.remove("active")
               // получаем атрибут контента
               let tabAttr = tabsItem.getAttribute("data-tab-content")
               // если совпадают, открываем
               if (tabAttr === linkAttr) {
                  tabsItem.classList.add("active")
                  tabsLink.classList.add("active")
               }
            }
         })

      }
      backdrop.addEventListener("click", () => {
         for (let i = 0; i < tabsItems.length; i++) {
            tabsLinks[i].classList.remove("active")
            tabsItems[i].classList.remove("active")
         }
         backdrop.classList.remove("active")
      })
      // на моблике сразу открыт первый таб
      if (window.innerWidth <= 768) {
         // body.classList.remove("lock")
         backdrop.classList.remove("active")
         tabsLinks[0].classList.add("active")
         tabsItems[0].classList.add("active")
      }
   }
}
function productGuideWork() {
   // Получаем
   // линк
   const guideLink = document.querySelector('.product-size__link')
   // контент
   const productGuide = document.querySelector('.product-guide')
   // закрывашка линк
   const closeGuideBtn = document.querySelectorAll('.product-guide__close')
   // фон блюр
   const guideBackdrop = document.querySelector('.product-guide__backdrop')
   if (guideLink) {
      // по клику на линк открываем контент
      guideLink.addEventListener("click", () => {
         productGuide.classList.add("show")
         body.classList.add("lock")
         guideBackdrop.classList.add("active")
      })
      for (let i = 0; i < closeGuideBtn.length; i++) {
         let close = closeGuideBtn[i];
         // закрываем по клику на закрытие
         close.addEventListener("click", () => {
            productGuide.classList.remove("show")
            body.classList.remove("lock")
            guideBackdrop.classList.remove("active")
         })
      }
   }
}
function productShutter() {
   // получаем контент
   const productShutter = document.querySelector('.product-shutter')
   // последняя картинка
   const footer = document.querySelector('.footer-mobile')
   if (productShutter) {
      // если плашка дошла до картинки - прячем
      if ((footer.getBoundingClientRect().top - window.innerHeight) < 0) {
         productShutter.classList.remove("show")
      } else {
         productShutter.classList.add("show")
      }
      window.addEventListener("scroll", () => {
         if ((footer.getBoundingClientRect().top - window.innerHeight) < 0) {
            productShutter.classList.remove("show")
         } else {
            productShutter.classList.add("show")
         }
      })
   }
}
function whereBuyToday() {
   const OpenBtns = document.querySelectorAll('#whereBuyToday')
   const BuyToday = document.querySelector('.product-today')
   const closeBtns = document.querySelectorAll('.product-today__back')
   if (OpenBtns.length > 0) {
      for (let i = 0; i < OpenBtns.length; i++) {
         let OpenBtn = OpenBtns[i];
         OpenBtn.addEventListener("click", () => {
            BuyToday.classList.add("show")
            body.classList.add("lock")
         })
      }
      for (let i = 0; i < closeBtns.length; i++) {
         let closeBtn = closeBtns[i];
         closeBtn.addEventListener("click", () => {
            BuyToday.classList.remove("show")
            body.classList.remove("lock")
         })
      }
   }

}
function addToWishlist() {
   const btns = document.querySelectorAll('#toWishlist')
   if (btns.length > 0) {
      for (let i = 0; i < btns.length; i++) {
         let btn = btns[i];
         btn.addEventListener("click", () => {
            btn.classList.toggle("active")
         })
      }
   }
}
function productInfo() {
   const footer = document.querySelector('.footer')
   const productTabs = document.querySelectorAll('.product-tab')
   const image = document.querySelector('.product-content__image_last')
   if (productTabs.length > 0) {
      if (window.innerWidth > 768) {
         productTabs.forEach(item => {
            item.classList.add("down-page")
         })
         if ((footer.getBoundingClientRect().top - window.innerHeight) < 0) {
            productTabs.forEach(item => {
               item.style.height = `calc(100% - 81px - ${window.innerHeight - footer.getBoundingClientRect().top}px)`
               item.style.width = `calc(100% - ${image.offsetWidth}px)`
               item.style.paddingLeft = '40px'
            })
         } else {
            productTabs.forEach(item => {
               item.style.height = `calc(100% - 81px - ${window.innerHeight - footer.getBoundingClientRect().top}px)`
               item.style.width = `calc(100% - ${image.offsetWidth}px)`
               item.style.paddingLeft = '40px'
            })
         }
         window.addEventListener("scroll", () => {
            if ((footer.getBoundingClientRect().top - window.innerHeight) < 0) {
               productTabs.forEach(item => {
                  item.style.height = `calc(100% - 81px - ${window.innerHeight - footer.getBoundingClientRect().top}px)`
                  item.style.width = `calc(100% - ${image.offsetWidth}px)`
                  item.style.paddingLeft = '40px'

               })
            } else {
               productTabs.forEach(item => {
                  item.style.height = `calc(100% - 81px - ${window.innerHeight - footer.getBoundingClientRect().top}px)`
                  item.style.width = `calc(100% - ${image.offsetWidth}px)`
                  item.style.paddingLeft = '40px'
               })
            }
         })
      }
      window.addEventListener("resize", () => {
         if (window.innerWidth <= 768) {
            for (let i = 0; i < productTabs.length; i++) {
               productTabs[i].classList.remove("down-page")
               productTabs[i].style.height = "";
               productTabs[i].style.width = "";
               productTabs[i].style.paddingLeft = "0";
            }
            productTabs[0].classList.add("active")
            document.querySelectorAll('.product-tabs__link')[0].classList.add("active")
         } else {
            productTabs.forEach(item => {
               item.classList.add("down-page")
            })
            if ((footer.getBoundingClientRect().top - window.innerHeight) < 0) {
               productTabs.forEach(item => {
                  item.style.height = `calc(100% - 81px - ${window.innerHeight - footer.getBoundingClientRect().top}px)`
                  item.style.width = `calc(100% - ${image.offsetWidth}px)`
                  item.style.paddingLeft = '40px'
               })
            } else {
               productTabs.forEach(item => {
                  item.style.height = `calc(100% - 81px - ${window.innerHeight - footer.getBoundingClientRect().top}px)`
                  item.style.width = `calc(100% - ${image.offsetWidth}px)`
                  item.style.paddingLeft = '40px'
               })
            }
            window.addEventListener("scroll", () => {
               if ((footer.getBoundingClientRect().top - window.innerHeight) < 0) {
                  productTabs.forEach(item => {
                     item.style.height = `calc(100% - 81px - ${window.innerHeight - footer.getBoundingClientRect().top}px)`
                     item.style.width = `calc(100% - ${image.offsetWidth}px)`
                     item.style.paddingLeft = '40px'

                  })
               } else {
                  productTabs.forEach(item => {
                     item.style.height = `calc(100% - 81px - ${window.innerHeight - footer.getBoundingClientRect().top}px)`
                     item.style.width = `calc(100% - ${image.offsetWidth}px)`
                     item.style.paddingLeft = '40px'
                  })
               }
            })
         }
      })
   }
}
// order page
class Select {
   constructor(selector, options) {
      this.$el = document.querySelector(selector);
      this.options = options;
      this.selectedId = options.selectedId;

      this.#render();
      this.#setup();
   }
   #render() {
      this.$el.classList.add("select")
      const { placeholder, data, selectedId } = this.options;
      this.$el.innerHTML = this.getTemplate(data, placeholder, selectedId);
   }
   #setup() {
      this.clickHandler = this.clickHandler.bind(this);
      this.$el.addEventListener("click", this.clickHandler)
      this.$value = this.$el.querySelector(`[data-type="input"]`)
   }
   clickHandler(event) {
      const { type } = event.target.dataset;
      if (type === "input" || type === "header" || type === "back") {
         this.toggle()
      } else if (type === "item") {
         const { id } = event.target.dataset;
         this.select(id)
      } /*else if (type === "back") {
         this.close()
      }*/
   }
   get current() {
      return this.options.data.find(item => item.id === this.selectedId)
   }
   select(id) {
      this.selectedId = id;
      this.$value.innerHTML = this.current.value;
      this.$el.querySelectorAll(`[data-type="item"]`).forEach(item => {
         item.classList.remove("selected")
      });
      this.$el.querySelector(`[data-id =${this.current.id}]`).classList.add("selected");
      this.close()

      if (this.options.onSelect) {
         this.options.onSelect(this.current)
      }

   }
   open() {
      this.$el.classList.add("open")
   }
   close() {
      this.$el.classList.remove("open")
   }
   toggle() {
      if (this.$el.classList.contains("open")) {
         this.close()
      } else {
         this.open()
      }
   }
   getTemplate(data, placeholder = `<span></span>`, selectedId) {
      const items = data.map(item => {
         let cls = '';
         if (item.id === selectedId) {
            placeholder = item.value;
            cls = "selected";
         }
         return `<li class="select__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>`
      })
      return `
      <div class="select__header" data-type="header">
      <div class="select__title" data-type="input">${placeholder}</div>
         <div class="select__back" data-type="back"></div>
      </div>
      <div class="select__content">
         <ul class="select__list">
            ${items.join("")}
         </ul>
      </div>
      `
   }
}
if (document.querySelector('#selectCity')) {
   new Select("#selectCity", {
      placeholder: "Choose framework",
      selectedId: "Moscow",
      data: [
         {
            id: "Moscow",
            value: "Москва",
         },
         {
            id: "Volg",
            value: "Волгоград",
         },
         {
            id: "Novg",
            value: "Новгород",
         },
         {
            id: "Peter",
            value: "Петербург",
         },
      ],
      onSelect(item) {
         console.log("Selected Item: ", item);
      }
   })
}
if (document.querySelector('#selectPickupService')) {
   new Select("#selectPickupService", {
      placeholder: "Choose framework",
      selectedId: "SDEK",
      data: [
         {
            id: "SDEK",
            value: "СДЭК",
         },
         {
            id: "SDEK1",
            value: "СДЭК1",
         },
         {
            id: "SDEK2",
            value: "СДЭК2",
         },
         {
            id: "SDEK3",
            value: "СДЭК3",
         },
      ],
      onSelect(item) {
         console.log("Selected Item: ", item);
      }
   })
}
if (document.querySelector('#selectPickupServiceMobile')) {
   new Select("#selectPickupServiceMobile", {
      placeholder: "Choose framework",
      selectedId: "SDEK",
      data: [
         {
            id: "SDEK",
            value: "СДЭК",
         },
         {
            id: "SDEK1",
            value: "СДЭК1",
         },
         {
            id: "SDEK2",
            value: "СДЭК2",
         },
         {
            id: "SDEK3",
            value: "СДЭК3",
         },
      ],
      onSelect(item) {
         console.log("Selected Item: ", item);
      }
   })
}
// product page
if (document.querySelector('#selectTakeTodayMobile')) {
   new Select("#selectTakeTodayMobile", {
      placeholder: "Choose framework",
      selectedId: "SDEK",
      data: [
         {
            id: "SDEK",
            value: "СДЭК",
         },
         {
            id: "SDEK1",
            value: "СДЭК1",
         },
         {
            id: "SDEK2",
            value: "СДЭК2",
         },
         {
            id: "SDEK3",
            value: "СДЭК3",
         },
      ],
      onSelect(item) {
         console.log("Selected Item: ", item);
      }
   })
}
// account page
if (document.querySelector('#accountSelectCity1')) {
   new Select("#accountSelectCity1", {
      placeholder: "Choose framework",
      selectedId: "Moscow",
      data: [
         {
            id: "Moscow",
            value: "Москва",
         },
         {
            id: "Volg",
            value: "Волгоград",
         },
         {
            id: "Novg",
            value: "Новгород",
         },
         {
            id: "Peter",
            value: "Петербург",
         },
      ],
      onSelect(item) {
         console.log("Selected Item: ", item);
      }
   })
}
if (document.querySelector('#accountSelectCity2')) {
   new Select("#accountSelectCity2", {
      placeholder: "Choose framework",
      selectedId: "Moscow",
      data: [
         {
            id: "Moscow",
            value: "Москва",
         },
         {
            id: "Volg",
            value: "Волгоград",
         },
         {
            id: "Novg",
            value: "Новгород",
         },
         {
            id: "Peter",
            value: "Петербург",
         },
      ],
      onSelect(item) {
         console.log("Selected Item: ", item);
      }
   })
}
if (document.querySelector('#accountSelectCity3')) {
   new Select("#accountSelectCity3", {
      placeholder: "Choose framework",
      selectedId: "Moscow",
      data: [
         {
            id: "Moscow",
            value: "Москва",
         },
         {
            id: "Volg",
            value: "Волгоград",
         },
         {
            id: "Novg",
            value: "Новгород",
         },
         {
            id: "Peter",
            value: "Петербург",
         },
      ],
      onSelect(item) {
         console.log("Selected Item: ", item);
      }
   })
}
// order page
function orderBtnWork() {
   const isAgreeBtn = document.querySelector('#agreeConditions')
   if (isAgreeBtn) {
      isAgreeBtn.addEventListener("click", () => {
         // если согласны с условиями - кнопка рабочая
         let isAgree = isAgreeBtn.checked
         if (isAgree) {
            document.querySelector('#confirmOrderBtn').classList.add("work")
         } else {
            document.querySelector('#confirmOrderBtn').classList.remove("work")
         }
      })
   }
}
function deliveryWay() {
   // получаем радио кнопки
   const deliveryWayBtns = document.querySelectorAll('input[name="deliveryWay"]')

   if (deliveryWayBtns.length > 0) {
      for (let i = 0; i < deliveryWayBtns.length; i++) {
         let deliveryWayBtn = deliveryWayBtns[i];
         deliveryWayBtn.addEventListener("click", () => {
            if (deliveryWayBtn.checked) {
               // в переменной значение выбранной кнопки
               let checkedWay = deliveryWayBtn.value
               // если самовывоз 
               if (checkedWay === 'pickup' || checkedWay === 'sdekPVZ') {
                  // прячем лишнее
                  const notPickupItems = document.querySelectorAll('.not-pickup')
                  const pickupItems = document.querySelectorAll('.pickup')
                  for (let i = 0; i < pickupItems.length; i++) {
                     let pickupItem = pickupItems[i];
                     pickupItem.classList.remove("hidden")
                  }
                  for (let i = 0; i < notPickupItems.length; i++) {
                     let notPickupItem = notPickupItems[i];
                     notPickupItem.classList.add("hidden")
                  }
               } else { // если доставка курьером
                  const notPickupItems = document.querySelectorAll('.not-pickup')
                  const pickupItems = document.querySelectorAll('.pickup')
                  // показываем лишнее
                  for (let i = 0; i < pickupItems.length; i++) {
                     let pickupItem = pickupItems[i];
                     pickupItem.classList.add("hidden")
                  }
                  for (let i = 0; i < notPickupItems.length; i++) {
                     let notPickupItem = notPickupItems[i];
                     notPickupItem.classList.remove("hidden")
                  }
               }
            }
         })
      }
   }
}
function choosePickup() {
   const changeAddressBtn = document.querySelector('#changeAddressBtn');
   const orderPickup = document.querySelector('.order-pickup')
   const backdrop = document.querySelector('.order-pickup__backdrop')
   const closeBtns = document.querySelectorAll('.order-pickup__close')
   if (changeAddressBtn) {
      changeAddressBtn.addEventListener("click", () => {
         orderPickup.classList.add("show")
         backdrop.classList.add("active")
         body.classList.add("lock")
      })
      for (let i = 0; i < closeBtns.length; i++) {
         let closeBtn = closeBtns[i];
         closeBtn.addEventListener("click", () => {
            orderPickup.classList.remove("show")
            backdrop.classList.remove("active")
            body.classList.remove("lock")
         })
      }
   }
}
function selectItem(detailSelector) {
   const items = document.querySelectorAll(`${detailSelector}`)
   if (items.length > 0 && window.innerWidth <= 768) {
      for (let i = 0; i < items.length; i++) {
         let item = items[i];
         item.addEventListener("click", () => {
            for (let j = 0; j < items.length; j++) {
               items[j].classList.remove("active")
            }
            item.classList.add("active")
         })
      }
   }
}
function inputValidation() {
   const inputs = document.querySelectorAll('input.order-input__item')
   if (inputs.length > 0) {
      for (let i = 0; i < inputs.length; i++) {
         let input = inputs[i];
         input.addEventListener("change", () => {
            if (input.value) {
               input.classList.add("filled")
               input.classList.remove("error")
            } else {
               input.classList.remove("filled")
               input.classList.add("error")
            }
         })
      }
   }
}
// accountPage
function accountPagePopups(openBtnSelector, closeBtnSelector, popupSelector) {
   const openBtns = document.querySelectorAll(`${openBtnSelector}`)
   // const openBtns = document.querySelectorAll('#historyDetailsBtn')
   const closeBtns = document.querySelectorAll(`${closeBtnSelector}`)
   // const closeBtns = document.querySelectorAll('.history-detail__back')
   if (openBtns.length > 0) {
      for (let i = 0; i < openBtns.length; i++) {
         let openBtn = openBtns[i];
         openBtn.addEventListener("click", () => {
            openBtn.nextElementSibling.classList.add("show")
         })
      }
      for (let i = 0; i < closeBtns.length; i++) {
         let closeBtn = closeBtns[i];
         closeBtn.addEventListener("click", () => {
            // document.querySelectorAll('.history-detail').forEach(item => {
            //    item.classList.remove("show")
            // })
            document.querySelectorAll(`${popupSelector}`).forEach(item => {
               item.classList.remove("show")
            })
         })
      }
   }
}
function accountHistoryPopups(openBtnSelector, closeBtnSelector, popupSelector) {
   const openBtns = document.querySelectorAll(`${openBtnSelector}`)
   // const openBtns = document.querySelectorAll('#historyDetailsBtn')
   const closeBtns = document.querySelectorAll(`${closeBtnSelector}`)
   // const closeBtns = document.querySelectorAll('.history-detail__back')
   if (openBtns.length > 0) {
      for (let i = 0; i < openBtns.length; i++) {
         let openBtn = openBtns[i];
         openBtn.addEventListener("click", (e) => {
            let item = e.target.closest(".account-history__item")
            item.querySelector(`${popupSelector}`).classList.add("show")
            // openBtn.nextElementSibling.classList.add("show")
         })
      }
      for (let i = 0; i < closeBtns.length; i++) {
         let closeBtn = closeBtns[i];
         closeBtn.addEventListener("click", () => {
            document.querySelectorAll(`${popupSelector}`).forEach(item => {
               item.classList.remove("show")
            })
         })
      }
   }
}
function accountSaveSettings() {
   const btn = document.querySelector('.account-settings__btn')
   const checkbox = document.querySelector('#agreeConditions1')
   if (checkbox) {
      checkbox.addEventListener("change", () => {
         btn.disabled = !checkbox.checked
         btn.classList.toggle("work")
      })
      btn.addEventListener("click", () => {
         window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
         })
         document.querySelector('.account-settings__popup').classList.add("active")
      })
   }
}

// shared
function tabsWork(linkSelector, contentSelector) {
   // Получаем линки
   const tabsLinks = document.querySelectorAll(`${linkSelector}`)
   // контент
   const tabsItems = document.querySelectorAll(`${contentSelector}`)
   if (tabsLinks.length > 0) {
      for (let i = 0; i < tabsLinks.length; i++) {
         let tabsLink = tabsLinks[i];
         // по клику на линк
         tabsLink.addEventListener("click", () => {
            // получаем атрибут линка
            let linkAttr = tabsLink.getAttribute("data-tab");
            for (let i = 0; i < tabsItems.length; i++) {
               // закрываем все табы
               tabsLinks[i].classList.remove("active")
               let tabsItem = tabsItems[i];
               tabsItem.classList.remove("active")
               // получаем атрибут контента
               let tabAttr = tabsItem.getAttribute("data-tab-content")
               // если совпадают, открываем
               if (tabAttr === linkAttr) {
                  tabsItem.classList.add("active")
                  tabsLink.classList.add("active")
               }
            }
         })
      }
      // на моблике сразу открыт первый таб
      if (window.innerWidth <= 768) {
         tabsLinks[0].classList.add("active")
         tabsItems[0].classList.add("active")
      }
   }
}
function accordion(linkSelector, contentSelector) {
   // получаем линки
   const openLinks = document.querySelectorAll(`${linkSelector}`)
   // контенты
   const contents = document.querySelectorAll(`${contentSelector}`)
   if (openLinks.length > 0) {
      for (let i = 0; i < openLinks.length; i++) {
         let openLink = openLinks[i];
         openLink.addEventListener("click", () => {
            // все прячем
            for (let j = 0; j < contents.length; j++) {
               // если хоть один открывается - return
               if (contents[j].classList.contains("collapsing")) {
                  return
               } // Иначе
               // все прячем
               slideHide(contents[j])
            }
            for (let j = 0; j < openLinks.length; j++) {
               openLinks[j].classList.remove("active");
            }
            // записываем в переменную нужный таб
            let content = openLink.nextElementSibling;
            // работаем с классами линка
            if (content.classList.contains("collapsing")) {
               return
            } else if (content.classList.contains("collapse_show")) {
               openLink.classList.remove("active")
            } else {
               openLink.classList.add("active")
            }
            // показываем нужный
            slideShow(content)

         })
      }
   }
}
function slideShow(el, duration = 300) {
   // завершаем работу метода, если элемент содержит класс collapsing или collapse_show
   if (el.classList.contains('collapsing') || el.classList.contains('collapse_show')) {
      return;
   }
   // удаляем класс collapse
   el.classList.remove('collapse');
   // сохраняем текущую высоту элемента в константу height (это значение понадобится ниже)
   const height = el.offsetHeight;
   // устанавливаем высоте значение 0
   el.style['height'] = 0;
   // не отображаем содержимое элемента, выходящее за его пределы
   el.style['overflow'] = 'hidden';
   // создание анимации скольжения с помощью CSS свойства transition
   el.style['transition'] = `height ${duration}ms ease`;
   // добавляем класс collapsing
   el.classList.add('collapsing');
   // получим значение высоты (нам этого необходимо для того, чтобы просто заставить браузер выполнить перерасчет макета, т.к. он не сможет нам вернуть правильное значение высоты, если не сделает это)
   el.offsetHeight;
   // установим в качестве значения высоты значение, которое мы сохранили в константу height
   el.style['height'] = `${height}px`;
   // по истечении времени анимации this._duration
   window.setTimeout(() => {
      // удалим класс collapsing
      el.classList.remove('collapsing');
      // добавим классы collapse и collapse_show
      el.classList.add('collapse');
      el.classList.add('collapse_show');
      // удалим свойства height, transition и overflow
      el.style['height'] = '';
      el.style['transition'] = '';
      el.style['overflow'] = '';
   }, duration);
}
function slideHide(el, duration = 300) {
   // завершаем работу метода, если элемент содержит класс collapsing или collapse_show
   if (el.classList.contains('collapsing') || !el.classList.contains('collapse_show')) {
      return;
   }
   // установим свойству height текущее значение высоты элемента
   el.style['height'] = `${el.offsetHeight}px`;
   // получим значение высоты
   el.offsetHeight;
   // установим CSS свойству height значение 0
   el.style['height'] = 0;
   // обрежем содержимое, выходящее за границы элемента
   el.style['overflow'] = 'hidden';
   // добавим CSS свойство transition для осуществления перехода длительностью this._duration
   el.style['transition'] = `height ${duration}ms ease`;
   // удалим классы collapse и collapse_show
   el.classList.remove('collapse');
   el.classList.remove('collapse_show');
   // добавим класс collapsing
   el.classList.add('collapsing');
   // после завершения времени анимации
   window.setTimeout(() => {
      // удалим класс collapsing
      el.classList.remove('collapsing');
      // добавим класс collapsing
      el.classList.add('collapse');
      // удалим свойства height, transition и overflow
      el.style['height'] = '';
      el.style['transition'] = '';
      el.style['overflow'] = '';
   }, duration);
}




//03.10
function likeProduct() {
   const likes = document.querySelectorAll('.product-card__like')
   if (likes.length) {
      likes.forEach(like => {
         like.addEventListener("click", (e) => {
            e.preventDefault()
            like.classList.toggle("checked")
         })
      })
   }
}

function changeColorContent() {
   const outputs = document.querySelector('.product-color__title')
   const colors = document.querySelectorAll('.product-color__item')
   let value;
   if (colors.length) {
      document.querySelectorAll('input[name="color"]').forEach(item => {
         if (item.checked) {
            value = item.value
         }
         let span = document.createElement("span")
         span.className = `${item.id}`
         span.innerHTML = `${item.value}`
         if (span.innerHTML == value) {
            span.classList.add("active")
         }
         outputs.appendChild(span)
      })
      colors.forEach(color => {
         color.addEventListener("mouseenter", () => {
            value = color.querySelector("input").value
            outputs.querySelectorAll("span").forEach(item => {
               item.classList.remove("active")
               if (item.innerHTML == value) {
                  item.classList.add("active")
               }
            })
         })
         color.addEventListener("mouseleave", () => {
            document.querySelectorAll('input[name="color"]').forEach(item => {
               if (item.checked) {
                  value = item.value
                  outputs.querySelectorAll("span").forEach(item => {
                     item.classList.remove("active")
                     if (item.innerHTML == value) {
                        item.classList.add("active")
                     }
                  })
               }
            })
         })
      })
   }
}



function submitTimeInterval() {
   const remind = document.querySelector('.header-submit__remind')
   const output = remind.querySelector('span')
   const repeat = document.querySelector('.header-submit__repeat')
   let time = 30;
   output.innerHTML = time;
   let timer = setInterval(() => {
      time--;
      output.innerHTML = time;
      if (time === 0) {
         clearInterval(timer)
         remind.classList.add("hidden")
         repeat.classList.add("active")
         repeat.addEventListener("click", () => {
            repeat.classList.remove("active")
            remind.classList.remove("hidden")
            submitTimeInterval()
         })
      }
   }, 1000)
}

function removeFromWishList() {
   const products = document.querySelectorAll('.account-wishlist .product-card')
   console.log(products);
   products.forEach(item => {
      item.addEventListener("click", (e) => {
         if (e.target.closest(".product-card__remove")) {
            e.preventDefault()
         }
      })
   })
}