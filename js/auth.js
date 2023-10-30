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

  var db = firebase.firestore();

        const cadastroForm = document.getElementById('cadastro-form');
        const cadastroCpf = document.getElementById('cadastro-cpf');
        const cadastroTelefone = document.getElementById('cadastro-telefone');
        const cadastroEmail = document.getElementById('cadastro-email');
        const cadastroSenha = document.getElementById('cadastro-senha');
        const signupButton = document.getElementById('signup-button');

        const loginForm = document.getElementById('login-form');
        const loginEmail = document.getElementById('login-email');
        const loginPassword = document.getElementById('login-password');
        const loginButton = document.getElementById('login-button');

        const message = document.getElementById('message');

        // Função para lidar com o cadastro
        signupButton.addEventListener('click', () => {
            const email = cadastroEmail.value;
            const password = cadastroSenha.value;

            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(userCredential => {
                    const user = userCredential.user;

                    db.collection("users").add({
                        cpf: cadastroCpf,
                        telefone: cadastroTelefone
                      })
                      .then(() => {
                        message.textContent = 'Cadastro realizado com sucesso';
                      })
                      .catch((error) => {
                        console.error("Erro ao armazenar informações adicionais: ", error);
                      });
                    })
                    
                })
                .catch(error => {
                    message.textContent = 'Erro no cadastro: ' + error.message;
                });
        // });

        // Função para lidar com o login
        loginButton.addEventListener('click', () => {
            const email = loginEmail.value;
            const password = loginPassword.value;

            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(userCredential => {
                    message.textContent = 'Login bem-sucedido';
                })
                .catch(error => {
                    message.textContent = 'Erro no login: ' + error.message;
                });
        });