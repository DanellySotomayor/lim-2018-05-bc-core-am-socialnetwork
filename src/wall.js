//CRUD: Create Reade Update Delete
firebase.initializeApp({
  apiKey: "AIzaSyDBi3SO4pgUpX4urYoutax2V5NINLab8go",
  authDomain: "femme-18162.firebaseapp.com",
  projectId: "femme-18162"
});

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

//Agregar documentos
function guardar() {
 console.log('crearrrr');
 
  if (nombre.value !== '') {
    let nombre = document.getElementById('nombre').value;

    db.collection("users").add({
      first: nombre,
    })
      .then(function (docRef) {
        
        document.getElementById('nombre').value = '';
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  } else {
    alert('Se olvido de escribir un Post')
  }

}

//Leer documentos
const tabla = document.getElementById('tabla');
db.collection("users").onSnapshot((querySnapshot) => {
  tabla.innerHTML = '';
  querySnapshot.forEach((doc) => {
    
    tabla.innerHTML += `
      <div> 
      <br><br>
      <p class="font-weight-bold lead caja-post">${doc.data().first}</p>
        <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true"
        aria-expanded="false">
        <i class="fas fa-ellipsis-h"></i>
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
          <button class="dropdown-item btn-sm" type="button"  onclick="editar('${doc.id}','${doc.data().first}')"><i class="fas fa-pen"></i>Editar</button>
          <button class="dropdown-item btn-sm" type="button" onclick="eliminar('${doc.id}')"><i class="fas fa-trash-alt"></i>Eliminar</button>
        </div>
        <button type="button" onclick= "contador()" id="likes"><i class="fas fa-heart"></i> Like</button>
      </div>
      `
  });
});

//Borrar documentos
function eliminar(id) {
  console.log('elimando' , id);
  
  db.collection("users").doc(id).delete().then(function () {
    
  }).catch(function (error) {
    console.error("Error removing document: ", error);
  });

  const boton = document.getElementById('boton');
  boton.onclick = guardar
}

//Editar documentos
function editar(id, nombre) {
  console.log('editando', id)
  document.getElementById('nombre').value = nombre;

  const boton = document.getElementById('boton');
  boton.innerHTML = 'Guardar';
  boton.onclick = function () {
    const usersRef = db.collection("users").doc(id);
    // Set the "capital" field of the city 'DC'
    let nombre = document.getElementById('nombre').value;

    return usersRef.update({
      first: nombre,
    })
      .then(function () {
       
        boton.innerHTML = 'Publicar';
        document.getElementById('nombre').value = '';
        boton.onclick = guardar

      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }
}
 //Contar los likes

function contador() {
  const likes = document.getElementById('likes')
  console.log(likes);
  likes.addEventListener('click',(event)=>{
    let cont = 0;
    if (event.target !== 1 ) {
      cont--
    } else if (event.target === 1) {
      cont++
    }
    console.log(cont);
    return cont;
  })

}

//cerrar sesion
function cerrar() {
  firebase.auth().signOut()
      .then(function () {
          console.log('Saliendo...');
          window.location.href = 'index.html';
      })
      .catch(function (error) {
          console.log(error);
      })
}