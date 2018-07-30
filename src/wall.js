const btnPublicar = document.getElementById('btnPublicar');
const perfil = document.getElementById('perfil');
const tabla = document.getElementById('tabla');

const statusPost = document.getElementById('statusPost');



//CRUD: Create Reade Update Delete
firebase.initializeApp({
  apiKey: "AIzaSyDBi3SO4pgUpX4urYoutax2V5NINLab8go",
  authDomain: "femme-18162.firebaseapp.com",
  projectId: "femme-18162"
});

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

//Agregar documentos
const guardar = () => {
  console.log('crearrrr');
  if (post.value !== '') {
    let post = document.getElementById('post').value;
    db.collection("users").add({
      first: post,
      uidUser: localStorage.getItem('userUID'),
      name: localStorage.getItem('email'),
      likes: 1,
      public: statusPost.value,
      createdAt: new Date()
    })
      .then((docRef) => {
        document.getElementById('post').value = '';
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    postPrivado();
  } else {
    alert('Se olvido de escribir un Post')
  }
}

//Leer documentos
const postPrivado = () => {
  const tabla = document.getElementById('tabla');
  db.collection("users").where("public", "==", 'Privado').onSnapshot((querySnapshot) => {
    let contenido = '';
    querySnapshot.forEach((doc) => {
      contenido += `
    <div class="card publish-content" id="${doc.id}">
      <div class="card-content">
        <span class="card-title">${doc.data().name}</span>
        <p class="caja-post">${doc.data().first}</p>
      </div>
      <div class="card-action">
       <a class="waves-effect waves-light btn indigo accent-1" onclick="editar('${doc.id}','${doc.data().first}')"><i class="fas fa-pen"></i>Editar</a>
       <a class="waves-effect waves-light btn indigo accent-1" onclick="eliminar('${doc.id}')"><i class="fas fa-trash-alt"></i>Eliminar</a>
      </div>
      <div class="col s12 m6 l4 valign-wrapper">
       <button class="likes-button" type="button" onclick = "incLikes('${doc.id}', '${doc.data().likes}')" ><i class="fas fa-heart"></i> Like  <span class="likes"></span></button>
      </div>
    </div>
      `
    });
    tabla.innerHTML = contenido
  });
}

//Borrar documentos
const eliminar = (id) => {
  console.log('elimando', id);
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
      localStorage.removeItem('photo')
      localStorage.removeItem('nombre')
      localStorage.removeItem('email')
      window.location.href = 'index.html';
    })
    .catch((error) => {
      console.log(error);
    })
}

//Mostrar el perfil de usuario
const mostrarPerfil = () => {
  if (localStorage.getItem('photo') === 'null' && localStorage.getItem('nombre') === 'null') {
    perfil.innerHTML += `
   <h3>Mi Perfil</h3>
   <picture><img src="../img/Captura.PNG" alt="fotoperfil"></picture>
  
   <div>
     <ul class="list-group list-group-flush">
       <li class="list-group-item list-group-item-secondary">Usuarix <i class="far fa-laugh-beam"></i> </li>
       <li class="list-group-item list-group-item-success">${localStorage.getItem('email')}</li>
     </ul>
   </div>
  `
  } else {
    perfil.innerHTML += `
   <h3>Mi Perfil</h3>
   <picture><img src="${localStorage.getItem('photo')}" alt="fotoperfil"></picture>

   <div>
     <ul class="list-group list-group-flush">
        <li class="list-group-item list-group-item-secondary">${localStorage.getItem('nombre')}</li>
       <li class="list-group-item list-group-item-success">${localStorage.getItem('email')}</li>
     </ul>
   </div>
 `
  }
}
mostrarPerfil();
postPrivado();

//Contador de likes
const incLikes = (id, likes) => {
  db.collection("users").doc(id).update({
    likes: parseInt(likes) + 1
  }).then(() => {
    const btnLikes = document.querySelector('#' + id + ' .likes');
    let numLike = likes
    //  console.log(numLike)
    btnLikes.innerHTML += numLike;
  })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });

}