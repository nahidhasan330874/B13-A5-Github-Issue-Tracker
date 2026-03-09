
document.getElementById('signin-btn').addEventListener(('click'), () => {
  
    const inputName = document.getElementById('input-name');
     const userName = inputName.value;
     console.log(userName)

    const inputPin = document.getElementById('input-pin');
     const pin = inputPin.value;
     console.log(pin)

     if( userName == "admin" && pin == "admin123"){
        alert(" Sing In Successful");
        window.location.assign("home.html");
     }else{
        alert("Sing In Failed");
        return;
     }
})