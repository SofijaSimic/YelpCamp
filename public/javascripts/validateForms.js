// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'

    bsCustomFileInput.init()

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.validated-form')
    // it is looking for a class .validated-form, to then add the validation logic (below)
    // (we should turn off validation on forms with novalidate, and add validation-form, 
    // for bootstrap to take over)

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()