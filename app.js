

"use strict";

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const engineSelect = document.getElementById("engineSelect");
const clearBtn = document.getElementById("clearBtn");

const searchEngines = {
  google: "https://www.google.com/search?q=",
  bing: "https://www.bing.com/search?q=",
  duckduckgo: "https://duckduckgo.com/?q=",
  youtube: "https://www.youtube.com/results?search_query="
};

function updateClearButton() {
  clearBtn.hidden = searchInput.value.length === 0;
}

function performSearch(query) {
  const cleanQuery = query.trim();

  if (!cleanQuery) {
    searchInput.focus();
    return;
  }

  const engine = engineSelect.value;
  const baseUrl = searchEngines[engine];

  if (!baseUrl) {
    return;
  }

  const searchUrl = baseUrl + encodeURIComponent(cleanQuery);

  window.location.href = searchUrl;
}

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  performSearch(searchInput.value);
});

searchInput.addEventListener("input", updateClearButton);

clearBtn.addEventListener("click", function () {
  searchInput.value = "";
  updateClearButton();
  searchInput.focus();
});

document.querySelectorAll(".quick-btn").forEach(function (button) {
  button.addEventListener("click", function () {
    const query = button.dataset.query;

    searchInput.value = query;
    updateClearButton();
    performSearch(query);
  });
});

// Automatically focus the search field on larger screens only.
if (window.matchMedia("(min-width: 768px)").matches) {
  searchInput.focus();
  }
