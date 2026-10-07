const blockcodes = document.querySelectorAll(".chroma code[data-lang]");

for (const bc of blockcodes) {
  const parent = bc.parentElement;
  const content = bc.innerText.split("\n").filter(Boolean).join("\n");

  // Code title
  const title = document.createElement("div");
  const lang = bc.dataset.lang;
  title.classList.add("code-title");
  title.innerText = lang;

  // Copy to clipboard
  if (navigator.clipboard !== undefined) {
    const cpbutton = document.createElement("button");
    cpbutton.classList.add("copy-button");
    cpbutton.innerText = "Kopieer";

    cpbutton.addEventListener("click", () => {
      cpbutton.innerText = "Gekopieerd";
      setTimeout(() => {
        cpbutton.innerText = "Kopieer";
      }, 1000);

      navigator.clipboard.writeText(content);
    });

    title.append(cpbutton);
  }

  parent.closest(".highlight").prepend(title);
}
