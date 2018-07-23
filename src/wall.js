const btnPublicar = document.getElementById('btnPublicar');
const post = document.getElementById('post').value;
//CRUD: Create Reade Update Delete
firebase.initializeApp({
  apiKey: "AIzaSyDBi3SO4pgUpX4urYoutax2V5NINLab8go",
  authDomain: "femme-18162.firebaseapp.com",
  projectId: "femme-18162"
});

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

//Agregar documentos

// btnPublicar.addEventListener('click' , () => {
//   console.log('crearrrr');
//   if (post.value !== '') {
//     let post = document.getElementById('post').value;
//     db.collection("users").add({
//       first: post,
//     })
//       .then(function (docRef) {      
//         document.getElementById('post').value = '';
//       })
//       .catch(function (error) {
//         console.error("Error adding document: ", error);
//       });
//   } else {
//     alert('Se olvido de escribir un Post')
//   }
// })

const guardar = () => {
 console.log('crearrrr');
  if (post.value !== '') {
    let post = document.getElementById('post').value;
    db.collection("users").add({
      first: post,
      uidUser : localStorage.getItem('userUID')
    })
      .then((docRef) => { 
        document.getElementById('post').value = '';
      })
      .catch((error) => {
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
const eliminar = (id) => {
  console.log('elimando' , id);
  db.collection("users").doc(id).delete().then(() => {   
  }).catch((error) => {
    console.error("Error removing document: ", error);
  });
  const boton = document.getElementById('btnPublicar');
  boton.onclick = guardar
}

//Editar documentos
const editar = (id, post) => {
  console.log('editando', id)
  document.getElementById('post').value = post;
  const boton = document.getElementById('btnPublicar');
  boton.innerHTML = 'Guardar';
  boton.onclick = () => {
    const usersRef = db.collection("users").doc(id);
    // Set the "capital" field of the city 'DC'
    let post = document.getElementById('post').value;

    return usersRef.update({
      first: post,
    })
      .then(() => {
        boton.innerHTML = 'Publicar';
        document.getElementById('post').value = '';
        boton.onclick = guardar
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }
}

//cerrar sesion
const cerrar = () => {
  firebase.auth().signOut()
      .then(() => {
          console.log('Saliendo...');
          localStorage.removeItem('userUID')
          window.location.href = 'index.html';
      })
      .catch((error) => {
          console.log(error);
      })
}