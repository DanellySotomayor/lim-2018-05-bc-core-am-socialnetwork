//CRUD: Create Reade Update Delete

firebase.initializeApp({
    apiKey: "AIzaSyDBi3SO4pgUpX4urYoutax2V5NINLab8go",
    authDomain: "femme-18162.firebaseapp.com",
    projectId: "femme-18162",
});

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

//Agregar documentos
function guardar() {
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let fecha = document.getElementById('fecha').value;
    db.collection("users").add({
        first: nombre,
        last: apellido,
        born: fecha
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById('nombre').value = '';
            document.getElementById('apellido').value = '';
            document.getElementById('fecha').value = '';
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}