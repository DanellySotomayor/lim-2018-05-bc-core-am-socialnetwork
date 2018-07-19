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
            alert
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
            // contenido.innerHTML = `
            // `;
        }
    });
}
observer();

//Mensaje para usuario activo
function messageForUser(user) {
    var user = user;
    // const contenido = document.getElementById('contenido');
    if (user.emailVerified) {
        const button = document.getElementById('iniciar');
        button.addEventListener('click', e => {
            console.log(e.target);
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
    //     <button class="btn btn-danger" id="cerrar" onclick="cerrar()">Cerrar Sesion</button>
    // </div>
    // `;
    
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

const providerfb = new firebase.auth.FacebookAuthProvider();
$('#facebook').click(function(){
  firebase.auth()
    .signInWithPopup(providerfb)
    .then(function(result) {
    window.location = 'wall.html' //Url aqui
    }).catch(error => {
    console.error(error);
    });
});

const provider = new firebase.auth.GoogleAuthProvider();
$('#gmail').click(function(){
    firebase.auth()
    .signInWithPopup(provider)
    .then(function (result) {
    window.location = 'wall.html' //Url aqui
    }).catch(error => {
    console.error(error);
    // console.log(result.user);
    // // $('#gmail').hide();
    // $('#contenido').append("<img src='"+result.user.photoURL+"' />")
    });
});

//mostrar u ocultar inicio de sesión y registro
$('#register').click(function(){
    $('#register-form').show();
    $('#form-signin').hide();
  })
  
  $('#goLogin').click(function(){
    $('#form-signin').show();
    $('#register-form').hide();
  })