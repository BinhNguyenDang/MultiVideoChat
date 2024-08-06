const APP_ID= ""

let uid = sessionStorage.getItem("uid")
if(!uid){
    uid = String(Math.floor(Math.random() * 10000))
    sessionStorage.setItem("uid", uid)
}

let token = null; 
let client; 

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
let roomId = urlParams.get('room')

if(!roomId){
    roomId = 'main'
}

let localTrack = []
let remoteUsers = {}

//room.html?room=234

