import React from 'react';
import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';

class Header extends React.Component{
  render(){
    return (
      <div>
        <h1>Hello World</h1>
        <h3>According to IMDB</h3>
      </div>
    );
  }
}

class Footer extends React.Component{
  render(){
    return (
      <div className='App-footer'>
        Created by Bryan Amirul Husna
      </div>
    );
  }
}

class Film extends React.Component{
  render(){
    return (
    <div className="Film" idx={this.props.idx}>
      <a href={this.props.url} target="_blank">{this.props.name}</a> &nbsp;
      <button onClick={this.props.handleClick} idx={this.props.idx}>{this.props.fav ? "Remove from Wish List" : "Add to Wish List"}</button>
    </div>
    );
  }
}

class App extends React.Component{
  constructor(props){
    super(props);
    let filmList = [
      {id:1, name:"Shawshank Redmeption (1994)", url:"https://www.imdb.com/title/tt0111161/"},
      {id:2, name:"The Godfather (1972)", url:"https://www.imdb.com/title/tt0068646/"},
      {id:3, name:"The GodfatherL Part II (1974)", url:"https://www.imdb.com/title/tt0071562/"},
      {id:4, name:"The Dark Knight (2008)", url:"https://www.imdb.com/title/tt0468569/"}
    ];

    this.state = {
      filmList: filmList,
      favList: []
    };

    this.handleClickAdd = this.handleClickAdd.bind(this);
    this.handleClickRemove = this.handleClickRemove.bind(this);
    this.getFavPos = this.getFavPos.bind(this);
    this.isInFav = this.isInFav.bind(this);

    window.onbeforeunload = () =>{
      let favourites = "";
      for(let i=0; i<this.state.favList.length; i++){
        favourites += (this.state.favList[i].id + " ");
      }
      document.cookie = 'favourites=' + favourites + ';';
    }
  }


  getFilmPos(idx){
    let foundIdx = -1;
    for(let i=0; i<this.state.filmList.length; i++){
      if(this.state.filmList[i].id == idx){
        foundIdx = i;
        break;
      }
    }
    return foundIdx;
  }

  componentDidMount(){
    let favList = [];
    let prevSession = document.cookie;
    let firstidx = prevSession.indexOf("favourites=");
    if(firstidx > -1 && prevSession.substring("favourites=".length).length > 0){
      firstidx += "favourites=".length;
      prevSession = prevSession.slice(firstidx);
      favList = prevSession.split(" ").map(angka => (this.state.filmList[this.getFilmPos(parseInt(angka))]));
      this.setState(prevState => ({
        favList: favList
      }));
    }
  }

  getFavPos(idx){
    let foundIdx = -1;
    for(let i=0; i<this.state.favList.length; i++){
      
      if(this.state.favList[i].id == idx){
        foundIdx = i;
        break;
      }
    }
    return foundIdx;
  }

  isInFav(idx){
    return !(this.getFavPos(idx) == -1);
  }

  handleClickAdd(e){
    let idx = parseInt(e.target.getAttribute('idx'));
    let i = this.getFilmPos(idx);
    if(!this.isInFav(idx)){
      this.setState(prevState => ({
        favList: prevState.favList.concat([this.state.filmList[i]])
      }));
    }
  }

  handleClickRemove(e){
    let idx = parseInt(e.target.getAttribute('idx'));
    idx = this.getFavPos(idx);
    let newFav1 = this.state.favList.slice(0,idx);
    let newFav2 = this.state.favList.slice(idx+1);
    let newFav = newFav1.concat(newFav2);
    this.setState(prevState => ({
      favList: newFav
    }));
  }

  render (){
    return (
      <div className="App">
      <Header />
      <div>
        {this.state.filmList.map((film) => (<Film idx={film.id} name={film.name} url={film.url} handleClick={this.handleClickAdd} fav={false} />)) }
      </div>
      <h2>Wish List</h2>
      <div>
        {this.state.favList.map((film) => (<Film idx={film.id} name={film.name} url={film.url} handleClick={this.handleClickRemove} fav={true} />)) }
      </div>
      <Footer />
    </div>
    );
  }
}

export default App;
