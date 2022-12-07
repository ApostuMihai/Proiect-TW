const toggleButton = document.querySelector(".toggle-button");
const navbarLinks = document.querySelector(".header__nav__list");

toggleButton.addEventListener("click", function () {
  navbarLinks.classList.toggle("show");
});

//Navigatia sticky
const sectionHeroEl = document.querySelector(".section-hero");

const observer = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (!ent.isIntersecting) document.body.classList.add("sticky");
    else document.body.classList.remove("sticky");
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
observer.observe(sectionHeroEl);
