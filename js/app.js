// Iniciar o projeto Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDB_oNjKWo0Z6P-SXFrlmrpQ-Cl1u-De3A",
          authDomain: "tgfatec-4d40d.firebaseapp.com",
          databaseURL: "https://tgfatec-4d40d-default-rtdb.firebaseio.com",
          projectId: "tgfatec-4d40d",
          storageBucket: "tgfatec-4d40d.appspot.com",
          messagingSenderId: "252926034214",
          appId: "1:252926034214:web:f07523455ac9e16ed641e7"
});

// Iniciar Banco de dados Firestone
var db = firebase.firestore();

// Parte do administrador
// Criar uma nova viagem
// Colocar, local, foto, ramo (festival, praia, esportes radiacais), data ida e volta e horario
function criarViagem(){
  var titulo = document.getElementById('titulo').value;
  var descricao = document.getElementById('descricao').value;
  var qtdeVagas = document.getElementById('qtdeVagas').value;
  var preco = document.getElementById('preco').value // colocar em number
  var tipo = document.getElementById("tipo").value

  db.collection("viagens").add({
      titulo: titulo,
      descricao:  descricao,
      qtdeVagas: qtdeVagas,
      preco: preco,
      tipo: tipo
  })
  .then(function(doc) {
      console.log("ID salvo: ", doc.id);
      // Limpar os campos
      document.getElementById('titulo').value = '';
      document.getElementById('descricao').value = '';
      document.getElementById('qtdeVagas').value = '';
      document.getElementById('preco').value = '';
      document.getElementById('tipo').value = '';
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
            <td>${doc.data().preco}</td>
            <td><button class="" onclick="eliminar('${doc.id}')">Excluir</button></td>
            <td><button class="" onclick="editar('${doc.id}','${doc.data().titulo}','${doc.data().descricao}','${doc.data().qtdeVagas}', '${doc.data().preco}')">Editar</button></td>
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
function editar(id,titulo,descricao,qtdeVagas, preco){

document.getElementById('titulo').value = titulo;
document.getElementById('descricao').value = descricao;
document.getElementById('qtdeVagas').value = qtdeVagas;
document.getElementById('preco').value = preco;

var boton = document.getElementById('boton');
boton.innerHTML = 'Editar';

boton.onclick = function(){

  var viagemRef = db.collection("viagens").doc(id);

  var titulo = document.getElementById('titulo').value;
  var descricao = document.getElementById('descricao').value;
  var qtdeVagas = document.getElementById('qtdeVagas').value;
  var preco = document.getElementById('preco').value;

    return viagemRef.update({
      titulo: titulo,
      descricao: descricao,
      qtdeVagas: qtdeVagas,
      preco: preco
    })
    .then(function() {
        console.log(`${id} editado com sucesso`);
        // Limpa os campos após a edição
        boton.innerHTML = 'Salvar';
        boton.onclick = criarViagem;
        document.getElementById('titulo').value = '';
        document.getElementById('descricao').value = '';
        document.getElementById('qtdeVagas').value = '';
        document.getElementById('preco').value = '';
    })
    .catch(function(error) {
        console.error("Erro: ", error);
    });


}

}

// Usuário reserva a viagem

/*
function reservaViagem() {
  // Precisa recuparar as informações do cadastro: CPF, nome, telefone, e-mail
  var cpf = document.getElementById('cpf').value;
  var nome = document.getElementById('nome').value;
  var telefone = document.getElementById('telefone').value;
  var email = document.getElementById('email').value
db.collection("reservas").add ({
  cpf: cpf,
  nome: nome,
  telefone: telefone,
  email: email
})

}
*/

// Personalizar o ID gerado pelo firebase

