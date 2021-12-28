function popSum(msg) {
  let sumpage = document.getElementsByClassName('sumpage')[0];
  let sumText = document.getElementsByClassName('sumtext')[0];
  sumText.innerHTML = msg;
  sumpage.style.display = 'block';
}

function cancelSum() {
  let sumpage = document.getElementsByClassName('sumpage')[0];
  let sumText = document.getElementsByClassName('sumtext')[0];
  sumpage.style.display = 'none';
}