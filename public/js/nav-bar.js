let searchBtn = document.querySelector('.searchBtn');
let closeBtn = document.querySelector('.closeBtn');
let searchBox = document.querySelector('.searchBox');
let navigation = document.querySelector('.navigation');
let menuToggle = document.querySelector('.menuToggle');
let header = document.querySelector('header');

searchBtn.onclick = function () {
    searchBox.classList.add('active');
    closeBtn.classList.add('active');
    searchBtn.classList.add('active');
    menuToggle.classList.add('hide');
    header.classList.remove('open');
};

closeBtn.onclick = function () {
    searchBox.classList.remove('active');
    closeBtn.classList.remove('active');
    searchBtn.classList.remove('active');
    menuToggle.classList.remove('hide');
};

menuToggle.onclick = function () {
    header.classList.toggle('open');
    searchBox.classList.remove('active');
    closeBtn.classList.remove('active');
    searchBtn.classList.remove('active');
};

let closeBox = document.querySelector('.closeBox');
let closetextBox = document.querySelector('#closetextBox');
let showaddcmt = document.querySelector('.showaddcmt');

showaddcmt.onclick = function () {
    showaddcmt.classList.add('hide');
    closeBox.classList.add('active');
    closetextBox.classList.add('active');
};

closeBox.onclick = function () {
    showaddcmt.classList.remove('hide');
    closeBox.classList.remove('active');
    closetextBox.classList.remove('active');
    // closetextBox.classList.remove('erase');
};