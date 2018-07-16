//CRUD: Create Reade Update Delete

firebase.initializeApp({
    apiKey: "AIzaSyDBi3SO4pgUpX4urYoutax2V5NINLab8go",
    authDomain: "femme-18162.firebaseapp.com",
    projectId: "femme-18162"
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

//Leer documentos
const tabla = document.getElementById('tabla');
db.collection("users").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`);
        tabla.innerHTML += `
        <tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.data().first}</td>
        <td>${doc.data().last}</td>
        <td>${doc.data().born}</td>
        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().born}')">Editar</button></td>
      </tr>
      `
    });
});

//Borrar documentos
function eliminar(id) {
    db.collection("users").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}

//Editar documentos
function editar(id, nombre, apellido, fecha) {
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('fecha').value = fecha;

    const boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';

    boton.onclick = function () {
        const usersRef = db.collection("users").doc(id);
        // Set the "capital" field of the city 'DC'

        let nombre = document.getElementById('nombre').value;
        let apellido = document.getElementById('apellido').value;
        let fecha = document.getElementById('fecha').value;

        return usersRef.update({
            first: nombre,
            last: apellido,
            born: fecha
        })
            .then(function () {
                console.log("Document successfully updated!");
                boton.innerHTML = 'Guardar';
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }
}



