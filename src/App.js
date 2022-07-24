import logo from './logo.svg';
import React, { useState, useEffect } from 'react';

import './App.css';

function App() {
  let arr = []
  for (let i = 0; i < 30; i++ ) {
    arr.push(i)
  }

  
  return (
      <MyComponent></MyComponent>

  );
}


function MyComponent() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pokemon, setPokemon] = useState({});

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/ditto")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPokemon(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1>
          name: {pokemon.name}
        </h1>
        <div>
          weight: {pokemon.weight}
        </div>
      </div>
    );
  }
}

export default App;
