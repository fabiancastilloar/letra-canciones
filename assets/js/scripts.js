
/*

Debes utilizar tu conocimiento de las Promesas de JavaScript,
para implementar un conjunto de reglas muy específicas 
en la lógica de esta aplicación. 
La primera regla establece que un usuario 
solo puede enviar un mensaje, y posterior a esto, 
tu Promesa debe desplegar una notificación que 
indica que ya ha sido enviado.


Cuando un usuario intente enviar otro mensaje, 
tu Promesa tendrá que manejar esta situación, 
y mostrar
una advertencia que diga que no se puede enviar otro.
 Como se ve a continuación:
*/



//condiciones iniciales

var inputArtista = "";
var inputCancion = "";
 

        // Función que maneja el clic del ratón
        function handleClick(event) {
            console.log('Se hizo clic en el botón.');
            limpiarCamposEntrada()
        }

        // Función para añadir el evento de clic
        function addClickListener() {
            const button = document.getElementById('inputArtista');
            button.addEventListener('click', handleClick);
            console.log('Evento click añadido.');           
        }

        // Función para eliminar el evento de clic
        function removeClickListener() {
            const button = document.getElementById('inputArtista');
            button.removeEventListener('click', handleClick);
            console.log('Evento click eliminado.');
        }

        /*
        document.addEventListener('DOMContentLoaded', function() {
            // Añadir el evento click cuando el DOM esté listo
           // addClickListener();

            // Ejemplo de cómo desactivar el evento después de 10 segundos
           // setTimeout(removeClickListener, 10000); // Desactiva el evento después de 10 segundos
        });
*/


function ejemplo() {
    document.getElementById("inputArtista").value = "fito paez"
    document.getElementById("inputCancion").value = "11 y 6"
    buscar();
}


function buscar() {
    // Adquiere el input de entrada
    inputArtista = document.getElementById("inputArtista").value;
    console.log("inputArtista = " + inputArtista);

    inputCancion = document.getElementById("inputCancion").value;
    console.log("inputCancion = " + inputCancion);

    ////////////////////////////////////////////////////////

    // URL de la API a la que se desea consultar
    var apiUrl = 'https://api.lyrics.ovh/v1/artist/title';

    //adecuando los parametro de entrada de la pagina con
    //los requisitos de sintaxis de la userSelect: 

    apiUrl = 'https://api.lyrics.ovh/v1/' + inputArtista + '/' + inputCancion; 

    console.log(apiUrl);

    // Hacer una solicitud GET a la API
    fetch(apiUrl)
        .then(response => {
            // Verificar si la respuesta es correcta 
            if (!response.ok) {
                throw new Error('Error :' + response.statusText);
            }
            // Convertir la respuesta en formato JSON
            return response.json();
        })
        .then(data => {
            // Manejar los datos obtenidos
            console.log('Datos obtenidos:', data);

            // se ajusta el texto 
            //let text = JSON.stringify(data.lyrics);

            // El texto que queremos procesar
            let text = data.lyrics;
            //console.log(text);


            // elimina los simbolos('\r\n');
            let parrafos = "";

            parrafos = text.replace(/\r/g, '').replace(/\n/g, '<br>');

            parrafos = text.split(',')

            console.log("aqui= " + parrafos);

            // Selecciona el contenedor donde se mostrarán los párrafos
            const contenedor = document.getElementById('contenido');

            contenedor.innerHTML = ''; // Limpia el contenido previo

            // Crea un div para cada párrafo y lo agrega al contenedor

            parrafos.forEach(parrafo => {

                if (parrafo.trim() !== '') { // Evita agregar párrafos vacíos
                    const div = document.createElement('div');
                    div.className = 'alert alert-warning text-center'; // Clase para estilizar el div
                    div.textContent = parrafo; // Asigna el texto al div
                    contenedor.appendChild(div); // Agrega el div al contenedor
                }
            });

            ////////////////////////////////////////////////


        })
        .then(() => {
            // alert('aqui');

            //limpiarCamposEntrada();

           // alternadorBooleano = true;

           addClickListener();
        })
        .catch(error => {
            // Manejar errores en caso de que ocurran
            console.error('Hubo un problema con la solicitud Fetch:', error);
        });

    ////////////////////////////////////////////////////////

    console.log("fin");

}




// Función para configurar el evento click en los inputs
function limpiarCamposEntrada() {
 
    document.getElementById("inputArtista").value = ""
    document.getElementById("inputCancion").value = ""

    // Selecciona el contenedor donde se mostrarán los párrafos
    const contenedor = document.getElementById('contenido');
    contenedor.innerHTML = ''; // Limpia el contenido previo
 
}
 
 