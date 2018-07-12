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

const buttonGmail = document.getElementById('gmail');
const buttonFacebook = document.getElementById('facebook');

buttonGmail.addEventListener('click', e => {
    loginGmail();
})

buttonFacebook.addEventListener('click', e => {
    loginFacebook();
})

const loginGmail = () => {
    if (!firebase.auth().currentUser) {
        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithPopup(provider)
            .then(function (result) {
                let token = result.credential.accesstoken;
                let user = result.user;
                const name = result.user.displayName;
                showGreeting(user);
                console.log(user);


            })
            .catch(function (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                const errorEmail = error.email;
                const credential = error.credential;
                if (errorCode === 'auth/account-exits-with-different-credential') {
                    alert('Es el mismo usuario');
                }
            });
    } else {
        firebase.auth().signOut();
    }
}

const loginFacebook = () => {
    if (!firebase.auth().currentUser) {
        let provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('public_profile');
        firebase.auth().signInWithPopup(provider)
            .then(function (result) {
                let token = result.credential.accesstoken;
                let user = result.user;
                showGreeting(user);
                console.log(user);

            })
            .catch(function (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                const errorEmail = error.email;
                const credential = error.credential;
                if (errorCode === 'auth/account-exits-with-different-credential') {
                    alert('Es el mismo usuario');
                }
            });
    } else {
        firebase.auth().signOut();
    }
}