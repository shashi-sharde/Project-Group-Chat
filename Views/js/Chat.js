function sendMessage(event){

    
    event.preventDefault(event);
    const message = event.target.messageInp.value

    const obj = { message}
    const token = localStorage.getItem('token')
    axios.post('http://localhost:3000/users/Sentmessage',obj,{ headers: {"Authorization" : token}}).then(response=>{
       
    disp(response.data.message)
    
    
        

    }).catch(err=>{
        console.log({err:err})
    })
    
}

  async function getChats (event){
    const token = localStorage.getItem('token')
    try{
        await axios.get('http://localhost:3000/users/getmessage', {headers: {"Authorization" : token}})
        .then((response)=>{
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",response.data)

            response.data.forEach(element => {
                disp(element);
            });


        })
        
    }catch(err){
        console.log(err)
    }
    
}

let interValid = setInterval(getChats, 1000)
if(interValid){
    clearInterval(interValid)
}
window.addEventListener('DOMContentLoaded', getChats())



function disp(messages,right){
    
    const pn=document.querySelector('.container1')
    const messageElement = document.createElement('div')
    
    const cn=`<div id=${messages.id}> ${messages.Name} :- ${messages.message},  At ${messages.updatedAt} </div>`
    messageElement.innerHTML = cn;
    messageElement.classList.add('message')
    messageElement.classList.add('right')
    pn.append(messageElement)

    }
    
