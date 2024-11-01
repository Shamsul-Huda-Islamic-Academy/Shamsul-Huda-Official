const { response } = require("express")

document.addEventListener('DOMContentLoaded',()=>{
    const submit = document.getElementById('submit')
    const emailInput = document.getElementById('emailInput')
    const passwordInput = document.getElementById('passwordInput')
    const errorInput = document.getElementById('error')

    submit.addEventListener('click',(event)=>{
        event.preventDefault()
        const data = {
            Email : emailInput.value,
            password : passwordInput.value
        }

        axios.post('/admin/login',data)
        .then((response)=>{
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                window.location.href = "/admin/dashboard";
            } else {
                console.error("No token found in response data");
            }
        })
        .catch((error)=>{
            console.error(error.response);
            if(error.response && error.response.status === 403){
                errorInput.type = 'text'
                errorInput.value = error.response.data.message || 'Invalid creditionals, please try again.'
            }
            else{
                console.error("An unexpected error occured",error.response || error);
                errorInput.type = 'text'
                errorInput.value = 'An unexpected error occured, please try again'
                
            }
        })
    })
})