firebase.initializeApp({
  apiKey: "AIzaSyDBi3SO4pgUpX4urYoutax2V5NINLab8go",
  authDomain: "femme-18162.firebaseapp.com",
  projectId: "femme-18162"
});

const db = firebase.firestore();

const postPublico = () => {
  const tablaPublica = document.getElementById('tablaPublica');

  db.collection("users").where("public", "==", 'Publico').onSnapshot((querySnapshot) => {
    let contenido = '';
    const userId = firebase.auth().currentUser;
    console.log(userId.uid)
    querySnapshot.forEach((doc) => {
      if(userId.uid === doc.data().uidUser) { 
      contenido += `
      <div class="publish-content" id="${doc.id}">
          <p>${doc.data().name}</p>
          <textarea class="materialize-textarea" id="${'myPost'+doc.id}" disabled>${doc.data().first}</textarea>
          <div class="col s12 m6 l4 valign-wrapper">
           <a class="waves-effect waves-light btn indigo accent-1" onclick="editar('${doc.id}','${doc.data().first}')" id="${'btnEdit'+doc.id}"><i class="fas fa-pen"></i>Editar</a>
           <a class="waves-effect waves-light btn indigo accent-1" onclick="eliminar('${doc.id}')"><i class="fas fa-trash-alt"></i>Eliminar</a>
          </div>
          <div class="col s12 m6 l4 valign-wrapper">
           <button class="likes-button" type="button" onclick = "incLikes('${doc.id}', '${doc.data().likes}')" ><i class="fas fa-heart"></i> Like  <span class="likes"></span></button>
          </div>
        </div>
          `;
      } else {
        contenido += `
        <div class="publish-content" id="${doc.id}">
          <p>${doc.data().name}</p>
          <textarea class="materialize-textarea" id="${'myPost'+doc.id}" disabled>${doc.data().first}</textarea>
          <div class="col s12 m6 l4 valign-wrapper">
           <button class="likes-button" type="button" onclick = "incLikes('${doc.id}', '${doc.data().likes}')" ><i class="fas fa-heart"></i> Like  <span class="likes"></span></button>
          </div>
        </div>
          `;
      }
    });
    tablaPublica.innerHTML = contenido
  });
}

//Borrar documentos
const eliminar = (id) => {
  console.log('elimando', id);
  const alertEliminar = confirm("Se eliminara este post");
  if(alertEliminar === true){
    db.collection("users").doc(id).delete().then(() => {
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }
}

//Editar documentos
const editar = (id, post) => {
  console.log('editando', id)
  const textA = document.getElementById('myPost'+id);
  textA.disabled = false;
  document.getElementById('myPost'+id).value = post;
  const boton = document.getElementById('btnEdit'+id);

  boton.innerHTML = 'Guardar';
  boton.onclick = () => {
  const usersRef = db.collection("users").doc(id);
 
  let post = document.getElementById('myPost'+id).value;
  return usersRef.update({
    first: post,
    })
  .then(() => {
  boton.innerHTML = 'Editar';
  boton.onclick = editar;
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


postPublico();

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
