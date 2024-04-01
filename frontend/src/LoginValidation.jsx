// LoginValidation.js
async function Validation(values) {
    let error = {};
    
    if (!values.email.trim()) {
        error.email = "Email should not be empty";
    }

    if (!values.password.trim()) {
        error.password = "Password should not be empty";
    }

    return error;
}

export { Validation };
