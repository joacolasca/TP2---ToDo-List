"use strict";

const toDoIngresado = document.getElementById("IngresarToDo");
const mostrarToDo = document.getElementById("mostrarToDo");
const rapidaBoton = document.getElementById("botonRapida");
const rapida = document.getElementById("mostrarMasRapida");

let listaToDo = [];
let listaToDoTachado = [];
let id = 0;

function agregarToDo() {
    
   const nuevoToDo = {
        id: Date.now(),
        ToDo: toDoIngresado.value,
        tachado: false,
        fechaCreacion: new Date().toLocaleString(),
        fechaTachado: ""
    };
    listaToDo.push(nuevoToDo);
    mostrarLista();
}
function mostrarLista() {
    mostrarToDo.innerHTML = "";
    mostrarToDo.innerHTML = listaToDo.map(td => `
        <li class="${td.tachado ? 'completed' : ''}">
            <input type="checkbox" onchange="marcarComoTachado('${td.id}', this.checked)" ${td.tachado ? 'checked' : ''}>
            ${td.ToDo} - Creado: ${td.fechaCreacion} ${td.tachado ? '- Completado: ' + td.fechaTachado : ''}
            <button class="borrar" onclick="borrarToDo('${td.id}')">Borrar</button>
        </li>
    `).join('');
    //td.tachado ? es un if que pregunta si esta tachado
    //checked es true / false si esta tachado o no
}
function marcarComoTachado(toDo, estado) {
    const encontro = listaToDo.find(td => td.id == toDo);
    //el .find devuelve el primer valor que encuentra que cumple la condicion
    //si no la cumple devuelve undefined
    encontro.tachado = estado;
    if(estado === true){
        encontro.fechaTachado = new Date().toLocaleString();
    }
    else{
        encontro.fechaTachado = ""; 
    }

    mostrarLista();
}
function tareaMasRapida(){
    let minDiferencia = Infinity; 
    let tareaRapida = null;
    listaToDo.forEach(td => {
        const diferencia = new Date(td.fechaTachado) - new Date(td.fechaCreacion);
        
        if (diferencia < minDiferencia) {
            minDiferencia = diferencia;
            tareaRapida = td;
        }
    });
    rapida.innerHTML = `La tarea más rápida es: ${tareaRapida.ToDo} y la diferencia de tiempo mas pequeña es: ${minDiferencia}`
}

function borrarToDo(toDo) {
    let i = listaToDo.findIndex(td => td.id == toDo);
    if (i !== -1) {
        listaToDoTachado.push(listaToDo[i]);
        listaToDo.splice(i, 1);
    }
    mostrarLista();
}

document.getElementById("botonAgregar").addEventListener("click", agregarToDo);
rapidaBoton.addEventListener("click", tareaMasRapida);
