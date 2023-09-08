const playBtnBottom = document.querySelector(".playBottom")
const playItems = document.querySelectorAll(".playBtn")
const songNames = document.querySelectorAll(".songName")
const songNameBottom = document.querySelector(".playingName")
const playImg = document.querySelector(".playImg")
const cards = document.querySelectorAll(".item")
const forwardBtn = document.querySelector(".forward")
const backwardBtn = document.querySelector(".back")
const container = document.querySelector(".container")
const progressBar = document.querySelector("#progressBar")
const minutes = document.querySelectorAll(".time")
const seconds = document.querySelectorAll(".seconds")
let songIndex=0
let time = 0
let progress=0
let width = 0
var audioElement=new Audio("./songs/1.mp3")



function setEffect(value){
    for(let j = 0 ; j<10 ;j++){
        cards[j].classList.remove("active")
        cards[j].classList.remove("notActive")

        if(j==value){
            cards[j].classList.add("active")
        }
        else{
            cards[j].classList.add("notActive")
        }
    }
}


function playSong(value){
    progressBar.value = 0
    let name = value+1+".mp3"
    name=`./songs/${name}`
    audioElement =new  Audio (name)
    audioElement.play()
    controlBar(audioElement)
}

function controlBar(audioElement){
    console.log("entered")
    audioElement.addEventListener('timeupdate',()=>{
        progress=((audioElement.currentTime/(minutes[songIndex].innerText.split(":")[0]*60+seconds[songIndex].innerText/100)*100))
        progressBar.value=progress
    })
    
}

function pausePrevious(){
    audioElement.pause()
    audioElement.currentTime=0
    songNameBottom.innerText = " "
    songNameBottom.style.cssText ="opacity:0"
    playImg.style.cssText ="opacity:0"
}
function toggleButton(){
    playBtnBottom.classList.remove("fa-circle-play")
    playBtnBottom.classList.add("fa-pause")
}
function showSong(value){
    songNameBottom.innerText = songNames[value].innerText
    songNameBottom.style.cssText ="opacity:1"
    playImg.style.cssText ="opacity:1"
}


function playPrev(){
    if(songIndex!=0){
        songIndex--
    }
    else{
        songIndex=9
        container.scroll(0,600)
    }
    audioElement.pause()
    audioElement.currentTime=0
    setEffect(songIndex)
    playSong(songIndex)
    showSong(songIndex)
    playBtnBottom.classList.remove("fa-play-circle")
    playBtnBottom.classList.add("fa-pause")
    
    
}

function playNext(){
    if(songIndex!=9){
        songIndex++
    }
    else{
        songIndex=0
        container.scroll(400,0)
    }
    audioElement.pause()
    audioElement.currentTime=0
    setEffect(songIndex)
    playSong(songIndex)
    showSong(songIndex)
    playBtnBottom.classList.remove("fa-play-circle")
    playBtnBottom.classList.add("fa-pause")
}

function playIndex(){
    if(songIndex!=9){
        songIndex++
        audioElement.pause()
        audioElement.currentTime=0
        setEffect(songIndex)
        playSong(songIndex)
        showSong(songIndex)
    }
}

function setSong(){
    let time=(minutes[songIndex].innerText.split(":")[0]*60)+(seconds[songIndex].innerText/100)
    audioElement.currentTime=(progressBar.value*time)/100
    console.log((audioElement.currentTime/(minutes[songIndex].innerText.split(":")[0]*60+seconds[songIndex].innerText/100)*100))
}


for(let i=0;i<10;i++){
    cards[i].addEventListener("click",()=>{
        songIndex=i
        toggleButton()
        pausePrevious()
        setEffect(songIndex)
        playSong(songIndex)
        showSong(songIndex)
    })
}

playBtnBottom.addEventListener("click",()=>{
    if(playBtnBottom.classList.contains("fa-pause")){
        audioElement.pause()
        playBtnBottom.classList.remove("fa-pause")
        playBtnBottom.classList.add("fa-play-circle")
        songNameBottom.style.cssText ="opacity:0"
        playImg.style.cssText ="opacity:0"
    }
    else{
        audioElement.play()
        controlBar(audioElement)
        showSong(songIndex)
        playBtnBottom.classList.remove("fa-play-circle")
        playBtnBottom.classList.add("fa-pause")
        
    }
})

backwardBtn.addEventListener("click",playPrev)

forwardBtn.addEventListener("click",playNext)


progressBar.addEventListener("change",setSong)


