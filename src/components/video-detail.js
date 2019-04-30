// COMPOSANT (TITRE ET DESCRIPTION Des films de l'application)

import React from 'react';


const VideoDetail = ({title, description}) =>{
    return(
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    )
}

export default VideoDetail; // Rend le composant 'VideoDetail' importable (importer dans index.js)