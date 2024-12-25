import { findTheLongestPuzzle } from "./get-longest-puzzle";

const fileInputEl = document.querySelector(".form__input");
const currentFileEl = document.querySelector(".form__file");
const submitBtn = document.querySelector(".form__button");
const puzzleDisplayEl = document.querySelector(".puzzle");

window.addEventListener("load", () => {
  currentFileEl.textContent = fileInputEl.files[0]?.name ?? "No file provided";
});

fileInputEl.addEventListener("change", (event) => {
  currentFileEl.textContent = event.target.files[0].name;
});
submitBtn.addEventListener("click", getFile);

function getFile(event) {
  event.preventDefault();
  const file = fileInputEl.files[0];
  const reader = new FileReader();
  if (!file) {
    puzzleDisplayEl.textContent =
      "Error! No file found or wrong file provided. Ensure that file format is txt";
    return;
  }
  reader.readAsText(file);
  reader.onload = (e) => {
    const content = e.target.result;
    const array = content.split(/\n/);
    const result = findTheLongestPuzzle(array);
    puzzleDisplayEl.textContent = result;
  };
}
