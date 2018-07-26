const inicioSesion = document.getElementById('goLogin');
const crear = document.getElementById('register2');
const register = document.getElementById('register');
const login = document.getElementById('iniciar');
const btnFacebook = document.getElementById('facebook');
const btnGoogle = document.getElementById('gmail');
const closeModal = document.getElementById('close-register');
const recoverPassword = document.getElementById('forgot-password');

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
    });
})

//Observador valida si el usuario está activo o no
const observer = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user);
      
      console.log("******************");
      console.log(user.emailVerified);
      console.log("******************");
      console.log("Si existe usuario activo")
      messageForUser(user);
      //  User is signed in. "user es un objeto"
      localStorage.setItem('nombre' , user.displayName);
      localStorage.setItem('email' , user.email);
      localStorage.setItem('photo' , user.photoURL);
      localStorage.setItem('userUID' , user.uid);
    } else {
      // User is signed out.
      console.log("No existe usuario activo")
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
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
     window.location = 'wall.html' //Url aqui
    }).catch(error => {
      console.error(error);
    });
})

btnFacebook.addEventListener('click', () => {
  const providerfb = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(providerfb)
    .then((result) => {
      console.log(result);
      window.location = 'wall.html' //Url aqui
    }).catch(error => {
      console.error(error);
    });
})

//mostrar u ocultar inicio de sesión y registro
crear.addEventListener('click', () => {
  document.getElementById('register-form').style.display = 'block';
  document.getElementById('form-signin').style.display = 'none';
})
inicioSesion.addEventListener('click', () => {
  document.getElementById('form-signin').style.display = 'block';
  document.getElementById('register-form').style.display = 'none';
})

// closeModal.addEventListener('click', () => {
//   document.getElementById('exampleModal').style.display = 'none';
// })


recoverPassword.addEventListener('click', () => {
	let auth = firebase.auth();
	let emailAddress = document.getElementById('email2').value;

	auth.sendPasswordResetEmail(emailAddress)
		.then(function () {
			alert('Se ha enviado un correo a su cuenta. Por favor, sigue los pasos indicados.');
		}, function (error) {
		console.log(error)
		})
})
