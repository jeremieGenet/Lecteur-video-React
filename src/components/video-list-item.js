// COMPOSANT qui retourn la liste des films (image et titre)

import React from 'react';

// Début d'url pour récup une image sur Movie db (w500 = width=500px)
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500/"; 

const VideoListItem = (props) => {

    //console.log(props);

    // const movie = props.movie; // (Avant ES6)
    const {movie} = props;

    return( 
        <li className="list-group-item" onClick={handleOncClick}>

            <div className="media">

                <div className="media-left">
                    <img className="media-object image_list" height="100px" width="100px" src={`${IMAGE_BASE_URL}${movie.poster_path}`} />
                </div>
            
                <div className="media-body">
                    <h5 className="title_list_item"> {movie.title} </h5>
                </div>

            </div>
            
        </li>
    )

    function handleOncClick(){
        console.log('Click !!', movie); // Lorsqu'on click sur la liste, affiche notre movie (sous forme d'objet)
        //console.log(props.callback(movie));
        props.callback(movie); // On récup la propriété movie
    }
}

export default VideoListItem; // Rend le composant 'App' importable (importer dans index.js)