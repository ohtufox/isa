exports.showPassword = showPassword;

function showPassword(element) {
    if(element.type === 'password')  
        element.type = 'text';
    setTimeout(function(){
        element.type = 'password';
    }, 3000);
}
