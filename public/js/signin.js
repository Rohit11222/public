// signin.js
document.addEventListener("DOMContentLoaded", function() {
    const signInForm = document.getElementById('signInForm');

    signInForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log('Signed in as:', user.email);
                // Redirect to another page or perform any other action
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error signing in:', errorMessage);
            });
    });
});
