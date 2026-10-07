// Project override of the Terminal theme's menu.js: same behaviour, plus
// aria-expanded on the trigger and Escape to close, for keyboard and screen reader users.
const container = document.querySelector(".container");
const allMenus = document.querySelectorAll(".menu");

const setOpen = (menu, open) => {
  menu.classList.toggle("open", open);
  const trigger = menu.querySelector(".menu__trigger");
  if (trigger) trigger.setAttribute("aria-expanded", String(open));
};

const closeAll = () => allMenus.forEach(menu => setOpen(menu, false));

// Hide menus on body click
document.body.addEventListener("click", closeAll);

// Reset menus on resize
window.addEventListener("resize", closeAll);

// Close menus with Escape and return focus to the trigger
document.addEventListener("keydown", e => {
  if (e.key !== "Escape") return;
  allMenus.forEach(menu => {
    if (!menu.classList.contains("open")) return;
    setOpen(menu, false);
    menu.querySelector(".menu__trigger")?.focus();
  });
});

allMenus.forEach(menu => {
  const trigger = menu.querySelector(".menu__trigger");
  const dropdown = menu.querySelector(".menu__dropdown");
  if (!trigger || !dropdown) return;

  trigger.addEventListener("click", e => {
    e.stopPropagation();

    const wasOpen = menu.classList.contains("open");
    closeAll();
    setOpen(menu, !wasOpen);

    if (dropdown.getBoundingClientRect().right > container.getBoundingClientRect().right) {
      dropdown.style.left = "auto";
      dropdown.style.right = 0;
    }
  });

  dropdown.addEventListener("click", e => e.stopPropagation());
});
