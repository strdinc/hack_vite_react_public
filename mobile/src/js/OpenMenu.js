// script.js

// Элементы меню
const menuButton = document.getElementById("menuButton");
const sideMenu = document.getElementById("sideMenu");
const html = document.documentElement;

// Кнопки меню и целевые блоки
const menuLinks = [
  { buttonId: "start_screen_button", targetId: "first_screen" },
  { buttonId: "participation_screen_button", targetId: "second_screen" },
  { buttonId: "schedule_screen_button", targetId: "third_screen" },
  { buttonId: "faq_screen_button", targetId: "fourth_screen" },
  { buttonId: "partners_screen_button", targetId: "fifth_screen" },
  { buttonId: "prize_screen_button", targetId: "sixth_screen" },
  { buttonId: "form_screen_button", targetId: "seventh_screen" },
];

// Отключить/включить меню и скроллинг
function toggleMenu(state) {
  sideMenu.classList.toggle("open", state);
  menuButton.classList.toggle("open", state);
  html.classList.toggle("no-scroll", state);
}

// Привязываем события клика к кнопкам меню
menuLinks.forEach((link) => {
  const button = document.getElementById(link.buttonId);
  const target = document.getElementById(link.targetId);

  if (button && target) {
    button.addEventListener("click", () => {
      // Вычисляем смещение: calc(50 / 498 * 100vw)
      const offset = (50 / 498) * window.innerWidth;

      // Прокрутка с вычисленным смещением
      const targetOffset = target.getBoundingClientRect().top;
      const scrollPosition = window.scrollY + targetOffset - offset;

      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });

      // Закрытие меню
      toggleMenu(false);
    });
  }
});

// Управление меню при клике на гамбургер-кнопку
menuButton.addEventListener("click", () => {
  const isMenuOpen = sideMenu.classList.contains("open");
  toggleMenu(!isMenuOpen);
});
