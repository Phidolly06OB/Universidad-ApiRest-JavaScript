const url = "https://vermenmasterchief.tk/estudiantes.php"


document.addEventListener('DOMContentLoaded', getData())

async function getData(){
    const response = await fetch(url);
    const result = await response.json();
    console.log(result.datos);
    showStudiantes(result.datos)
}

function showStudiantes(datos){
    datos.forEach(datos =>{
        
        const {cedula, nombre, programa, sexo, jornada, id_usuario} = datos
        const tabla = document.createElement('tr')
        tabla.innerHTML = `
        <th scope="row" >${cedula}</th>
        <td>${nombre}</td>
        <td>${programa}</td>
        <td>${sexo}</td>
        <td>${jornada}</td>
        <button type="button" class="btn btn-info text-light" onclick="showDetalles('${id_usuario}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Detalles
        </button>
        
`
        document.querySelector('.contenido').appendChild(tabla)
    })
}

function showDetalles(id){
    const url2 = `https://vermenmasterchief.tk/detalleEstudiante.php?api_key=Metallica&id_usuario=${id}`
    fetch(url2)
    .then(resultado =>{
        return resultado.json()
    })
    .then(resultado =>{
        console.log(resultado.datos[0]);
        limpiar()
        showModal(resultado)
    })
}


function showModal(resultado){
    let prome = resultado.datos[0].promedio
    if(prome >= 3){
        const {datos} = resultado
    const dato = document.createElement('div')
    dato.classList.add('infoMO')
    dato.innerHTML = `
    <img src="${datos[0].foto}" alt="">
    <div class="contenidoo">
    <h2>Promedio del Estudiante</h2>
   
        <p>${datos[0].promedio}</p>
        <p style="color: grey;">Aprobado</p>
    </div>
    `

    document.querySelector('.modal-body').appendChild(dato)
    }
    else if(prome <= 3){
        const {datos} = resultado
    const dato = document.createElement('div')
    dato.classList.add('infoMO')
    dato.innerHTML = `
    <img src="${datos[0].foto}" alt="">
    <div class="contenidoo">
    <h2>Promedio del Estudiante</h2>

        <p>${datos[0].promedio}</p>
        <p style="color: red;">No aprobo</p>
    </div>
    `

    document.querySelector('.modal-body').appendChild(dato)
    }
    
} 

function limpiar(){
    const limp = document.querySelector('.modal-body')
    limp.innerHTML = ``
}









