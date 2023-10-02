/*
        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries
      
        // Your web app's Firebase configuration
        const firebaseConfig = {
          apiKey: "AIzaSyDB_oNjKWo0Z6P-SXFrlmrpQ-Cl1u-De3A",
          authDomain: "tgfatec-4d40d.firebaseapp.com",
          databaseURL: "https://tgfatec-4d40d-default-rtdb.firebaseio.com",
          projectId: "tgfatec-4d40d",
          storageBucket: "tgfatec-4d40d.appspot.com",
          messagingSenderId: "252926034214",
          appId: "1:252926034214:web:f07523455ac9e16ed641e7"
        };
      
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
*/

// Iniciar o projeto Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDB_oNjKWo0Z6P-SXFrlmrpQ-Cl1u-De3A",
  authDomain: "tgfatec-4d40d.firebaseapp.com",
  projectId: "tgfatec-4d40d",
});

// Iniciar Firestone
var db = firebase.firestore();

// Criar uma nova viagem
// Colocar preço, local, foto, ramo (festival, praia, esportes radiacais), data ida e volta e horario
function criarViagem(){
  var titulo = document.getElementById('titulo').value;
  var descricao = document.getElementById('descricao').value;
  var qtdeVagas = document.getElementById('qtdeVagas').value;

  db.collection("viagens").add({
      titulo: titulo,
      descricao:  descricao,
      qtdeVagas: qtdeVagas
  })
  .then(function(docRef) {
      console.log("ID salvo: ", docRef.id);
      // Limpar os campos
      document.getElementById('titulo').value = '';
      document.getElementById('descricao').value = '';
      document.getElementById('qtdeVagas').value = '';
  })
  .catch(function(error) {
      console.error("Erro: ", error);
  });
}

// Mostrar viagens criadas
var tabelaViagens = document.getElementById('tabelaViagens');
db.collection("viagens").onSnapshot((querySnapshot) => {
    tabelaViagens.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`ID: ${doc.id} | Título: ${doc.data().titulo}`);
        tabelaViagens.innerHTML += `<tr>
            <th scope="row">${doc.id}</th>
            <td>${doc.data().titulo}</td>
            <td>${doc.data().descricao}</td>
            <td>${doc.data().qtdeVagas}</td>
            <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
            <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().titulo}','${doc.data().descricao}','${doc.data().qtdeVagas}')">Editar</button></td>
          </tr>`
    });
});

// Excluir viagem
function eliminar(id){
  const resposta = window.confirm(`Excluir viagem: ${id}?`)
    if (resposta === true) {
    db.collection("viagens").doc(id).delete().then(function() {
        console.log("Viagem excluida");
    }).catch(function(error) {
        console.error("Erro ao remover: ", error);
    });
  } else {
    return console.log("Operação cancelada");
  }
}

// Editar viagem criada
function editar(id,titulo,descricao,qtdeVagas){

document.getElementById('titulo').value = titulo;
document.getElementById('descricao').value = descricao;
document.getElementById('qtdeVagas').value = qtdeVagas;

var boton = document.getElementById('boton');
boton.innerHTML = 'Editar';

boton.onclick = function(){

  var viagemRef = db.collection("viagens").doc(id);

  var titulo = document.getElementById('titulo').value;
  var descricao = document.getElementById('descricao').value;
  var qtdeVagas = document.getElementById('qtdeVagas').value;

    return viagemRef.update({
      titulo: titulo,
      descricao: descricao,
      qtdeVagas: qtdeVagas
    })
    .then(function() {
        console.log(`${id} editado com sucesso`);
        // Limpa os campos após a edição
        boton.innerHTML = 'Salvar';
        boton.onclick = criarViagem;
        document.getElementById('titulo').value = '';
        document.getElementById('descricao').value = '';
        document.getElementById('qtdeVagas').value = '';
    })
    .catch(function(error) {
        console.error("Erro: ", error);
    });


}

}