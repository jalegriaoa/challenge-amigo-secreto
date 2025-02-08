// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

//Array para listado de amigos
let amigosLista = [];

//Variable para recordar primer amigo que se mostro en alerta
let alertaNombreAmigoX = null;

//Obterer nombre amigo
const amigoHtml = document.getElementById('amigo');

amigoHtml.addEventListener('input',function () {
    //Permitir solo letras
    this.value = this.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
  // Normalizar espacios: reemplazar múltiples espacios por uno solo
  this.value = this.value.replace(/\s+/g, ' ');
});



//Funcion AGREGAR AMIGO
function agregarAmigo() {
    //obtener nombre Amigo
    const txtAmigo = document.getElementById('amigo');
    //eliminar espacios
    const nomAmigo = txtAmigo.value.trim();

    //VALIDACIONES
    //validar campo vacio
    if (nomAmigo === '') {
        alert('Ingrese un nombre de amigo');
        return;
    }

    //Validar nombre amigo max 20 caract.
    if (nomAmigo.length > 20) {
        alert('Ingrese un nombre de amigo de max. 20 caracteres');
        return;
    }

    //Validar nombre amigo repetido
    if (amigosLista.some(amigo => amigo.nombre.toLowerCase() === nomAmigo.toLowerCase())) {
        alert('Este nombre de amigo ya esta en la lista.');
        return;
    }

    //Agregar amigo a la lista
    amigosLista.push({nombre: nomAmigo});

    // console.log('agregar');
    // console.log(amigosLista);
    
    

    //Actualizar listado de amigos
    actualizarListaAmigos();

    //Limpiar campo nombre amigo
    txtAmigo.value = '';
}


//Funcion ACTUALIZAR Listado Amigos
function actualizarListaAmigos() {
    const listadoAmigos = document.getElementById('listaAmigos');
    listadoAmigos.innerHTML = '';

    //Recorrer Array - Listado - Amigos y agregar a cada uno
    amigosLista.forEach((amigo, index) => {
       //Crear <li> para lista
       const li = document.createElement('li');
       li.style.display = 'flex';
       li.style.alignItems = 'center';
       li.style.marginBottom = '5px';

        //Icono para eliminar amigo de la lista
        const iconoCruz = document.createElement('span');
        iconoCruz.textContent = 'x';
        iconoCruz.style.cursor = 'pointer';
        iconoCruz.style.marginRight = '10px';
        
        //Preguntar antes de eliminar
        iconoCruz.addEventListener('click', function() {
            if (confirm(`¿Desear eliminar a ${amigo.nombre}?`)) {
                amigosLista.splice(index, 1);
                actualizarListaAmigos();
            }
        });

        //Crear un span para mostrar listado de nombres
        const span = document.createElement('span');
        span.textContent = `${amigo.nombre}`;

        li.appendChild(iconoCruz);
        li.appendChild(span);

        //Mostrar listado de amigos
        listadoAmigos.appendChild(li);

        // console.log('Actualizar Lista');
        // console.log(listadoAmigos);
        

    });

    listadoAmigos.style.display = 'block';
}


//funcion SELECCION AMIGO ALEATORIO
function sortearAmigo() {
    if (amigosLista.length === 0) {
        alert(`No existen amigos en la lista para seleccionar.`);
        return;
    }
    // indicador aleatorio
    const indRandom = Math.floor(Math.random() * amigosLista.length);
    //console.log('Indice Lista: '+indRandom);
    
    const amigoAzar = amigosLista[indRandom];
    // console.log('Amigo: ');
    // console.log(amigosLista[indRandom]);    


    //Eliminar amigo Aleatorio de la lista
    amigosLista.splice(indRandom, 1);

    // console.log('SORTEAR Lista');
    // console.log(amigosLista);

    //Limpiar lista de amigos
    const listaAmigosX = document.getElementById('listaAmigos');
    listaAmigosX.style.display = 'none';

    //Mostrar Resultado Amigo Aleatorio
    const resultAmigo = document.getElementById('resultado');
    resultAmigo.innerHTML = `El amigo seleccionado es: <strong>${amigoAzar.nombre}</strong> `;
    
}


//Funcion REINICIAR AMIGO 
function reiniciarSorteo() {
   amigosLista.length = 0;
   const listaAmigos = document.getElementById('listaAmigos');
   listaAmigos.innerHTML = '';
   listaAmigos.style.display = 'none';
   const resultado = document.getElementById('resultado');
   resultado.innerHTML = '';
   alert('El sorteo ha sido reiniciado.');

   const txtAmigo = document.getElementById('amigo');
   txtAmigo.value = '';
}