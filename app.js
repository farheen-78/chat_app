let chatArea=document.getElementById("container2");
let sig=document.getElementById("form");
let login_area=()=>{
  
  let login_form=document.getElementById("form1");
  sig.style.display='none';

login_form.style.display='block';
}
let chat_area=()=>{
  let loginArea=document.getElementById("form1");

  loginArea.style.display='none';

chatArea.style.display='block';
}
// **********************signupf function********************************************
let signup=()=>{
let user=document.getElementById('uname')
let email=document.getElementById("email");
let password=document.getElementById("pass");

firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
.then((result)=>{
    // console.log(result);
    alert("You sign up successfully\n  Welcome to start chat");
    
    sig.style.display='none';
    chatArea.style.display='block';
})
.catch((error)=> {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    let er=document.getElementById("error");
    er.innerHTML=errorMessage;
  });
}
var userName;
//*************** login function******************************************************
let login=()=>{
 
   userName=document.getElementById("login-user").value
  let email=document.getElementById("login-email").value;
  let password=document.getElementById("login-pass").value;
 
firebase.auth().signInWithEmailAndPassword(email, password)
.then((result)=>{
alert("You are successfully login.Welcome to start chat ");
chat_area();
  

  })

 

.catch((error)=> {
  let login_er=document.getElementById("login-error");
  login_er.innerHTML=error.message;
    
 
  });
}
//***************************************chat function*********************************

firebase.database().ref('user').on('child_added',(data)=>{
  let getMessage=document.getElementById("message");
  
 
  
 if (data.val().user===userName){
  getMessage.innerHTML +=`<li class="list1">${data.val().user}: <br>${data.val().message}<button id=${data.val().key} class="delbtn" onclick="delMsg(this)">Delete</button></li>`;
 }
 else{
 
   
   getMessage.innerHTML += `<li class="list">${data.val().user}:<br>${data.val().message}</li>`;

 }
 
  

// console.log(data.val().key);

})
let delMsg=(e)=>{
  firebase.database().ref("user").child(e.id).remove();
  e.parentNode.remove();
  
  

}


let sendMessage = () => {

   var message = document.getElementById("msg");
   var key =firebase.database().ref('user').push().key;
   let m = { 
       "key" :key,
        "user":userName,
       "message": message.value
   }
   firebase.database().ref('user/' + key).set(m);
   message.value = "";
 }
let logOut=()=>{

firebase.auth().signOut()
.then((result)=>{
  chatArea.style.display='none'; 
  sig.style.display='block';
})
.catch=((error)=> {
  console.log(error.Message);  
});
}



