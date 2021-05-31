function AddUser(){
    User_name = document.getElementById("username").value

    localStorage.setItem("username" , User_name );
    window.location = "kwitter_room.html"
   
}