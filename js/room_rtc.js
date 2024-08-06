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

let localTracks = []
let remoteUsers = {}

let joinRoomInit = async () => {
    client = AgoraRTC.createClient({mode:'rtc', codec:'vp8'})
    await client.join(APP_ID, roomId, token, uid)
    joinStream()
}

let joinStream = async () => {
    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks({}, {encoderConfig:{
        width:{min:640, ideal:1920, max:1920},
        height:{min:480, ideal:1080, max:1080}
    }})
    let player = `<div class="video__container" id="user-container-${uid}">
                        <div class="video-player" id="user-${uid}"></div>
                    </div>`
    document.getElementById('streams__container').insertAdjacentHTML('beforeend', player) 

    localTracks[1].play(`user-${uid}`)
}

joinRoomInit()

