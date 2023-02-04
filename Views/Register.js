function userRegister(event){
    event.preventDefault();
    const Name = event.target.Name.value;
    const Email = event.target.Email.value;
    const Phone_Number = event.target.PhoneNumber.value;
    const Password = event.target.Password.value

    const obj = {Name,Email,Phone_Number,Password }

    axios.post('http://localhost:3000/users/register',obj)
    .then((response)=>{
        if(response.status===201){
            alert("Registration for new user is successfull!")
            window.location.href='http://localhost:3000/Login.html'
        }
        else if(response.status===207){
           // document.body.innerHTML +=`<div style= 'color:red'> ${'Email Id already Registerd, please try to login!'}</div> `
            alert('Email Id already Registerd, Please Login!')
        }
    }).catch(err =>{
        console.log(err)
    })

}
