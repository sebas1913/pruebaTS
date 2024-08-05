import { UserLogin } from "../controllers/login.controller";

const url = 'https://api-posts.codificando.xyz/auth/login';

const loginForm = document.querySelector("#loginForm") as HTMLFormElement;
const emailUser = document.querySelector("#emailUser") as HTMLInputElement;
const passwordUser = document.querySelector("#passwordUser") as HTMLInputElement;
// const loading = document.querySelector("#loading") as HTMLDivElement;

loginForm.addEventListener("submit", async (event : Event) => {
  event.preventDefault();
  
  const user = {
    email : emailUser.value,
    password : passwordUser.value
  }

 try{
  const pageController = new UserLogin(url);
  const token = await pageController.login(user);

  console.log(token);
  


  sessionStorage.setItem('token', token.token);

  const getToken = sessionStorage.getItem('token');

  if (getToken) {
    window.location.href = '../views/Home.html'
    alert('se inició sesión');
  }
 }
 catch (error) {
  alert(error);
  window.location.href = 'index.html'
 }

})
