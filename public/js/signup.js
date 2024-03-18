// signup.js
document.addEventListener("DOMContentLoaded", function() {
    const signUpForm = document.getElementById('signUpForm');

    signUpForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                console.log('Signed up as:', user.email);
                // Redirect to another page or perform any other action
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error signing up:', errorMessage);
            });
    });
});
