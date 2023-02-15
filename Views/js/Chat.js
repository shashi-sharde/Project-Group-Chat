const userLeft = document.getElementById('left')
const userRight = document.getElementById('right')
const messageHeader=document.getElementById('message-card-header')
const chatMessage=document.getElementById('chat-messages')
const toast=document.getElementById('toast-msg')
const groupChat=document.getElementById('group-chat')
const creategroup=document.getElementById('create-group')

groupChat.addEventListener('click',groupTalk)
function groupTalk(){

    window.location.href="./groupChat.html"
}

creategroup.addEventListener('click',Crategroup)
function Crategroup(){
    window.location.href="./groupForm.html"
}





let toUserId;
function createToast(msg, color = "red"){
    console.log('true')
    const div = document.createElement("div");
    div.innerHTML = msg;
    div.style.backgroundColor = '#5A5A5A';
    div.style.padding = "1rem 2rem";
    div.style.borderRadius = "4px";
    div.style.color = "#fff";
    console.log(div.innerText)
    toast.append(div)
    console.log(toast)
    setTimeout(() => {
      div.remove();
    }, 2000);
  }
async function allLoginUsers(){
    const token=localStorage.getItem('token')
    userLeft.innerHTML=""
   await axios.get('http://localhost:3000/chat/allusers',{headers:{"Authorization":token}})
   .then(response=>{
    // console.log(response)
    // console.log(response.data.user)
    const user1=response.data.user
    user1.forEach((user)=>{
        const childNodes=`<li class="list-group-item" >${user.name}<input type="hidden" class="user-id" value=${user.id} /></li>`
        userLeft.innerHTML +=childNodes
    })
   })
   
}
const fileInput = document.querySelector('#sendAttachment');
fileInput.addEventListener('change', async () => {
    const userId = +document.querySelector('.list-group-item').value;
    const selectedFile = fileInput.files[0];
    console.log(selectedFile);
    await axios.post('/message/saveFile', {
        file: selectedFile,
        userId: userId
    })
})



function userClick(e){
    if(e.target.className == "list-group-item"){
        const name = e.target.textContent;
        const id = +e.target.children[0].value;
        toUserId:id;
        const userMessage = `<h1 style="text-align:center; bottom:10px; background-color:#37df9149">${name} <input class="msg2" type='hidden' id='msg-header-user-id' value='${id}'/></h1>`;
        messageHeader.innerHTML=userMessage;
        chatMessage.innerHTML="";
        getChats(id);
    }
}
async function  getChats(toUserId =0){
    chatMessage.innerHTML="";
    const token=localStorage.getItem('token')
   const response= await axios.get(`http://localhost:3000/chat/allchats/${toUserId}`,{headers:{"Authorization":token}})
//    console.log(response)
   if(response.status ==200 && response.data.chats){
    localStorage.removeItem('Id')
    localStorage.setItem('Id', toUserId )
      const chats=response.data.chats;
      console.log('responsessss',chats)
      chats.forEach((chat)=>{
        console.log(chat)
        const chatNodes=`<li class="list-group-item1"><strong style="color:white">${chat.user.name}</strong><br>${chat.chatMessage}</li>`
        chatMessage.innerHTML +=chatNodes
      })
   }
}
async function chat(e){
    e.preventDefault()
    const id1 = +document.getElementById('msg-header-user-id').value;
    const chat1=e.target.chat2.value;
    if(!chat1){
       return createToast('plzz enter the message')
    }
    try{
    const chatDetails={
       chat: chat1,
       toUser:id1
    }
    console.log(chatDetails)
    const token=localStorage.getItem('token')
    await axios.post('http://localhost:3000/chat/chatmessage',chatDetails,{headers:{"Authorization":token}})
    .then(response=>{
        console.log(response)
        if(response.status ===200){
            createToast(response.data.message)
        }
    })
}catch(err){
    console.log(err)
    if(err.response.status===400){
        createToast(err.response.data.message)
    }
    if(err.response.status===500){
        createToast(err.response.data.message)
    }
}
}
function showScreen(){
    allLoginUsers()
   setInterval(() => {
    getChats(localStorage.getItem('Id'))
   }, 7000);
    // getChats(localStorage.getItem('Id'))

    }   

window.addEventListener('DOMContentLoaded',showScreen)
userLeft.addEventListener('click',userClick)

document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (leaveRoom) {
    window.location = './login.html';
  } else {
  }
});

