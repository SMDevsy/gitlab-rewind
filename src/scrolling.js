function goToTop() {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}

function scrollCheck(button) {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    button.style.display = "block";
  } else {
    button.style.display = "none";
  }
}

export {goToTop, scrollCheck}
