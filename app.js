import {añadirMuestra, generarModelo, generarGrafica} from "./botones.js";

document.addEventListener("DOMContentLoaded", () =>{
    const btnMuestra = document.querySelector(".btnMuestra");
    const btnModelo = document.querySelector(".btnModelo");
    const btnGrafica = document.querySelector(".btnGrafica");

    btnMuestra.addEventListener("click", añadirMuestra);
    btnModelo.addEventListener("click", generarModelo);
    btnGrafica.addEventListener("click", generarGrafica);
})
