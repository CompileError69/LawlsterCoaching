/* Open login form */
document.querySelector("#login-btn").onclick = () => {
    document.querySelector(".login-form-container").classList.toggle("active");
  };
  
  document.querySelector("#close-login-form").onclick = () => {
    document.querySelector(".login-form-container").classList.remove("active");
  };
  
  let header = document.querySelector("header");
  
  window.addEventListener("scroll", () => {
    header.classList.toggle("shadow", window.scrollY > 0);
  });
  
  let menu = document.querySelector(".navbar");
  
  document.querySelector("#menu-icon").onclick = () => {
    menu.classList.toggle("active");
  };
  /* remove shadow on scroll */
  window.onscroll = () => {
    menu.classList.remove("active");
  };
  

  