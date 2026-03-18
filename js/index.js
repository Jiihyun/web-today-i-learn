const tilForm = document.querySelector("#til-form");
const tilList = document.querySelector("#til-list");
const TIL_STORAGE_KEY = "til_data";

function loadSavedTILs() {
  const savedData = localStorage.getItem(TIL_STORAGE_KEY);
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    parsedData.forEach(data => addTilToDOM(data.date, data.title, data.content));
  }
}

function addTilToDOM(date, title, content) {
  const article = document.createElement("article");
  article.classList.add("til-item");

  const timeEl = document.createElement("time");
  timeEl.textContent = date;

  const titleEl = document.createElement("h3");
  titleEl.textContent = title;

  const contentEl = document.createElement("p");
  contentEl.textContent = content;

  article.appendChild(timeEl);
  article.appendChild(titleEl);
  article.appendChild(contentEl);

  tilList.prepend(article);
}

loadSavedTILs();

tilForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const dateInput = document.querySelector("#til-date");
  const titleInput = document.querySelector("#til-title");
  const contentInput = document.querySelector("#til-content");

  const date = dateInput.value;
  const title = titleInput.value;
  const content = contentInput.value;

  addTilToDOM(date, title, content);

  const savedData = localStorage.getItem(TIL_STORAGE_KEY);
  const dataArray = savedData ? JSON.parse(savedData) : [];
  dataArray.push({ date, title, content });
  localStorage.setItem(TIL_STORAGE_KEY, JSON.stringify(dataArray));

  tilForm.reset();
});

const themeToggle = document.querySelector("#theme-toggle");
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  themeToggle.textContent = currentTheme === "dark" ? "☀️" : "🌙";
}

themeToggle.addEventListener("click", () => {
  let theme = document.documentElement.getAttribute("data-theme");
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "🌙";
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "☀️";
  }
});
