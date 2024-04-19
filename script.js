const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");

let bookmarks = [];

// Show Modal, Focus on Input
function showModal() {
  modal.classList.add("show-modal");
  websiteNameEl.focus();
}

// Modal Event Listeners
modalShow.addEventListener("click", showModal);
modalClose.addEventListener("click", () =>
  modal.classList.remove("show-modal")
);
// we want to hide the modal when click outside
// window.addEventListener('click', (e) => console.log(e.target));
window.addEventListener("click", (e) =>
  console.log(e.target === modal ? modal.classList.remove("show-modal") : false)
);

// Validate Form
function validate(nameValue, urlValue) {
    const expression = /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if (!nameValue || !urlValue) {
      alert('Please submit values for both fields.');
      return false;
    }
    if (!urlValue.match(regex)) {
      alert('Please provide a valid web address.');
      return false;
    }
    // Valid
    return true;
  }

// Fetch Bookmarks
function fetchBookmarks() {
    // Get bookmarks from localStorage if available also converting them from json string to js object using parse
    if (localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }
    // At the very first time if someone visit, there would be no bookmarks, so a default bookmark is created.
    else {
        bookmarks = [
            {
                name: 'Jacinto Design',
                url: 'https://jacinto.design',
            },
        ];
        //saving default bookmarks into the local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    console.log(bookmarks);
}

// Handle Data from Form
function storeBookmark(e) {
  e.preventDefault();
  // console.log(e);
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  //adding https automatically
  if (!urlValue.includes("https://") && !urlValue.includes("http://")) {
    urlValue = `https://${urlValue}`;
  }
//   console.log(nameValue, urlValue);
  if (!validate(nameValue, urlValue)){
    return false;
  }
  //creating bookmark object and push it in an array
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  bookmarks.push(bookmark);
//   console.log(JSON.stringify(bookmarks));
  // we stored the objects as string in the local storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameEl.focus();
  
}

// Event Listener
bookmarkForm.addEventListener("submit", storeBookmark);

// On Load, Fetch Bookmarks
fetchBookmarks();
