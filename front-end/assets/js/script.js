const connection = document.getElementById("connection");
const inscription = document.getElementById("inscription");

connection.addEventListener('click', event => { // activation des fonctions au click d'ajout au panier
    document.getElementById('alertPanel').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    console.log("connecter");
})

inscription.addEventListener('click', event => { // activation des fonctions au click d'ajout au panier
    document.getElementById('alertPanel-login').style.display = 'block';
    document.getElementById('overlay-login').style.display = 'block';
    console.log("connecter");
})