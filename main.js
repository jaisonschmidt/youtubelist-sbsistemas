"use strict";

var musicas = [];

function criarMusicaFactory(id, titulo) {
  return {
    id,
    titulo,
  };
}

function renderizaMusica(musica, indice) {
  return `
        <div class="btn-video__wrapper">
            <button type="button" class="btn-video__title">
                ${musica.titulo}
            </button>
            <button type="button" data-musica-indice="${indice}" class="btn-video__remove" title="Remover vídeo">
                <i class="fa fa-times"></i>
            </button>
        </div>
    `;
}

function renderizaMusicas(p_musicas) {
  let listaMusicas = "";

  for (let i = 0; i < p_musicas.length; i++) {
    listaMusicas += renderizaMusica(p_musicas[i], i);
  }

  document.getElementById("musicWrapper").innerHTML = listaMusicas;
  configDeleteMusica();
}

function limpaListaMusicas() {
  if (confirm("Deseja realmente limpar a lista de músicas?")) {
    musicas = [];
    renderizaMusicas(musicas);
  }
}

function configButtonClick() {
  let btnClean = document.querySelectorAll("[data-clean-music]");

  btnClean.forEach((obj) => {
    obj.onclick = limpaListaMusicas;
  });
}

function configDeleteMusica() {
  let btnDelete = document.querySelectorAll("[data-musica-indice]");

  btnDelete.forEach((obj) => {
    obj.onclick = function () {
      let indice = Number(this.getAttribute("data-musica-indice"));
      console.log(typeof indice, indice);
      musicas.splice(indice, 1);
      renderizaMusicas(musicas);
    };
  });
}

function run() {
  console.log("Página carregada");

  musicas.push(criarMusicaFactory("1qag-o1kfQY", "Título da primeira música"));
  musicas.push(criarMusicaFactory("1qag-o1kfQY", "Título da primeira música"));
  musicas.push(criarMusicaFactory("1qag-o1kfQY", "Título da primeira música"));
  musicas.push(criarMusicaFactory("1qag-o1kfQY", "Título da primeira música"));

  renderizaMusicas(musicas);
  configButtonClick();
}

window.onload = run;
