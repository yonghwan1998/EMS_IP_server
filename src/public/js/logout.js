'use strict';

const logoutBtn = document.querySelector('#logoutButton');

logoutBtn.addEventListener('click', logout);

function logout() {
  location.href = '/logout';
}