//const axios = require('axios')

const url = 'http://localhost:3000'
var users 

var pos = 0
var pos_perfil = 0
var users = []

const getUsers = () =>{

    return new Promise((resolve,reject) => {
        fetch(`${url}/users`).then(res => {
            res.json().then(resJ => {
                resolve(resJ)
            })
        }).catch(err => reject(err))
    })
}

const slideShow = async () => {

    users = await getUsers()

    var img = document.getElementById("foto")
    if (users[pos].photo == null) img.src = "https://interfacetreinamentos.com.br/wp-content/uploads/2016/04/img-profile-default.jpg"
    else img.src = users[pos].photo
    email.innerText = users[pos]["email"]
    nome.innerText = users[pos]["first_name"]
    sobrenome.innerText = users[pos]["last_name"]
    genero.innerText = users[pos]["gender"]
    
}

const proximo = () => {

    if (pos + 1 == users.length) {
        pos = 0
    } else {
        pos++
    }

    slideShow()
   
}

const anterior = () => {
    if (pos == 0) {
        pos = users.length - 1
    } else {
        pos--
    }
    slideShow()
}

const start = () => {
    intervalo = setInterval(() => {
        proximo()
    }, 2000);
}

const stop = () => {
    if (intervalo) {
        clearInterval(intervalo)
    }
}

const proximoPerfil = () => {
    if(pos_perfil + 1 == users.length) {
        alert("não há mais usuários");
    } else {
        var div_perfil = document.createElement("div")
        var imagem = document.createElement("img")
        div_perfil.id = "info-perfis"
        imagem.className = "img"

        var info_perfis = document.getElementById("card");
        info_perfis.appendChild(div_perfil)
        div_perfil.appendChild(imagem)

        var email = document.createElement("p")
        var nome = document.createElement("p")
        var genero = document.createElement("p")
        var sobrenome = document.createElement("p")

        div_perfil.appendChild(email)
        div_perfil.appendChild(nome)
        div_perfil.appendChild(genero)
        div_perfil.appendChild(sobrenome)

        if (users[pos_perfil+1].photo == null) imagem.src = "https://interfacetreinamentos.com.br/wp-content/uploads/2016/04/img-profile-default.jpg"
        else imagem.src = users[pos_perfil+1].photo

        email.innerText = users[pos_perfil+1]["email"]
        nome.innerText = users[pos_perfil+1]["first_name"]
        sobrenome.innerText = users[pos_perfil+1]["last_name"]
        genero.innerText = users[pos_perfil+1]["gender"]

        pos_perfil++
    }
}

document.body.onload = slideShow

document.getElementById("foto").onmouseenter = stop
document.getElementById("foto").onmouseleave = start

document.getElementById("botao-anterior").onclick = anterior
document.getElementById("botao-proximo").onclick = proximo
document.getElementById("proximo-perfil").onclick = proximoPerfil
document.getElementById("start").onclick = start
document.getElementById("stop").onclick = stop
