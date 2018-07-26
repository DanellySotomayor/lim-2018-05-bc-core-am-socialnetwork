const postPublico = () => {
    const tabla = document.getElementById('tabla');
    db.collection("users").onSnapshot((querySnapshot) => {
      tabla.innerHTML = '';
      querySnapshot.forEach((doc) => {
    
        tabla.innerHTML += `
          <div id="${doc.id}"> 
          <br>
          <p class="font-weight-bold lead caja-post">${doc.data().first}</p>
            <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
            <i class="fas fa-ellipsis-h"></i>
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
              <button class="dropdown-item btn-sm" type="button"  onclick="editar('${doc.id}','${doc.data().first}')"><i class="fas fa-pen"></i>Editar</button>
              <button class="dropdown-item btn-sm" type="button" onclick="eliminar('${doc.id}')"><i class="fas fa-trash-alt"></i>Eliminar</button>
            </div>
            <button type="button" onclick = "incLikes('${doc.id}', ${doc.data().likes})" class="likes"><i class="fas fa-heart"></i> Like</button>
          </div>
          `
      });
    });
    }