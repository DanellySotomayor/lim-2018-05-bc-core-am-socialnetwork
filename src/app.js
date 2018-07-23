const inicioSesion = document.getElementById('goLogin');
const crear = document.getElementById('register2');
const register = document.getElementById('register');
const login = document.getElementById('iniciar');
const btnFacebook = document.getElementById('facebook');
const btnGoogle = document.getElementById('gmail');

//Función para registrar
register.addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  console.log("Datos registrados correctamente");
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      verify();
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      alert
    });
})

//Función para loggear
login.addEventListener('click', () => {
  const email2 = document.getElementById('email2').value;
  const password2 = document.getElementById('password2').value;

  firebase.auth().signInWithEmailAndPassword(email2, password2)
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
})


//Observador valida si el usuario está activo o no
const observer = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("Si existe usuario activo")
      messageForUser(user);
      // User is signed in. "user es un objeto"
      var displayName = user.displayName;
      var email = user.email;
      console.log("******************");
      console.log(user.emailVerified);
      console.log("******************");

      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
    } else {
      // User is signed out.
      console.log("No existe usuario activo")
      // contenido.innerHTML = `
      // `;
    }
  });
}
observer();
//Mensaje para usuario activo
const messageForUser = (user) => {
  var user = user;
  // const contenido = document.getElementById('contenido');
  if (user.emailVerified) {

    login.addEventListener('click', event => {
      console.log(event.target);
      window.location.href = 'wall.html';
    })
  }
  //     contenido.innerHTML = `
  // <div class="container mt-5" id="root">
  //     <div class="alert alert-success" role="alert">
  //     <h4 class="alert-heading">Bienvenid@! ${user.email}</h4>
  //     <p>En esta red social podrás conocer a más feministas como tú, podrás asesorarte, brindar y recibir apoyo de la comunidad en tu país.</p>
  //     <hr>
  //     <p class="mb-0">FEMINISM IS FOR EVERYONE</p>
  //     </div>
  //     <login class="btn btn-danger" id="cerrar" onclick="cerrar()">Cerrar Sesion</login>
  // </div>
  // `;

}
const verify = () => {
   user = firebase.auth().currentUser;
  user.sendEmailVerification().then(() => {
    console.log("Enviando correo.....")
    // Email sent.
  }).catch((error) => {
    // An error happened.
    console.log(error)
  });
}

btnGoogle.addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
    .signInWithPopup(provider)
    .then(function (result) {
      window.location = 'wall.html' //Url aqui
    }).catch(error => {
      console.error(error);

    });
})

btnFacebook.addEventListener('click' , () => {
  const providerfb = new firebase.auth.FacebookAuthProvider();
  firebase.auth()
  .signInWithPopup(providerfb)
  .then((result) => {
    window.location = 'wall.html' //Url aqui
  }).catch(error => {
    console.error(error);
  });
})

//mostrar u ocultar inicio de sesión y registro
crear.addEventListener('click' ,() => {
  $('#register-form').show();
  $('#form-signin').hide();
})
inicioSesion.addEventListener('click' , () => {
  $('#form-signin').show();
  $('#register-form').hide();
})
