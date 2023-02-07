function sendMessage(event){
    event.preventDefault(event);
    const message = event.target.messageInp.value

    const obj = { message}
    const token = localStorage.getItem('token')
    axios.post('http://localhost:3000/users/Sentmessage',obj,{ headers: {"Authorization" : token}}).then(response=>{
       
    //displayMessageOnScreen(response.data.message)
    }).catch(err=>{
        console.log({err:err})
    })    
}
// async function getChats (event){
//     const token = localStorage.getItem('token')
//     try{
//         await axios.get('http://localhost:3000/users/getmessage', {headers: {"Authorization" : token}})
//         .then((response)=>{
//             console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",response.data)
//             document.querySelector('.container1').innerHTML=""
//             displayMessageOnScreen(response.data)
            
//         })
        
//     }catch(err){
//         console.log(err)
//     }
    
// }

// let interValid = setInterval(getChats(), 1000)
// if(interValid){
//     clearInterval(interValid)
// }
// window.addEventListener('DOMContentLoaded', getChats())




    

    const messageArray = [];

    window.addEventListener('DOMContentLoaded',async(event)=>{
        const messageArray = await getLocalStorageMessages();
        updatedMessages()
        // setInterval(() => {
        //     updatedMessages();
        //  }, 1000)
        
        
    })
    //window.addEventListener('DOMContentLoaded',updatedMessages())

    async function updatedMessages(){
        let lengthOfMessages = messageArray.length;
        let lastMessage;
        if(lengthOfMessages!=0){
            lastMessage = messageArray[lengthOfMessages-1].id;
        }
        const token = localStorage.getItem('token')
        newMessages = await axios.get(`http://localhost:3000/users/getmessage/${lastMessage}`, {headers: {"Authorization" : token}})
        console.log(newMessages.data)
        newMessages.data.forEach(element=>{
            displayMessageOnScreen(element);
        })
        
        updateLocalStorageMesseges(newMessages.data);

    }
    async function getLocalStorageMessages(){
        if(localStorage.message){
            return await JSON.parse(localStorage.message);
        }
    }

    async function   updateLocalStorageMesseges(newMessages){
        const lengthOfNewMessages = newMessages.length;
        if (lengthOfNewMessages>10){
            newMessages.splice(0,lengthOfNewMessages-10 );
            newMessages.forEach((message)=>{
                messageArray.push(message)
            })
        }
        else{
            messageArray.splice(0, lengthOfNewMessages );
            newMessages.forEach((message)=>{
                messageArray.push(message)
            })
        }
        localStorage.message = JSON.stringify(messageArray)

    }
    function displayMessageOnScreen(messages,right){
    
        const pn=document.querySelector('.container1')
    
        
        const messageElement = document.createElement('div')
        const cn=`<div id=${messages.id}> ${messages.Name} :- ${messages.message},  At ${messages.updatedAt} </div>`
        messageElement.innerHTML = cn;
        messageElement.classList.add('message')
        messageElement.classList.add('right')
        pn.append(messageElement)
    
        
        
    
        }