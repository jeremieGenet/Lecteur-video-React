import React from 'react';

const BASE_URL = "https://www.youtube.com/embed/"; // Url qui permet de faire des intégrations de vidéos youtube

const Video = ({videoId}) => { // videoId est la propriété que l'on à ajouter dans app.js dans la méthode applyVideoToCurrentMovie() (clé unique de la vidéo)
    return( 
        // Classes bootstrap responsive pour notre video
        <div className="embed-responsive embed-responsive-16by9"> 
            <iframe className="embed-responsive-item" src={`${BASE_URL}${videoId}`}/>
        </div>
    )
}

export default Video; // Rend le composant 'Video' importable (importer dans index.js)