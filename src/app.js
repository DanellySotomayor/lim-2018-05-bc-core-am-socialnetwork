const backToLoginA = document.getElementById('goLogin');
const createAccountA = document.getElementById('createAccount');
const registerA = document.getElementById('register');
const loginA = document.getElementById('iniciar');
const btnFacebookA = document.getElementById('facebook');
const btnGoogleA = document.getElementById('gmail');
const closeModalA = document.getElementById('close-register');
const recoverPasswordA = document.getElementById('forgot-password');

//Función para registrar
const register = () => {
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
    });
}

//Función para loggear
const login = () => {
  const email2 = document.getElementById('email2').value;
  const password2 = document.getElementById('password2').value;

  firebase.auth().signInWithEmailAndPassword(email2, password2)
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
}

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


const googleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
     window.location = 'wall.html' //Url aqui
    }).catch(error => {
      console.error(error);
    });
}

const facebookLogin = () => {
  const providerfb = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(providerfb)
    .then((result) => {
      console.log(result);
      window.location = 'wall.html' //Url aqui
    }).catch(error => {
      console.error(error);
    });
}

//mostrar u ocultar inicio de sesión y registro
const createAccount = () => {
  console.log('hola');
  document.getElementById('register-form').style.display = 'block';
  document.getElementById('form-signin').style.display = 'none';
}

const backToLogin = () => {
  document.getElementById('form-signin').style.display = 'block';
  document.getElementById('register-form').style.display = 'none';
}

// closeModal.addEventListener('click', () => {
//   document.getElementById('exampleModal').style.display = 'none';
// })

const recoverPassword = () => {
	let auth = firebase.auth();
	let emailAddress = document.getElementById('email2').value;

	auth.sendPasswordResetEmail(emailAddress)
		.then(function () {
			alert('Se ha enviado un correo a su cuenta. Por favor, sigue los pasos indicados.');
		}, function (error) {
		console.log(error)
		})
}

backToLoginA.addEventListener("click", () => backToLogin());
createAccountA.addEventListener("click", () => createAccount()); 
registerA.addEventListener("click", () => register());
loginA.addEventListener("click", () => login());
btnFacebookA.addEventListener("click", () => facebookLogin());
btnGoogleA.addEventListener("click", () => googleLogin());
closeModalA.addEventListener("click", () => closeModal());
recoverPasswordA.addEventListener("click", () => recoverPassword());