let initpass = document.getElementById("initpass");
let inituser = document.getElementById("inituser");
let startpage = document.getElementById("startpage");
let container = document.getElementById("container");
let status = document.getElementById("status");
let contents = document.getElementById("pass");
let usercontents = document.getElementById("user");
var l = 0;
var show = true;
var show_button = document.getElementById("show_button");
var background = document.getElementById("background");
var mockPage = document.getElementById("page");


var usernames = [];
var passwords = [];

console.clear();


function getDataFromStorage() {
  usernames = JSON.parse(localStorage.getItem("usernames")) || [];
  passwords = JSON.parse(localStorage.getItem("passwords")) || [];
}


function saveDataToStorage() {
  localStorage.setItem("usernames", JSON.stringify(usernames));
  localStorage.setItem("passwords", JSON.stringify(passwords));
}


getDataFromStorage();

function addUser(username, password) {
  usernames.push(username);
  passwords.push(password);
  saveDataToStorage();
}


function isUsernameExists(username) {
  return usernames.includes(username);
}

function isPasswordMatch(username, password) {
  const index = usernames.indexOf(username);
  return index !== -1 && passwords[index] === password;
}


async function check() {
  const username = document.getElementById("user").value;
  const password = document.getElementById("pass").value;

  if (isPasswordMatch(username, password)) {
    console.log("correct!");
    l = 0;
    localStorage.setItem("username", inituser); 
    openPage();
    container.style.display = "none";
    status.innerHTML = "";
    document.getElementById("pagetitle").textContent = `Welcome!!!, ${username}!`; 
  } else {
    console.log("incorrect password or username!");
    l++;
    status.innerHTML = "Incorrect Password or Username!";
    status.style.color = "var(--red)";
    screenShake();
    lock();
    waitOnPress();
  }
}


function signin() {
  const username = inituser.value;
  const password = initpass.value;

  if (username.length > 1 && password.length > 1) {
    if (!isUsernameExists(username)) {
      startpage.style.display = "none";
      container.style.display = "block";
      console.log("Username: " + username);
      console.log("Password: " + password);
      addUser(username, password); 
    } else {
      console.log("Username already exists!");
      status.style.color = "var(--red)";
      status.innerHTML = "Username already exists!";
    }
  } else {
    console.log("No valid input");
    status.style.color = "var(--red)";
    status.innerHTML = "No valid input";
  }
}


function lock() {
  if (l > 2) {
    console.log("too many incorrect attempts!");
    document.getElementById("button").disabled = true;
    document.getElementById("button").style.color = "white";
    status.innerHTML = "Too many attempts! Try again later.";
  }
}


contents.onkeydown = function (e) {
  if (e.keyCode == 13 && l < 3) {
    check();
  } else if (e.keyCode == 13 && startpage.style.display === "block") {
    signin();
  }
};


async function resettrys() {
  console.clear();
  console.log("login attempts reset, try again :)");
  l = 0;
  status.innerHTML = "";
  document.getElementById("button").disabled = false;
  document.getElementById("button").style.color = "white";
  await sleep(1000);
  console.clear();
}


function showStuff() {
  if (show) {
    contents.type = "input";
    initpass.type = "input";
    show_button.innerHTML = "Hide Password";
    show = false;
  } else {
    initpass.type = "password";
    contents.type = "password";
    show_button.innerHTML = "Show Password";
    show = true;
  }
}


async function screenShake() {
  container.style.animation = "wiggle 0.5s ease-in-out";
  await sleep(500);
  container.style.animation = "";
}


async function waitOnPress() {
  if (l < 3) {
    document.getElementById("button").disabled = true;
    await sleep(500);
    document.getElementById("button").disabled = false;
  } else {
    document.getElementById("button").disabled = true;
  }
}


function openPage() {
  mockPage.style.display = "block";
}


async function back() {
  mockPage.style.animation = "slideout 1s ease-in-out";
  await sleep(1000);
  container.style.display = "block";
  mockPage.style.display = "none";
  mockPage.style.animation = "";
}


function resetinputs() {
  inituser.value = "";
  initpass.value = "";
}


const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

function toggleForm() {
  const startpage = document.getElementById("startpage");
  const container = document.getElementById("container");

  if (startpage.style.display === "block") {
      startpage.style.display = "none";
      container.style.display = "block";
  } else {
      startpage.style.display = "block";
      container.style.display = "none";
  }
}