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
username = localStorage.getItem("username");
document.getElementById("username").innerHTML = "Welcome" + username + "!";

function AddRoom() {
      roomname = document.getElementById("RoomInput").value
      firebase.database().ref("/").child(roomname).update({
            purpose: "Add Room name"
      })
      localStorage.setItem("roomname", roomname)
      window.location = "kwitter_page.html";

}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  console.log(Room_names)
                  row = "<div class = 'room_name ' id = " + Room_names + "onclick = 'redirectToRoomName(this.id)'>#" + Room_names + "</div> <hr>"
                  document.getElementById("output").innerHTML = row;
            });
      });
}


getData();

function redirectToRoomName(name) {
      console.log(name)
      localStorage.setItem("roomname", name)
      window.location = "index.html";

}

function Logout() {
      localStorage.removeItem("roomname")
      localStorage.removeItem("username")
      window.location = "index.html";
}