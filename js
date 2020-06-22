//---------------------------------variables

const listaNotas = document.querySelector('#lista'); 


//---------------------------------event listeners
eventListener();

function eventListener(){
    //cuando se envía el formulario
    document.querySelector('#formulario').addEventListener('submit', agregarNota);

    //borrar nota
    listaNotas.addEventListener('click', borrarNota);

    //contenido cargado en localStorage
    document.addEventListener('DOMContentLoaded', localStorageListo);
}



//-------------------------------------funciones
function agregarNota(e){
    e.preventDefault();
    //console.log('Formulario enviado');

    //leer valor de textarea
    const nota = document.querySelector('#nota').value;
    //console.log(nota);

    //agregar nota a la lista
    listaNotas.innerHTML += `<li>
                                <p class="texto">${nota}</p>
                                <a href="#" class="borrar">X</a>
                            </li>`;   
                            
    //añadir a localStorage
    agregarNotaLocalStorage(nota);                        
};

function borrarNota(e) {
    e.preventDefault();
    //console.log('hiciste click en la lista');

    //delegation
    if(e.target.className === 'borrar'){
        //console.log('clickaste eliminar');
        e.target.parentElement.remove();
        
        //borrar en localStorage
        borrarNotaLocalStorage(e.target.parentElement.children[0]);

    }/* else{
        console.log('clickaste en otra parte');
    }*/
};

//mostrar datos de LOCalStorage en la lista
function localStorageListo(){
    let notas;
    notas = obtenerNotasLocalStorage();

    notas.forEach(function(nota) {
        //agregar nota a la lista
        listaNotas.innerHTML += `<li>
                                    <p class="escrito">${nota}</p>
                                    <a href="#" class="borrar">X</a>
                                </li>`;   
    });
};

//agregar nota al local storage
function agregarNotaLocalStorage(nota){
    let notas;

    notas = obtenerNotasLocalStorage();

    //añadir una nueva nota
    notas.push(nota);

    //convertir de string a arreglo para localStorage
    localStorage.setItem('notas', JSON.stringify(notas));

};

//comprobar que hay elementos en localStorage, returna un arreglo
function obtenerNotasLocalStorage(){
    let notas;

    //revisamos los valores de local storage
    if(localStorage.getItem('notas') === null){
        //si no hay nada en local storage
        notas = [];
    }else{
        //si ya tiene, usamos un json 
        notas = JSON.parse(localStorage.getItem('notas'));
    }
    return notas;
};

//borrar nota de Local Storage
function borrarNotaLocalStorage(texto){
    let notas, notaBorrar;

    notaBorrar = texto.innerText;

    notas = obtenerNotasLocalStorage();
    
    notas.forEach(function(texto, index){
       if(notaBorrar === texto){
           notas.splice(index, 1);
           console.log(index);
       }
    });
    localStorage.setItem('notas', JSON.stringify(notas));
}

