//* récupération de l'id produit dans l'url avec la méthode URLSearchParams----------
let urlSearchParams = new URLSearchParams(document.location.search)
let id = urlSearchParams.get("id")
let url = 'http://localhost:3000/api/cameras'




//* Affichage produit dans la page--------------------------------------------------
let request = new XMLHttpRequest()
request.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        camera = JSON.parse(this.responseText)
        affichageProduit()
    }
}
//* initialisation de la requête-------------------------------------------------
request.open("GET", url + '/' + id)
//* envoi de la requête----------------------------------------------------------
request.send()

//* affichage du produit---------------------------------------------------------
function affichageProduit() {

    //* Ciblage des données stockées-----------------------------------------------
    let titre = document.getElementById("titre")
    let prix = document.getElementById("prix")
    let description = document.getElementById("description")
    let image = document.getElementById("image")


    //*  Affichage des données--------------------------------------------------------
    titre.textContent = camera.name
    prix.textContent = camera.price / 100 + " €"
    description.textContent = camera.description
    image.src = camera.imageUrl


    //* Création des choix d'objectifs-------------------------------------------------
    let lenses = document.getElementById("lense-select")
    let options = camera.lenses
    options.forEach(function (element, lense) {
        lenses[lense] = new Option(element, element)
    })

    //* sélection des objectifs---------------------------------------------------
    let selectionLense = document.getElementById("lense-select").addEventListener("change", function (e) {
        selectionLense = e.target.value
    })

    //* sélection de la quantité---------------------------------------------------
    let quantiteProduit = document.getElementById("quantiteProduit").addEventListener('change', function (e) {
        quantiteProduit = e.target.value
    })

    //* bouton ajouter au panier------------------------------------------------------
    let ajouterPanier = document.getElementById("btn-ajouter")
    ajouterPanier.addEventListener("click", function () {
        if (selectionLense != undefined && quantiteProduit != undefined) {
            camera.lenses = selectionLense;
            camera.quantity = quantiteProduit;

        } else if (selectionLense == undefined && quantiteProduit != undefined) {
            camera.lenses = camera.lenses[0]
            camera.quantity = quantiteProduit

        } else if (selectionLense != undefined && quantiteProduit == undefined) {
            camera.lenses = selectionLense
            camera.quantity = 1

        } else {
            camera.lenses = camera.lenses[0];
            camera.quantity = 1;
        }
        alert("L'article à bien été ajouté au panier")
        prixTotal()
        ajoutLocalStorage()
    })
}

//* Fonction du prix total dans localStorage------------------------------------
function prixTotal() {
    let price = parseInt(camera.price)
    let prixDuPanier = JSON.parse(localStorage.getItem('prixTotal'))

    if (prixDuPanier == 0) {
        localStorage.setItem("prixTotal", prixDuPanier + (price / 100 * camera.quantity))
    } else {
        localStorage.setItem("prixTotal", prixDuPanier + (price / 100 * camera.quantity))
    }
}

//* Fonction ajout dans localStorage------------------------------------------
function ajoutLocalStorage() {
    let panier = localStorage.getItem('panier')
    panier = JSON.parse(panier)

    let name = camera.name + camera.lenses;
    if (panier != null) {
        let element = panier[name]
        if (element === undefined) {
            panier = {
                ...panier,
                [name]: camera
            }
        } else {
            let quantity = parseInt(element.quantity)
            quantity += parseInt(camera.quantity)
            element.quantity = quantity
        }
    } else {
        panier = {
            [name]: camera
        }

    }
    localStorage.setItem("panier", JSON.stringify(panier));
}