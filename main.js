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
            <button 
                type="button" 
                class="btn-video__title" 
                data-musica-codigo="${musica.id}"
              >
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
  configPlayMusica();
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

function configPlayMusica() {
  let btnPlay = document.querySelectorAll("[data-musica-codigo]");

  btnPlay.forEach((obj) => {
    obj.onclick = function () {
      let codigoMusica = this.getAttribute("data-musica-codigo");
      document.querySelector(
        "[data-frame-musica]"
      ).src = `https://www.youtube.com/embed/${codigoMusica}`;
    };
  });
}

function configDeleteMusica() {
  let btnDelete = document.querySelectorAll("[data-musica-indice]");

  btnDelete.forEach((obj) => {
    obj.onclick = function () {
      if (confirm("Deseja realmente excluir exta musica?")) {
        let indice = Number(this.getAttribute("data-musica-indice"));
        musicas.splice(indice, 1);
        renderizaMusicas(musicas);
      }
    };
  });
}

function run() {
  console.log("Página carregada");

  musicas.push(criarMusicaFactory("1qag-o1kfQY", "Título da primeira música"));
  musicas.push(criarMusicaFactory("1qag-o1kfQY", "Título da primeira música"));
  musicas.push(criarMusicaFactory("1qag-o1kfQY", "Título da primeira música"));
  musicas.push(criarMusicaFactory("1qag-o1kfQY", "Título da primeira música"));

  document.querySelector("[data-btn-add]").onclick = function () {
    this.classList.add("hidden");
    document.querySelector("[data-form-add]").classList.remove("hidden");
  };

  document.querySelector("[data-form-add]").onsubmit = function (e) {
    e.preventDefault();

    let txtTitulo = document.querySelector("#txtTitulo");
    let txtCodigo = document.querySelector("#txtCodigo");

    let musicaObj = criarMusicaFactory(txtCodigo.value, txtTitulo.value);
    musicas.push(musicaObj);

    renderizaMusicas(musicas);

    this.reset();

    this.classList.add("hidden");
    document.querySelector("[data-btn-add]").classList.remove("hidden");
  };

  renderizaMusicas(musicas);
  configButtonClick();
}

window.onload = run;
