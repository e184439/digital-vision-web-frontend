$('#btn-customer-login').click(function (e) {
    e.preventDefault();
    e.stopPropagation();

    let email = $('#email').val();
    let password = $('#password').val();

    var settings = {
        "url": "http://localhost:8080/api/login",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        "data": JSON.stringify({
            "userName": email,
            "password": password
        }),
        "success": function (response) {
            if(response.hasOwnProperty('userType')) {
                alert('Successfully logged in');
                if(userType == 'Customer') {
                    localStorage.setItem('user_id', response.customer.id);
                    localStorage.setItem('customer', response.customer);
                    window.location = '/';
                } else {
                    localStorage.setItem('user_id', response.customer.id);
                    localStorage.setItem('customer', response.customer);
                }
            } else {
                alert('login faild. please try again.');
                localStorage.removeItem('user_id');
                localStorage.removeItem('customer');
                window.location = '/login';
            }
        },
        "error": function (err) {
            alert('login faild. please try again.');
            localStorage.removeItem('user_id');
            localStorage.removeItem('customer');
            window.location = '/login';
        }
    };

    $.ajax(settings);
});