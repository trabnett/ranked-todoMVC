console.log('this is not working')

let defaultState = {
    songs: [{
        title: "Space Oddity",
        artist: "David Bowie",
        rating: 4
    },{
        title: "Lovin is Easy",
        artist: "Rex Orange County",
        rating: 5
    },{
        title: "Whiteout Contidions",
        artist: "New Pornographers",
        rating: 5
    }]
};

let render = state => {
    document.getElementById(`Container`).innerHTML = state
    .songs
    .sort((a,b)=>b.rating - a.rating)
    .map(song=>`<div>${song.artist} - ${song.title}(${song.rating})
    <button onclick="rateSong('${song.title}',-1)">-</button>
    <button onclick="rateSong('${song.title}',1)">+</button>
    </div>`)
    .join(``)
};

function rateSong(title, rating) {
    console.log("rating!",title,rating)
    store.dispatch({
        type: "CHANGE_SONG_RATING",
        title:title,
        rating:rating
    })
}

function handleNewSong(){
    event.preventDefault();
    let title = document.getElementById("Title");
    let artist = document.getElementById("Artist");

    console.log(title.value, artist.value)

    store.dispatch({
        type:"ADD_NEW_SONG",
        title: title.value,
        artist: artist.value
    })

    title.value = ""
    artist.value = ""
}


let store = Redux.createStore((state = defaultState,action)=>{
    console.log("reducer is running!",state,action)
    switch(action.type) {
        case "CHANGE_SONG_RATING":
            return {
                songs:state.songs.map(song=>(song.title === action.title) ? {title:song.title,artist:song.artist,rating: Math.max(Math.min(song.rating + action.rating,5),0)}
                : 
                song
                )
            }
        case "ADD_NEW_SONG":
            return {
                songs: [...state.songs, {title:action.title, artist:action.artist, rating:3}]
            }
    }
    return state;
});

render(store.getState())

store.subscribe(() =>{
    render(store.getState())
})