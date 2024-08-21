//Moisés Oliveira Desenvolvedor WEB
const firebaseConfig = {
    apiKey: "AIzaSyDdvG6Mqa1au91aD5CD_6940eItrU5eQQI",
    authDomain: "luthieria-oliveira-28e69.firebaseapp.com",
    projectId: "luthieria-oliveira-28e69",
    storageBucket: "luthieria-oliveira-28e69.appspot.com",
    messagingSenderId: "803680100823",
    appId: "1:803680100823:web:f3fb0eaadb86f159c92b92"
};


firebase.initializeApp(firebaseConfig);


const auth = firebase.auth();


const loginForm = document.querySelector("#FormLogin");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); 

   
    const email = document.querySelector("#Email").value;
    const password = document.querySelector("#Senha").value;

    if (email && password) {
       
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                
                alert("Login realizado com sucesso!");
                window.location.href = "dashboard.html";
            })
            .catch((error) => {
                
                alert("Erro: " + error.message);
            });
    } else {
        alert("Por favor, preencha ambos os campos.");
    }
});
