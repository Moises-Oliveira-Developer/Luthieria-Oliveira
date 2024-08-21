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
const db = firebase.firestore();
const storage = firebase.storage();

document.addEventListener("DOMContentLoaded", function() {
    const profileImageInput = document.querySelector("#ProfileImage");
    const profileImagePreview = document.querySelector("#profileImagePreview");

    profileImageInput.addEventListener("change", function() {
        const file = profileImageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImagePreview.src = e.target.result;
                profileImagePreview.style.display = "block";
            }
            reader.readAsDataURL(file);
        }
    });

    document.querySelector("#RegisterButton").addEventListener("click", function() {
        let Email = document.querySelector("#EmailUser").value;
        let Password = document.querySelector("#SenhaUser").value;
        let NameUser = document.querySelector("#NomeUser").value;
        let Phone = document.querySelector("#TelUser").value;
        let ProfileImage = document.querySelector("#ProfileImage").files[0];

        auth.createUserWithEmailAndPassword(Email, Password)
        .then((userCredential) => {
            let user = userCredential.user;
            console.log("Usuário registrado:", user);

            if (ProfileImage) {
                const storageRef = storage.ref();
                const profileImageRef = storageRef.child('profileImages/' + user.uid + '.jpg');

                profileImageRef.put(ProfileImage).then((snapshot) => {
                    return snapshot.ref.getDownloadURL();
                }).then((downloadURL) => {
                    console.log('Imagem de perfil carregada com sucesso:', downloadURL);

                    return db.collection("Usuarios").doc(user.uid).set({
                        nome: NameUser,
                        telefone: Phone,
                        email: Email,
                        fotoPerfil: downloadURL
                    });
                }).then(() => {
                    console.log("Dados pessoais e foto de perfil salvos com sucesso!");
                    window.location.href = 'dashboard.html';
                }).catch((error) => {
                    console.error("Erro ao salvar os dados:", error);
                });
            } else {
                db.collection("Usuarios").doc(user.uid).set({
                    nome: NameUser,
                    telefone: Phone,
                    email: Email
                }).then(() => {
                    console.log("Dados pessoais salvos com sucesso!");
                    window.location.href = 'dashboard.html';
                }).catch((error) => {
                    console.error("Erro ao salvar os dados:", error);
                });
            }
        }).catch((error) => {
            console.error("Erro ao registrar usuário:", error.message);
        });
    });
});


