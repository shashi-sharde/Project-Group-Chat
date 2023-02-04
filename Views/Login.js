function userLogin(event){
    try{
        event.preventDefault();
    const Email = event.target.email.value;
    const Password = event.target.password.value;

    const obj = { Email,Password};

    axios.post('http://localhost:3000/users/Login',obj)
    .then((response)=>{
        console.log("srfawnbrfjkbewajksfhrjkewsh",response);
        if(response.status === 207){
            
            document.body.innerHTML += `<h4  style="color:black; border: 3px solid white; width: 300px; margin:5px"><strong>Invalid Credetials : User Not Found!</strong> </h4>`;
        }
        if(response.status === 201){
            localStorage.setItem('token', response.data.token)
            alert("Login Successfull !")
            window.location.href='http://localhost:3000/ChatWindow.html'
        }
        
    }).catch(err => {
        console.log(JSON.stringify(err))
        document.body.innerHTML += `<h4  style="color:black; border: 3px solid white; width: 200px; margin:5px"><strong>Incorrect Password!</strong> </h4>`;
    })

    }catch(err){
        throw new Error("Something Went Wrong!")
    }
    

}