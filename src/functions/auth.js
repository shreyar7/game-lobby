import {signInWithEmailAndPassword} from "firebase/auth"

const loginForm = document.querySelector('#player-login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("submit")
})