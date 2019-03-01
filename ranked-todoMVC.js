const defaultState = {
    songs:[{
        title:"Rolling in the Deep",
        artist:"Adele",
        rating:4,
    },{
        title:"Baby Is Alright",
        artist:"The Pizza Underground",
        rating: 1,
    }]
};

const store = Redux.createStore(function(state = defaultState,action){
    if (action.type === "ADD_SONG") {
        return {
            songs:[...state.songs,{
                title:action.title,
                artist:action.artist,
                rating:3
            }]
        }
    }
    if (action.type === "INCREMENT") {
        return {
            songs:state.songs.map(song=>({
                title:song.title,
                artist:song.artist,
                rating:(song.title === action.title) ? Math.min(5,song.rating + 1) : song.rating
            }))
        }
    }

    if (action.type === "DECREMENT") {
        return {
            songs:state.songs.map(song=>({
                title:song.title,
                artist:song.artist,
                rating:(song.title === action.title) ? Math.max(0,song.rating - 1) : song.rating
            }))
        }
    }
    return state;
});

const ListItem = ({title,artist,rating})=>`
    <div>${artist} - ${title} (${rating})
    <button onclick="store.dispatch({
        type:'INCREMENT',
        title:'${title}'
    })">+</button>
    <button onclick="store.dispatch({
        type:'DECREMENT',
        title:'${title}'
    })">-</button>
    </div>
`

function render({songs}){
    let container = document.getElementById("ListContainer");
    container.innerHTML = songs
        .sort((a,b)=>b.rating - a.rating)
        .map(ListItem).join(``);
}

function addNewSong(){
    event.preventDefault();
    let title = document.getElementById("SongTitle");
    let artist = document.getElementById("SongArtist");

    store.dispatch({
        type:`ADD_SONG`,
        title:title.value,
        artist:artist.value
    });

    title.value = ``;
    artist.value = ``;
}

store.subscribe(a=>{
    render(store.getState());
});
render(defaultState);
