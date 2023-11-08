console.log("Spidefy - Your friendly neighbour Music Website");
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');
let songItemPlay = document.getElementsByClassName('songItemPlay');


let songs =  [
    {SongName : "Sapta Sagaradaache Ello" ,filePath : "songs/1.mp3" , coverPath : "covers/1.jpg"},
    {SongName : "777 Charlie" ,filePath : "songs/2.mp3" , coverPath : "covers/2.jpg"},
    {SongName : "AIGIRI NANDINI- Brodha V " ,filePath : "songs/3.mp3" , coverPath : "covers/3.jpg"},
    {SongName : "NEONI - Darkside" ,filePath : "songs/4.mp3" , coverPath : "covers/4.jpg"},
    {SongName : "Googly - Bisilu Kudreyondu" ,filePath : "songs/5.mp3" , coverPath : "covers/5.jpg"},
    {SongName : "Aankhon Se Batana – Dikshant" ,filePath : "songs/6.mp3" , coverPath : "covers/6.jpg"},
    {SongName : "Jarico - Landscape" ,filePath : "songs/7.mp3" , coverPath : "covers/7.jpg"},
    {SongName : "GHOST_ OGM _ Dr Shivarajkumar" ,filePath : "songs/8.mp3" , coverPath : "covers/8.jpg"},
    {SongName : "Passenger _ Let Her Go" ,filePath : "songs/9.mp3" , coverPath : "covers/9.jpg"},
    {SongName : "Tom Odell - Another Love " ,filePath : "songs/10.mp3" , coverPath : "covers/10.jpg"},
]

masterSongName.innerText = songs[songIndex].SongName;
songItems.forEach((element,i)=>{
    // console.log(element,i);
    element.getElementsByTagName('img')[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].SongName;
})
// audioElement.play();
masterPlay.addEventListener("click",()=>{
    masterSongName.innerText = songs[songIndex].SongName;
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
        makeitPause(songIndex);
        changebg(songIndex);
       
    }else{
        audioElement.pause();
        makeAllPlays();
        masterPlay.classList.add("fa-circle-play");
        masterPlay.classList.remove("fa-circle-pause");
        gif.style.opacity = 0;
    }
})
audioElement.addEventListener('timeupdate',()=>{
   let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener("change",()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
})

const makeAllPlays = ()=>{
    Array.from(songItemPlay).forEach((element)=>{
element.classList.add("fa-circle-play");
element.classList.remove("fa-circle-pause");
    })
}
const makeitPause = (ind)=>{
    let all_play = Array.from(songItemPlay);
    all_play[ind].classList.remove("fa-circle-play");
    all_play[ind].classList.add("fa-circle-pause")
}

Array.from(songItemPlay).forEach((element)=>{
    element .addEventListener("click",(e)=>{
        // console.log(e.target);
        if(e.target.classList.contains("fa-circle-play") && songIndex!=parseInt(e.target.id)){
        makeAllPlays();
        gif.style.opacity = 1;
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        audioElement.src=`songs/${songIndex+1}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
        masterSongName.innerText = songs[songIndex].SongName;
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        changebg(songIndex);
    }else if(e.target.classList.contains("fa-circle-play") && songIndex==parseInt(e.target.id)){
        gif.style.opacity = 1;
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
    }
    else{
        e.target.classList.remove("fa-circle-pause");
        e.target.classList.add("fa-circle-play");
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity = 0;
    }
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>8){
        songIndex=0;
    }else{
        songIndex+= 1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
        audioElement.currentTime=0;
        masterSongName.innerText = songs[songIndex].SongName;
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        makeAllPlays();
        makeitPause(songIndex);
        changebg(songIndex);
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<1){
        songIndex=9;;
    }else{
        songIndex-= 1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
        audioElement.currentTime=0;
        masterSongName.innerText = songs[songIndex].SongName;
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        makeAllPlays();
        makeitPause(songIndex);
        changebg(songIndex);
})

const changebg =(ind)=>{
    document.body.style.backgroundImage = `url(${songs[songIndex].coverPath})`;
    document.body.style.backdropFilter = 'blur(8px)';
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";

}