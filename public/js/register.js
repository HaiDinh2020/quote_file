// register
$(document).ready(function () {
    $('#register-form').submit(function(event) {
        event.preventDefault(); 
        
        var formData = {
            username: $('input[name="username"]').val(),
            email: $('input[name="email"]').val(),
            password: $('input[name="password"]').val()
        };

        console.log(formData)
        $.ajax({
            type: 'POST',
            url: '/register', 
            data: formData,
            success: function(response) {
                window.location.href = "/login"
            },
            error: function(xhr, status, error) {
                
                $('#error-message').html( xhr.responseJSON.message);
            }
        });
    });
})