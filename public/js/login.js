
// login
$(document).ready(function () {
    $('#login-form').submit(function (event) {
        event.preventDefault();

        var formData = {
            email: $('input[name="email"]').val(),
            password: $('input[name="password"]').val()
        };

        console.log(formData)
        $.ajax({
            type: 'POST',
            url: '/login',
            data: formData,
            success: function (response, textStatus, xhr) {
                var token = "bearer " + xhr.getResponseHeader('Authorization');
                var isAdmin = response.isAdmin;
                localStorage.setItem('token', token);
                localStorage.setItem('isAdmin', isAdmin)
                window.location.href = "/"
            },
            error: function (xhr, status, error) {

                $('#error-message').html(xhr.responseJSON.message);
            }
        });
    });
})