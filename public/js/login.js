function login() {

}

$('#btn-customer-login').click(function (e) {
    e.preventDefault();
    e.stopPropagation();

    let email = $('#email').val();
    let password = $('#password').val();

    $.ajaxSetup({
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });

    $.post(API_BASE + '/login', {
        "username": email,
        "password": password
    }, function (e) {
        console.log(e);
    }, 'json');
});
