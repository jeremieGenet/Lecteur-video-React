import React, {Component} from 'react';

// Librairie pour faire des requêtes Ajax
import axios from 'axios'; 

// Importation des composants (fonctionnels et classes)
import SearchBar from '../components/search-bar';
import VideoList from './video-list';
import VideoDetail from '../components/video-detail';
import Video from '../components/video';

// Morceaux d'url utiles à la connexion et utilisation de l'api The Movie DB
const API_BASE_URL = "https://api.themoviedb.org/3/"
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=true&append_to_response=images"
const API_KEY = "api_key=7eac7468db37027e6a2c19515a1a32bd"
const SEARCH_URL = "search/movie?language=fr&include_adulte=true";


class App extends Component{

    constructor(props){
        super(props)
        // On donne à notre état un tableau de films vide et le film qui sera actuellement affiché (la vidéo)
        this.state = {
            movieList:{}, 
            titleMovieList:{},
            currentMovie:{}
        } 
    }

    // Second fonction exécutée dans le cycle de vie du composant App
    componentWillMount(){
        this.initMovies();
    }

    // Permet de récup en Ajax le film le plus populaire et les 5 suivants les plus populaires
    initMovies(){
        // Appel Ajax avec la librairie Axios et sa fonction get() et si il y a un retour, fonction then() qui renvoie une objet du retour
        axios.get(`${API_BASE_URL}${POPULAR_MOVIES_URL}&${API_KEY}`).then(function(response){
            //console.log(response); // Affiche la réponse de l'api Movie db
            // On modifie l'état en lui donnant le tableau de 20 films reçus de l'api et auquel on ne garde que les indice 1 à 6 (slice())
            this.setState({
                movieList:response.data.results.slice(1, 6), // Les 5 films (sous forme de tableaux) les plus populaire (après le 1er)
                titleMovieList:'Films populaires :',
                currentMovie:response.data.results[0] // Le film le plus populaire de Movie db
                }, function(){ // La fonction ici en argument de this.state s'assure que la requête Ajax soit bien synchro avec la mise à jour REACT
                this.applyVideoToCurrentMovie();
            });
        }.bind(this));
    }

    applyVideoToCurrentMovie(){
        // Appel Ajax (d'un film via son id)
        axios.get(
            `${API_BASE_URL}movie/${this.state.currentMovie.id}?${API_KEY}&append_to_response=videos&include_adult=true`)
            .then(function(response){

                //console.log(response); // Affiche un objet qui contient toutes les infos sur notre this.state.currentMovie (le film le + populaire)
                const youtubeKey = response.data.videos.results[0].key; // On cible la clé unique du trailer de notre film
                let newCurrentMovieState = this.state.currentMovie;
                newCurrentMovieState.videoId = youtubeKey; // On donne à notre film un nouvel attribut 'videoId' (clé youtube pour son trailler)
                //console.log(newCurrentMovieState); // Affiche le film (sous forme d'objet) avec le nouvel attribut 'videoId' est sa clé youtube

                // On change l'état du currentMovie pour lui donner le "newCurrentMovieState" qui lui possède maintenant l'attribut "videoId" avec la clé youtube
                this.setState({currentMovie : newCurrentMovieState}); 
            
        }.bind(this));
    }

    onClickListItem(movie){
        this.setState({currentMovie:movie}, function(){
            this.applyVideoToCurrentMovie(); // On met à jour la vidéo actuelle
            this.setRecommendation(); // On met à jour la list (list de recommandations) en fonction de la vidéo actuelle
        })
    }

    setRecommendation(){
        // Appel Ajax (20 films recommandés pour l'id sélectionné)
        axios.get(`${API_BASE_URL}movie/${this.state.currentMovie.id}/recommendations?${API_KEY}&language=fr`).then(function(response){
            console.log(response); // Affiche la réponse de l'api Movie db
            // On modifie l'état en lui donnant le tableau de 20 films reçus de l'api et auquel on ne garde que les indice 1 à 6 (slice())
            this.setState({
                movieList:response.data.results.slice(0, 5), // Les 5 premiers films recommandés (sous forme de tableaux) 
                titleMovieList: 'Recommandations :'
            });
        }.bind(this));
    }

    onClickSearch(searchText){
        //console.log(searchText); // Affiche le text taper dans la barre de recherche

        // On vérif que searchText exist (que la barre de recherche est bien remplie)
        if(searchText){
            // Appel Ajax avec la fonction get() et si il y a un retour, fonction then() qui renvoie une objet du retour
            axios.get(`${API_BASE_URL}${SEARCH_URL}&${API_KEY}&query=${searchText}`).then(function(response){
                //console.log(response); // Affiche la réponse de l'api Movie db

                // On vérif qu'il y a bien une reponse de l'api et qu'elle n'est pas vide
                if(response.data && response.data.results[0]){

                    // On vérif que le nom du film tapé dans la barre de recherche est différent de la vidéo actuellement affichée (sinon la recherche est alors annulée)
                    if(response.data.results[0].id != this.state.currentMovie.id){
                        // On modifie l'état du notre "currentMovie" qui devient le résultat de la recherche
                        this.setState({
                            currentMovie:response.data.results[0] 
                            }, function(){ // La fonction anonyme ici en argument de this.setState s'assure que la requête Ajax soit bien synchro avec la mise à jour REACT
                                this.applyVideoToCurrentMovie(); // On la video principale
                                this.setRecommendation(); // On met à jour la liste (à droite) en fonction du film actuel
                        });
                    }
                }
                
            }.bind(this));
        }
        
    }

    render(){
        // Vérifie si la liste de films populaires est rempli (sup ou égal à 5) return false si ce n'est pas le cas (donc pas de rendu)
        const renderVideoList = () => {
            if(this.state.movieList.length>=5){
                return (
                    <VideoList 
                        movieList={this.state.movieList} 
                        titleMovieList={this.state.titleMovieList} 
                        callback2={this.onClickListItem.bind(this)} 
                    />
                )
            }
        }

        return (
            <div>
                {/* BARRE DE RECHERCHE */}
                <div className="search_bar">
                    <SearchBar callbackSearch={this.onClickSearch.bind(this)} />
                </div>
                <div className="row">
                    <div className="col-md-8">
                        {/* VIDEO ET TITRE/DESCRIPTION */}
                        <Video videoId={this.state.currentMovie.videoId} />
                        <VideoDetail title={this.state.currentMovie.title} description={this.state.currentMovie.overview} />
                    </div>
                    <div className="col-md-4">
                        {/* LISTE DE VIDEOS */}
                        {renderVideoList()} {/* Rendu de VideoList qui est conditionné par la fonction renderVideoList */}
                    </div>
                </div>
                 
            </div>
        )
    }
    
}

export default App; // Rend le composant 'App' importable (importer dans index.js)