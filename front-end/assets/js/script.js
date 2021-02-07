const connection = document.getElementById("connection");
const inscription = document.getElementById("inscription");

connection.addEventListener('click', event => { // activation des fonctions au click d'ajout au panier
    document.getElementById('alertPanel').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
})

inscription.addEventListener('click', event => { // activation des fonctions au click d'ajout au panier
    document.getElementById('alertPanel-login').style.display = 'block';
    document.getElementById('overlay-login').style.display = 'block';
})

const nom = document.getElementById("nom");
const prenom = document.getElementById("prenom");
const email = document.getElementById("email");
const password = document.getElementById("password");

function retourFormulaire(){                      
    const userData = {
        first_name: nom.value,
        last_name: prenom.value,
        email: email.value,
        password: password.value,
      }
       
    fetch(`http://localhost:3000/api/auth/signup`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
    }).then(response => response.json())
      .then((responseJson) => {content = responseJson;})
}

const form = document.getElementById("formulaire");

form.addEventListener('submit', function(e) {                   // ecoute soumission formulaire
  e.preventDefault();
  if (validPrenom(form.prenom) && validNom(form.nom) && validEmail(form.email)) {
          retourFormulaire()
  }
});

const email2 = document.getElementById("email2");
const password2 = document.getElementById("password2");

function retourConnect(){                      
    const userConnect = {
        email: email2.value,
        password: password2.value
      }
       
    fetch(`http://localhost:3000/api/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userConnect)
    }).then(response => response.json())
      .then((responseJson) => {content = responseJson;})
}

const form2 = document.getElementById("formulaire2");

form2.addEventListener('submit', function(e) {                   // ecoute soumission formulaire
  e.preventDefault();
    retourConnect()
    // window.location = "./index2.html"
});

const nomValidRegExp = /[0-9$£°&+,:;=?@#|'<>.^*()!"{}_]/;

function validPrenom (inputPrenom) {                     // validation prenom
    if (inputPrenom.value == "" || inputPrenom.value.length < 2) {
        alert("les champs prenon est vide ou comporte une erreur!!!!")
        return false;
    } else if (!RegExp(nomValidRegExp).test(inputPrenom.value)) {
        return true;
    } else {
        alert("les champs prenon comporte une erreur !!!!")
        return false;
    }
};

function validNom(inputNom) {                           //   validation Nom
    if (inputNom.value == "" || inputNom.value.length < 3) {
        alert("les champs nom est vide ou comporte une erreur!!!!")
        return false;
    } else if (!RegExp(nomValidRegExp).test(inputNom.value)) {
        return true;
    } else {
        alert("les champs nom comporte une erreur !!!!")
        return false;
    }
};

function validEmail (inputEmail) {                            // validation Email
    const emailRegExp = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;
    if (RegExp(emailRegExp).test(inputEmail.value)) {
        return true;
    } else {
        alert("les champs mail comportte une erreur !!!!")
        return false;
    }
};