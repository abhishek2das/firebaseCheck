
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-analytics.js";
  import { getDatabase,ref,set,onValue,push,child } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCUbfaayakk619eI68IC0k_RdBfDhrA2K8",
    authDomain: "fir-test-798d5.firebaseapp.com",
    databaseURL: "https://fir-test-798d5-default-rtdb.firebaseio.com",
    projectId: "fir-test-798d5",
    storageBucket: "fir-test-798d5.appspot.com",
    messagingSenderId: "391847465908",
    appId: "1:391847465908:web:abf1c28fe78e58b20318e1",
    measurementId: "G-H85DKDJ01Y"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const database = getDatabase(app);
  var islive = "getting_ready" ;
  var StatusOfLive = document.querySelector(".setData")
  var userData = prompt("enter userName")
  var newTimeStamp = new Date()
  console.log(newTimeStamp)
  var onceRun = true
  var proUser = ""
if(onceRun){
  set(ref(database,'/startsGyan/'+ userData),{
    LiveStatus:islive
   })
   onceRun = false
}

 $('.sendD').click(()=>{
  if(islive == "start"){
    islive = "ended"
  }else if(islive == "ended"){
    islive = "start"
  }
  else if(islive == "getting_ready"){
    islive = "start"
  }
  alert(islive)
   set(ref(database,'/startsGyan/'+ userData),{
    LiveStatus:islive
   })
 })

 const starCountRef = ref(database, '/startsGyan/' + userData);
onValue(starCountRef, (snapshot) => {
    let data = snapshot.val();
          data = data.LiveStatus
    
      if(data == "start"){
        StatusOfLive.innerHTML = "live has Started"
        $(".sendD").html("End");
        $(".sendD").removeClass("btn-success")
        $(".sendD").addClass("btn-danger")
      }else if(data == "ended"){
        StatusOfLive.innerHTML = "live has Ended"
        $(".sendD").html("Start")
        $(".sendD").removeClass("btn-danger")
        $(".sendD").addClass("btn-success")
      }else if(data == "getting_ready"){
        StatusOfLive.innerHTML = "Start The Live"
        $(".sendD").html("Start")
        $(".sendD").removeClass("btn-danger")
        $(".sendD").addClass("btn-success")
      }
});

$(".joinNewUser").click(()=>{
  proUser = prompt("type You user Id")
  set(ref(database,'/startsGyan/'+ userData +'/Active_Users/'+proUser),{
    "usercount": 0,
    "userid":proUser,
    "userimage": "https://lh3.googleusercontent.com/a/AEdFTp72K4L93IVyPL4vqC8g4Les_J4aFoilQx-P2-nE=s96-c",
    "username": "Pradeep Singh"
    
  })
})

$(".sendMessage").click(()=>{
  const comment = prompt("Type the Message")
  const childKey =  push(child(ref(database),'startsGyan', userData ,'message')).key
  set(ref(database,'/startsGyan/'+ userData +'/message/'+childKey),{
    "comment":comment,
    "firebaseid": "589",
    "giftPrice": 0,
    "name": "Pradeep Singh",
    "time": "1672988505817",
    "user_id":proUser
  })
})
