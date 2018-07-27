firebase.initializeApp({
  apiKey: "AIzaSyDBi3SO4pgUpX4urYoutax2V5NINLab8go",
  authDomain: "femme-18162.firebaseapp.com",
  projectId: "femme-18162"
});

const db = firebase.firestore();

const postPublico = () => {
  const tablaPublica = document.getElementById('tablaPublica');
  db.collection("users").where("public", "==", 'Publico').onSnapshot((querySnapshot) => {
    let contenido = '';
    querySnapshot.forEach((doc) => {
      contenido += `
    <div id="${doc.id}">
    <br>
    <p class="font-weight-bold lead caja-post">${doc.data().first}</p>
    <button  type="button" onclick = "incLikes('${doc.id}', '${doc.data().likes}')" ><i class="fas fa-heart"></i> Like  <span class="likes"></span></button>
  </div>
      `
    });
    tablaPublica.innerHTML = contenido
  });
}

postPublico();