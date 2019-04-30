import React,{Component} from 'react';


class SearchBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchText:"", 
            placeHolder:"Taper votre film...",
            intervalBeforeRequest:1000,
            lockRequest: false
        }
    }
    render(){
        return (
            <div className="row">
                <div className="col-md-8 input-group">
                    <input type="text" className="form-control input-lg" onChange={this.handleChange.bind(this)} placeholder={this.state.placeHolder}/> 
                    <span className="input-group-btn">
                        <button className="btn btn-info" onClick={this.handleOnClick.bind(this)}>Go</button>
                    </span>
                </div>
            </div>
        )
    }

    handleChange(event){
        //console.log('Ma saisie', event.target.value); // event.target.value est le contenu de l'input
        this.setState({searchText:event.target.value}); // On modifie l'état (la valeur) de l'attibut "searchText" de notre input (mise à jour)
        // Si le verrou (lockRequest) est bien ouvert (différent de true)
        if(!this.state.lockRequest){
            this.setState({lockRequest:true}) // On ferme notre verrou
            setTimeout(
                // On appel après une seconde le fonction search()
                function(){this.search()}.bind(this),
                this.state.intervalBeforeRequest
            )
        }
    }

    handleOnClick(event){
        this.search();
    }

    // Envoie le text du champ de recherche à notre callbackSearch() pour être utilisé par app.js (+ ferme le verrou dans le but d'être appellé qu'un fois par seconde dans la fonction handleChange() )
    search(){
        //console.log('click');
        this.props.callbackSearch(this.state.searchText); 
        this.setState({lockRequest:false});
    }
    
}

export default SearchBar; // Rend le composant 'App' importable (importer dans index.js)