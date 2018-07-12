//Función para registrar
function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log("Datos registrados correctamente");

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function () {
            verify();
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
}

//Función para loggear
function login() {
    const email2 = document.getElementById('email2').value;
    const password2 = document.getElementById('password2').value;

    firebase.auth().signInWithEmailAndPassword(email2, password2)
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
}

//Observador valida si el usuario está activo o no
function observer() {
    firebase.auth().onAuthStateChanged(function (user) {
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
            contenido.innerHTML = `
            `;
        }
    });
}
observer();

//Mensaje para usuario activo
function messageForUser(user) {
    var user = user;
    const contenido = document.getElementById('contenido');
    if (user.emailVerified) {
        contenido.innerHTML = `
    <div class="container mt-5">
        <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">Bienvenid@! ${user.email}</h4>
        <p>En esta red social podrás conocer a más feministas como tú, podrás asesorarte, brindar y recibir apoyo de la comunidad en tu país.</p>
        <hr>
        <p class="mb-0">FEMINISM IS FOR EVERYONE</p>
        </div>
        <button class="btn btn-danger" id="cerrar" onclick="cerrar()">Cerrar Sesion</button>
    </div>
    `;
    }
}

function cerrar() {
    firebase.auth().signOut()
        .then(function () {
            console.log('Saliendo...');
        })
        .catch(function (error) {
            console.log(error);
        })
}

function verify() {
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function () {
        console.log("Enviando correo.....")
        // Email sent.
    }).catch(function (error) {
        // An error happened.
        console.log(error)
    });
}

const buttonFacebook = document.getElementById('facebook');
const buttonGmail = document.getElementById('gmail');

buttonFacebook.addEventListener('click', e => {
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');
    firebase.auth().signInWithPopup(provider).then(function (result) {
        const token = result.credential.accessToken;
        const user = result.user;
    }).catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        let email = error.email;
        let credential = error.credential;
      });
});

buttonGmail.addEventListener('click', e => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().signInWithPopup(provider).then(function (result) {
        const token = result.credential.accessToken;
        const user = result.user;
    }).catch(error => {
        let errorCode = error.code;
        let errorMessage = error.message;
        let email = error.email;
        let credential = error.credential;
    });
});