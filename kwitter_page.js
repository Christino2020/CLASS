var firebaseConfig = {
    apiKey: "AIzaSyCbFamv6yK8qAFK7sov8oC3nkgGbY8C198",
    authDomain: "kwitterwebapp-16250.firebaseapp.com",
    projectId: "kwitterwebapp-16250",
    storageBucket: "kwitterwebapp-16250.appspot.com",
    messagingSenderId: "370540126686",
    appId: "1:370540126686:web:9cfbf471c42d36ee273d4f",
    measurementId: "G-FZLVFEEXX6",
    databaseURL: "https://kwitterwebapp-16250-default-rtdb.firebaseio.com/",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//ADD YOUR FIREBASE LINKS HERE
username = localStorage.getItem("username")
room_name = localStorage.getItem("roomname")

function send() {
    msg = document.getElementById("msg").value
    firebase.database().ref(room_name).push({
        name: username,
        message: msg,
        like: 0
    })
    document.getElementById("msg").value = "";


}

function getData() {
    firebase.database().ref("/").on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebaseMessageID = childKey;
                messageData = childData;
                console.log(firebaseMessageID);
                console.log(messageData);
                name = messageData['name'];
                message = messageData['message']
                like = messageData['like']
                namewithtag = "<h4> " + name + "<img class = 'user_tick' src = 'tick.png'></h4>";
                messagewithtag = "<h4 class = 'message_h4'>  " + message + " </h4>";
                likebtn = "<button class = 'btn btn-warning' id = " + firebaseMessageID + "value = " + like + "onclick = 'updateLike(this.id)'>";
                spanwithtag = "<span class = 'glyphicon glyphicon-thumbs-up'> like:" + like + "</span> </button> <hr>";
                row = namewithtag + messagewithtag + likebtn + spanwithtag;
                document.getElementById("output").innerHTML += row;
            }



        });
    });
}


getData();

function updateLike(messageID) {
    console.log("Click on like button_" + messageID)
    btnID = messageID;
    likes = document.getElementById(btnID).value
    UpdatedLikes = Number(likes) + 1;
    console.log(UpdatedLikes)
    firebase.database().ref(room_name).child(messageID).update({
        like: UpdatedLikes
    })
}

function Logout() {
    localStorage.removeItem("roomname")
    localStorage.removeItem("username")
    window.location.replace = " index.html";
}