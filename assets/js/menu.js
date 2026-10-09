const container = document.querySelector(".container");
const allMenus = document.querySelectorAll(".menu");

function setOpen(menu, open) {
  menu.classList.toggle("open", open);
  const trigger = menu.querySelector(".menu__trigger");
  if (trigger) trigger.setAttribute("aria-expanded", String(open));
}
function closeMenus() {
  allMenus.forEach(menu => setOpen(menu, false));
}
document.addEventListener("click", event => {
  if (!event.target.closest(".menu")) closeMenus();
});
window.addEventListener("resize", closeMenus);
allMenus.forEach(menu => {
  const trigger = menu.querySelector(".menu__trigger");
  const dropdown = menu.querySelector(".menu__dropdown");
  if (!trigger || !dropdown) return;
  trigger.addEventListener("click", () => {
    const open = !menu.classList.contains("open");
    closeMenus();
    setOpen(menu, open);
    if (open && container && dropdown.getBoundingClientRect().right > container.getBoundingClientRect().right) {
      dropdown.style.left = "auto";
      dropdown.style.right = "0";
    }
  });
  menu.addEventListener("keydown", event => {
    if (event.key === "Escape" && menu.classList.contains("open")) {
      setOpen(menu, false);
      trigger.focus();
      event.preventDefault();
    }
  });
  menu.addEventListener("focusout", event => {
    if (!menu.contains(event.relatedTarget)) setOpen(menu, false);
  });
});
