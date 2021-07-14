//* Création variable Url --------------------------------------------------------
let url =  'http://localhost:3000/api/cameras'

//* Récupèration des données de l'API avec fetch-----------------------------------
fetch(url)
    .then(camera => camera.json())
    .then(camera => { // Promise //
        return new Promise(function (resolve, reject) {
            let request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (request.readyState === XMLHttpRequest.DONE) {
                    if (request.status === 200) {
                        resolve(JSON.parse(request.responseText))
                        //* récupèration de chaque élément du tableau Array----------------------------------
                        camera.forEach(({
                            _id,
                            name,
                            price,
                            description,
                            imageUrl,
                        }) => {
                            //* Création variable container------------------------------------------------------
                            let container = document.getElementById("allProducts")

                            //* Template : page camera----------------------------------------------------------
                            let div = document.createElement("div")
                            let img = document.createElement("img")
                            let h3 = document.createElement("h3")
                            let h4 = document.createElement("h4")
                            let p = document.createElement("p")
                            let a = document.createElement("a")

                            //* Création des "noeuds" du nom de l'appareil------------------------------------
                            let elemName = document.createTextNode(name)
                            let elemPrice = document.createTextNode(price / 100 + " €")
                            let elemDescription = document.createTextNode(description)

                            //* Affichage des données---------------------------------------------------------
                            a.href = './pages/produit.html?id=' + _id
                            a.textContent = "En savoir plus"
                            img.src = imageUrl

                            //* FlowChart-Hiérarchisation---------------------------------------------------
                            container.appendChild(div)
                            div.appendChild(img)
                            div.appendChild(h3)
                            div.appendChild(h4)
                            div.appendChild(p)
                            div.appendChild(a)
                            h3.appendChild(elemName)
                            h4.appendChild(elemPrice)
                            p.appendChild(elemDescription)

                            //* Attibutions des class Bootstrap--------------------------------------------------
                            container.className = "d-flex flex-wrap justify-content-center lg-flex-row sm-flex-column mx-auto"
                            div.className = "card col-lg-4 p-3 m-5"
                            img.className = "card-img-top p-3 img-fluid w-100"
                            a.className = "btn btn-secondary w-50 border m-auto"
                        })

                    } else {
                        reject(console.log('erreur :' + error));
                        reject(console.log(error));
                    }
                }
            }

            request.open("GET", 'http://localhost:3000/api/cameras');
            request.send();
        })

    })


