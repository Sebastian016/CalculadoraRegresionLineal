import {añadirMuestra, generarModelo, generarGrafica, cambiarTema} from "./botones.js";

document.addEventListener("DOMContentLoaded", () =>{
    const btnMuestra = document.querySelector(".btnMuestra");
    const btnModelo = document.querySelector(".btnModelo");
    const btnGrafica = document.querySelector(".btnGrafica");
    const btnTema = document.querySelector(".btnTema");

    btnMuestra.addEventListener("click", añadirMuestra);
    btnModelo.addEventListener("click", generarModelo);
    btnGrafica.addEventListener("click", generarGrafica);
    btnTema.addEventListener("click", cambiarTema);
})
