const urlRecupId = window.location.search; // recuperation de l'url de la page 
const container = document.getElementById("fiche-article");
const titleSecondary = document.getElementById("title-secondary");
const choix = document.getElementById("couleur-choix");
const addArticle = document.getElementById("add-article");
const retourCouleurs = document.getElementById("retouCouleurs");
retourCouleurs.setAttribute("href", "produits.html" + urlRecupId)

function recupUrl () {
    let searchParams = new URLSearchParams(urlRecupId);
    const urlRecup = searchParams.getAll("produit");
    api = "http://localhost:3000/api/teddies/" + urlRecup;
}
recupUrl();

function stockOurs(){
    localStorage.setItem("ours", JSON.stringify(oursTab));
}

function generateLine(teddy) {                          // creation des div pour le teddy selectionné
    let titreGener = document.createElement("h1");      // création des elements 
    let imgGener = document.createElement("img");
    let priceGener = document.createElement("p");
    let descriptionGener = document.createElement("p");

    titreGener.textContent = teddy.name;                // ajout du texte 
    priceGener.textContent = (teddy.price/100).toFixed(2) + ' €';
    descriptionGener.textContent = teddy.description;

    titreGener.setAttribute("class", "text-center");        // ajout des classes 
    imgGener.setAttribute("class", "col-md-8 img-fluid");
    imgGener.setAttribute("height", "300");
    imgGener.setAttribute("src", teddy.imageUrl);
    priceGener.setAttribute("class", "font-weight-bold h3");
    descriptionGener.setAttribute("class", "h6")

    container.appendChild(titreGener);                // hierarchisation des elements
    container.appendChild(imgGener);
    container.appendChild(priceGener);
    container.appendChild(descriptionGener);


}

function changeValeur(oursId) { // changement de la valeur de la quantité selectionné
    select = document.getElementById("quantité");
    choice = select.selectedIndex // Récupération de l'index du <option> choisi
    valeur_choisie = select.options[choice].value;
    oursId.quantity = parseInt(valeur_choisie);
}

function changeCouleur(oursId) { // changement de la valeur de la couleur selectionné 
    select = document.getElementById("couleur-choix");
    choice = select.selectedIndex // Récupération de l'index du <option> choisi
    valeur_choisie = select.options[choice].value;
    oursId.color = valeur_choisie;
}

let oursTab = []; // tableau ours 

function add(teddy, oursId) { // ajout au panier 
    newOursId = true;
    if (localStorage.getItem("ours") === null) { // si panier vide 
        oursTab.push(oursId);
        stockOurs() // stock l'article dans le localStorage
    } else { // sinon crée un nouvelle article si couleur ou Id different 
        oursTab = JSON.parse(localStorage.getItem('ours'));
        const selectColor = document.getElementById("couleur-choix").value;
        oursTab.forEach((newOursTab) => {
            if (teddy._id === newOursTab.id && newOursTab.color === selectColor) {
                const quantité = parseInt(document.getElementById("quantité").value);
                newOursTab.quantity += quantité;
                newOursId = false;
            }
        })
        if (newOursId) oursTab.push(oursId);
        stockOurs() // stock le nouvelle article dans le localStorage
    }
}

fetch(api)
    .then(response => response.json())
    .then(teddy => {

        generateLine(teddy); // mise en place de la partie HTML dynamique

        titleSecondary.textContent = `${teddy.name}` // fin de la mise en page HTML dynamique

        const listOurs = teddy.colors;

        for (let i = 0; i < listOurs.length; i++) { // generation d'une option pour chaque couleur presente sur le seveur
            let retour = listOurs[0 + i];
            choix.innerHTML += `<option value="${retour}">${retour}</option>`
        }

        let oursId = { // object oursId qui sera push dans le oursTab 
            name: teddy.name,
            img: teddy.imageUrl,
            price: teddy.price / 100,
            id: teddy._id,
        };

        addArticle.addEventListener('click', event => { // activation des fonctions au click d'ajout au panier
            changeCouleur(oursId);
            changeValeur(oursId);
            add(teddy, oursId);
            document.getElementById('alertPanel').style.display = 'block';
            document.getElementById('overlay').style.display = 'block';
            console.log("Produit ajouté au panier");
        })
    })