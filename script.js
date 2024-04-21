const apiUrl = "https://api.quotable.io/random";
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const quoteBtn = document.getElementById("quoteBtn");
const copyBtn = document.getElementById("copyBtn");
const notification = document.querySelector(".notification");

/**
 * Function to get a new quote.
 * @param {string} url
 */
async function getQuote(url) {
  const response = await fetch(url);
  let data = await response.json();
  quote.innerHTML = data.content;
  author.innerHTML = data.author;
}

/**
 * Function to copy the current quote.
 */
function copyQuote() {
  const quoteContent = quote.textContent;
  const authorContent = author.textContent;

  const formattedQuote = `"${quoteContent}" © ${authorContent}`;

  const tempInput = document.createElement("input");
  tempInput.value = formattedQuote;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);

  //add 2.5sec notification
  notification.style.display = "block";
  notification.style.opacity = 1;
  setTimeout(() => {
    notification.style.display = "none";
  }, 2500);
}

getQuote(apiUrl);

/**
 * Listeners for buttons.
 */

quoteBtn.addEventListener("click", () => {
  getQuote(apiUrl);
});

copyBtn.addEventListener("click", () => {
  copyQuote();
});
