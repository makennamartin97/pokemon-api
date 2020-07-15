import React, {useState, useEffect} from 'react';
import './App.css';

function App() {

  const [pokelist, setpokelist] = useState([]);
  const [search, setsearch] = useState("");
  const [display, setdisplay] = useState([]);

  const getpokemon = () => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
      .then(response => {
        //console.log(response.data.results);
        //setpokelist(response.data.results);
        return response.json();
    }).then(response => {
        setpokelist(response.results);
        setdisplay(response.results);
        
    })
    .catch(err => console.log(err));
  }
  useEffect( () => {
    getpokemon();
  }, []);

  useEffect( () => {
    setdisplay(pokelist.filter(a => a.name.includes(search)))
  }, [search]);

  return (
    <div>
      <div className="jumbotron bg-danger text-light text-center lead">Pokemon</div>
      <div className="text-center ">
        <button className="btn btn-primary btn-lg mt-4" onClick={getpokemon}>Fetch Pokemon</button>
        <div className="form-group text-center">
          <label forHtml="searchpoke" className="text-dark lead mt-3">Search:</label>
          <input type="text" name="searchpoke" className="form-control " onChange={e => setsearch(e.target.value)}/>
        </div>
      </div>
      <ul className="list-group text-center mt-5">
        { display.map((poke, i) => 
          <li key={i} className="list-group-item">{poke.name}</li>
        
        )}
      </ul>

      
    </div>
  );
}

export default App;
