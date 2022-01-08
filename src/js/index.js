"use strict";

// Selecting Elements
const wrapper = document.querySelector(".wrapper");
const body = document.querySelector("body");
const quoteText = document.querySelector(".quote");
const quoteBtn = document.querySelector("button");
const authorName = document.querySelector(".name");
const speechBtn = document.querySelector(".speech");
const copyBtn = document.querySelector(".copy");

const renderError = function (msg) {
  body.insertAdjacentHTML("beforeend", msg);
  body.style.opacity = 1;
};

const getKanyeQuote = function () {
  quoteBtn.classList.add("loading");
  quoteBtn.innerHTML = "Loading..";
  fetch("https://api.kanye.rest")
    .then((response) => {
      console.log(response);
      if (!response.ok) throw new Error(`Quote not found`);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      quoteText.innerHTML = data.quote;
      authorName.innerHTML = "Kanye West";
      quoteBtn.classList.remove("loading");
      quoteBtn.innerHTML = "New quote";
    })
    .catch((err) => {
      console.error(`${err} 🔥🔥🔥`);
      renderError(`Something went wrong 🔥🔥. Try again`);
      wrapper.classList.add("hidden");
    });
};

getKanyeQuote();

copyBtn.addEventListener("click", function () {
  navigator.clipboard.writeText(quoteText.innerText);
});

quoteBtn.addEventListener("click", getKanyeQuote);
