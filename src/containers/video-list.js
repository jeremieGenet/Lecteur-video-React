/* COMPOSENT (parent de video-list-item.js) qui retourne La liste des vidéo */

import React from 'react';
import VideoListItem from '../components/video-list-item';

const VideoList = (props) => {

    //console.log(props);

    //const movieList = props.movieList; // (Avant ES6)
    const {movieList} = props;
    const {titleMovieList} = props;

    return (
        <div>
            
            <ul>
            <h5 className="title_video-list">{titleMovieList}</h5>
                {
                    // On boucle sur le tableau movieList (avec la fonction javascrip map() )
                    movieList.map(movie =>{
                        //console.log(movie);
                        return <VideoListItem key={movie.id} movie={movie} callback={receiveCallBack}/>
                    })
                }
            </ul>
        </div>
    );

    // Va permettre d'envoyer la propriété 'movie' (donc le film) 
    function receiveCallBack(movie){
        // console.log('Parent :' , movie);
        props.callback2(movie);//////////////////////////////////////// 'props.callback' is not a function
    }


}

export default VideoList;