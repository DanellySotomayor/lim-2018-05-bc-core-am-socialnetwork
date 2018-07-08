
const buttonRegister = document.getElementById('buttonRegister');
buttonRegister.addEventListener('click', e => {
    e.preventDefault()
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
    });
});

const buttonLogin = document.getElementById('buttonLogin');
buttonLogin.addEventListener('click', e => {
    e.preventDefault()
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
    });
});

function observer (){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
        console.log("Existe usuario activo")
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // ...
        } else {
        console.log("No existe usuario activo")
        }
      });
}

observer();

function messageActiveUser(){
    const content = document.getElementById("content");
    content.innerHTML = "Solo lo ve el usuario activo";
}