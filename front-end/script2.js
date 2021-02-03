

const userData2 = {
  first_name: "seb",
    last_name: "de",
  email: "bbbb@gmail.com",
  password: "aaa",
};

const user = document.getElementById("submit");
user.addEventListener("click", event=>{
  const userData2 = {
    first_name: "seb",
      last_name: "de",
    email: "zzzz@gmail.com",
    password: "aaa",
  };
  fetch(`http://localhost:3000/api/auth/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(userData2)
      }).then(response => response.json())
      .then((responseJson) => {content = responseJson;})
})

const userEnre = document.getElementById("submit2");
userEnre.addEventListener("click", event=>{
  const userData = {
    first_name: "seb",
    last_name: "de",
    email: "cccc@gmail.com",
    password: "aaa",
};
  fetch(`http://localhost:3000/api/auth/signup`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(userData)
      }).then(response => response.json())
      .then((responseJson) => {content = responseJson;})
})


