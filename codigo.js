const toDoIngresado = document.getElementById("IngresarToDo");
const mostrarToDo = document.getElementById("mostrarToDo");
const mostrarRapida = document.getElementById("botonRapida");

let listaToDo = [];
let id = 0;

function agregarToDo() {
    
   const nuevoToDo = {
        id: id,
        ToDo: toDoIngresado.value,
        tachado: false,
        fechaCreacion: new Date().toLocaleString(),
        fechaTachado: ""
    };
    listaToDo.push(nuevoToDo);
    id++;
    mostrarLista();
    
}
function mostrarLista() {
    mostrarToDo.innerHTML = listaToDo.map(td => `
    <div>
        <label>
            <input type="checkbox" onchange="marcarComoTachado('${td.ToDo}', this.checked)" ${td.tachado ? 'checked' : ''}>
            ${td.ToDo} - Creado: ${td.fechaCreacion} ${td.tachado ? '- Completado: ' + td.fechaTachado : ''}
        </label>
    </div>
    `).join('');
    //td.tachado ? es un if que pregunta si esta tachado
    //checked es true / false si esta tachado o no
}
function marcarComoTachado(toDo, estado) {
    const encontro = listaToDo.find(td => td.ToDo === toDo);
    //el .find devuelve el primer valor que encuentra que cumple la condicion
    //si no la cumple devuelve undefined
    if(encontro !== undefined){
        encontro.tachado = estado;
        if(estado === true){
            encontro.fechaTachado = new Date().toLocaleString();
        }
        else{
            encontro.fechaTachado = "";
            
        }
        
    }
    mostrarLista();
}
function tareaMasRapida(){
    
}



document.getElementById("botonAgregar").addEventListener("click", agregarToDo);
mostrarRapida.addEventListener("click", tareaMasRapida);