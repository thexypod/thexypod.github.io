document.addEventListener("DOMContentLoaded", function() {
  'use strict';

  const body = document.querySelector("body"),
  menuOpenIcon = document.querySelector(".nav__icon-menu"),
  menuList = document.querySelector(".menu-overlay"),
  searchOpenIcon = document.querySelector(".search-button"),
  searchCloseIcon = document.querySelector(".search__close"),
  searchInput = document.querySelector(".search__text"),
  search = document.querySelector(".search"),
  btnScrollToTop = document.querySelector(".top"),
  header = document.querySelector('.header');


  /* =======================
  // Menu and Search
  ======================= */
  menuOpenIcon.addEventListener("click", () => {
    menuOpen();
  });

  searchOpenIcon.addEventListener("click", () => {
    searchOpen();
  });

  searchCloseIcon.addEventListener("click", () => {
    searchClose();
  });

  function menuOpen() {
    const headerTop = document.querySelector('.header--top');
    console.log(headerTop);
    menuOpenIcon.classList.toggle('active');
    menuList.classList.toggle("is-open");
    // Disable page scroll when menu is visible
    if (menuList.classList.contains('is-open')) {
        document.body.style.overflow = 'hidden';
        headerTop.classList.remove('scrolled');
    } else {
        document.body.style.overflow = '';
        if(window.scrollY > 96) {
          headerTop.classList.add('scrolled');
        }
    }
  }

  function menuClose() {
    menuList.classList.remove("is-open");
  }

  function searchOpen() {
    search.classList.add("is-visible");
    if (search.classList.contains('is-visible')) {
        document.body.style.overflow = 'hidden';
    }
    setTimeout(function () {
      searchInput.focus();
    }, 300);
  }

  function searchClose() {
    search.classList.remove("is-visible");
    if (!search.classList.contains('is-visible')){
        document.body.style.overflow = '';
    }
  }

  document.addEventListener("keydown", function(e){
    if (e.key == "Escape") {
      searchClose();
    }
  });

  // Fade nav background on scroll
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 96);
});

  /* =======================
  // Animation Load Page
  ======================= */
  setTimeout(function(){
    body.classList.add("is-in");
  },150)


  /* =======================
  // LazyLoad Images
  ======================= */
  var lazyLoadInstance = new LazyLoad({
    elements_selector: '.lazy'
  })


  /* =======================
  // Zoom Image
  ======================= */
  const lightense = document.querySelector(".page img, .post img"),
  imageLink = document.querySelectorAll(".page a img, .post a img");

  if (imageLink) {
    for (let i = 0; i < imageLink.length; i++) imageLink[i].parentNode.classList.add("image-link");
    for (let i = 0; i < imageLink.length; i++) imageLink[i].classList.add("no-lightense");
  };

  if (lightense) {
    Lightense(".page img:not(.no-lightense), .post img:not(.no-lightense)", {
    padding: 60,
    offset: 30
    });
  };


  /* =======================
  // Responsive Videos
  ======================= */
  reframe(".post__content iframe:not(.reframe-off), .page__content iframe:not(.reframe-off)");


  // =====================
  // Load More Posts
  // =====================
  var load_posts_button=document.querySelector(".load-more-posts");

  load_posts_button&&load_posts_button.addEventListener("click",function(e){e.preventDefault();var t=load_posts_button.textContent;load_posts_button.classList.add("button--loading"),load_posts_button.textContent="Loading";var o=document.querySelector(".load-more-section"),n=pagination_next_url.split("/page")[0]+"/page/"+pagination_next_page_number+"/";fetch(n).then(function(e){if(e.ok)return e.text()}).then(function(e){var n=document.createElement("div");n.innerHTML=e;for(var a=document.querySelector(".grid"),i=n.querySelectorAll(".grid__post"),l=0;l<i.length;l++)a.appendChild(i.item(l));new LazyLoad({elements_selector:".lazy"}),pagination_next_page_number++,pagination_next_page_number>pagination_available_pages_number&&(o.style.display="none")}).finally(function(){load_posts_button.classList.remove("button--loading"),load_posts_button.textContent=t})});


  /* =======================
  // Copy Code Button
  ======================= */
  document.querySelectorAll('.post__content pre.highlight, .page__content pre.highlight')
  .forEach(function (pre) {
    const button = document.createElement('button');
    const copyText = 'Copy';
    button.type = 'button';
    button.ariaLabel = 'Copy code to clipboard';
    button.innerText = copyText;
    button.addEventListener('click', function () {
      let code = pre.querySelector('code').innerText;
      try {
        code = code.trimEnd();
      } catch (e) {
        code = code.trim();
      }
      navigator.clipboard.writeText(code);
      button.innerText = 'Copied!';
      setTimeout(function () {
        button.blur();
        button.innerText = copyText;
      }, 2e3);
    });
    pre.appendChild(button);
  });


  /* =======================
  // Scroll Top Button
  ======================= */
  window.addEventListener("scroll", function () {
  window.scrollY > window.innerHeight ? btnScrollToTop.classList.add("is-active") : btnScrollToTop.classList.remove("is-active");
  });

  btnScrollToTop.addEventListener("click", function () {
    if (window.scrollY != 0) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      })
    }
  });

  /* =======================
  // Spoilers
  ======================= */
    const spoilers = document.querySelectorAll(".spoiler");

    if (!spoilers.length) return;

    spoilers.forEach((spoiler, index) => {
      // Wrap text in inner span for aria-hidden control
      const content = document.createElement("span");
      content.className = "spoiler__content";
      content.innerHTML = spoiler.innerHTML;

      spoiler.innerHTML = "";
      spoiler.appendChild(content);

      // Accessibility + interaction
      spoiler.setAttribute("role", "button");
      spoiler.setAttribute("tabindex", "0");
      spoiler.setAttribute("aria-expanded", "false");

      spoiler.setAttribute(
        "aria-label",
        "Spoiler content, activate to reveal"
      );

      content.setAttribute("aria-hidden", "true");

      // Click support
      spoiler.addEventListener("click", () => toggleSpoiler(spoiler));

      // Keyboard support
      spoiler.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleSpoiler(spoiler);
        }
      });
    });

    function toggleSpoiler(spoiler) {
      const content = spoiler.querySelector(".spoiler__content");
      const isOpen = spoiler.getAttribute("aria-expanded") === "true";

      spoiler.setAttribute("aria-expanded", String(!isOpen));
      content.setAttribute("aria-hidden", String(isOpen));

      spoiler.setAttribute(
        "aria-label",
        isOpen ? "Reveal spoiler" : "Hide spoiler"
      );
    }
});