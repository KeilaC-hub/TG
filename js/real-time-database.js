

var usersList = document.getElementById('usersList');
var nameInput = document.getElementById('nameInput');
var idadeInput = document.getElementById('idadeInput');
var addButton = document.getElementById('addButton');

addButton.addEventListener('click', function() {
    create(nameInput.value, idadeInput.value)
});

function testeUser(name, idade) {
    firebase.database().ref('users/' + name).set({
        name: name,
        idade: idade,
    });
}

/*
function create(name, idade) {
    var data = {
        name: name,
        idade: idade,
    }
    return firebase.database().ref().child('users').push(data);
}

firebase.database().ref('users').on('value', function (snapshot) {
    usersList.innerHTML = '';
    snapshot.forEach(function(item){
        var li = document.getElementById('li');
        li.appendChild(document.createTextNode(item.val().name + ': ' + item.val().idade));
        usersList.appendChild(li);
    })
})
*/