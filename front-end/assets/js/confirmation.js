
//* Affichage des données--------------------------------------------------
let affichagePrixTotal = document.querySelector(".totalPrice span")
let affichageID = document.querySelector(".commandeID span")
orderInfo = JSON.parse(localStorage.orderInfos)
let prixTotal = JSON.parse(localStorage.getItem("prixTotal"))
let orderId = orderInfo.orderId;
let affichageNom = document.querySelector(".name span")
let nameGet = localStorage.getItem("orderInfos")
nameGet = JSON.parse(nameGet)

//* Affichage de le date et l'heure de la commande-----------------------------------
let d = new Date();
let date = d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear();
let hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
let fullDate = date+' à '+hours
let affichagefullDate = document.querySelector(".Date span")



//*  Affichage des données--------------------------------------------------------
affichagePrixTotal.textContent = prixTotal
affichageID.textContent = orderId
affichageNom.textContent = `${nameGet.contact.firstName} ${nameGet.contact.lastName}`
affichagefullDate.textContent = fullDate 



//* reset du panier----------------------------------------------------------------
window.addEventListener("unload", function () {
    localStorage.clear()
})