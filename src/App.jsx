import { useState } from 'react'
import './App.css'
import {capitalize} from './utilities'

function App() {
  const [query, setQuery] = useState('')
  const [pokemon, setPokemon] = useState('')

  const search = e => {
    document.getElementById('searcher').value = ''
    e.preventDefault()
    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
      .then(res => res.json())
      .then(data => setPokemon(data))
      .catch(err => alert('That pokemon doesnt exist'))
  }
  const queryHandler = e => {
    setQuery(e.target.value.trim().toLowerCase())
  }

  return (
    <div className="App">
      <h1>Pokedex</h1>
      <div className='content-wrapper'>
        <form action="" onSubmit={(e) => search(e)}>
          <input type="text" id='searcher' onChange={e => queryHandler(e)} placeholder='Search a pokemon' autoComplete='OFF'/>
          <input type="submit" value="Search"  />
        </form>
        {pokemon !== '' ? 
          <div className='card'>
            <div className="card-header">
              <img src={pokemon.sprites.other['official-artwork'].front_default} alt="" />
              
            </div>
            <div className="card-body">
            <h2>(Nº {pokemon.id}) {capitalize(pokemon.name)}</h2>
            <div className="row">
              <p><b>Height: </b>{pokemon.height / 10} m</p>
              <p><b>Weight: </b>{pokemon.weight / 10} kg</p>
            </div>
            <ul>
              <h3>Abilities</h3>
                {pokemon.abilities.map(e => {
                  return(
                    <li>{capitalize(e.ability.name.replace('-', ' '))} {e.is_hidden ? '(hidden)' : ''}</li>
                  )
                })}
            </ul>
            <ul>
              <h3>Base stats</h3>
              {pokemon.stats.map(e => {
                return(
                  <li><b>{capitalize(e.stat.name.replace('-', ' '))}:</b> {e.base_stat}</li>
                )
              })}
            </ul>
            </div>
          </div>
        : <div className='card'>
            <div className="card-header">
              <div className="interrogation"><h1>?</h1></div>
            </div>
            <div className="card-body"></div>
          </div>}
      </div>
    </div>
  )
}

export default App
