//Función para registrar
const buttonRegister = document.getElementById('buttonRegister');
buttonRegister.addEventListener('click', e => {
    e.preventDefault()
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function (error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
    });
});

//Función para loggear
const buttonLogin = document.getElementById('buttonLogin');
buttonLogin.addEventListener('click', e => {
    e.preventDefault()
    let email2 = document.getElementById('email2').value;
    let password2 = document.getElementById('password2').value;

    firebase.auth().signInWithEmailAndPassword(email2, password2)
    .catch(function (error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
    });
});

function observer(){
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("Existe usuario activo")
            messageActiveUser();
            // User is signed in.
            const displayName = user.displayName;
            const email = user.email;
            const emailVerified = user.emailVerified;
            const photoURL = user.photoURL;
            const isAnonymous = user.isAnonymous;
            const uid = user.uid;
            const providerData = user.providerData;
            // ...
        } else {
            console.log("No existe usuario activo")
        }
    });
}

observer();

function messageActiveUser() {
    const content = document.getElementById("content");
    content.innerHTML = "Este mensaje solo lo ve el usuario activo";
}