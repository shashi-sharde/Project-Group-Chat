function sendMessage(event){

    try{
        event.preventDefault(event);
    const message = event.target.messageInp.value

    const obj = { message}
    const token = localStorage.getItem('token')
    axios.post('http://localhost:3000/users/message',obj,{ headers: {"Authorization" : token}})


    }catch(err){
        console.log({err:err})
    }
    

}