import { useEffect, useState } from "react";
import PokemonCards from "./PokemonCards";

const Pokemon = () => {

  const[pokemon,setPokemon] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError]  = useState(null);
  const [search,setSearch] = useState("");
    
  const API  = 'https://pokeapi.co/api/v2/pokemon?limit=52'

  const fetchPokemon = async ()=>{
      try {
        const res = await fetch(API);
        const data = await res.json();
        // console.log(data);

        const detailedPokemonData = data.results.map( async (currPokemon)=>{
          const res = await fetch(currPokemon.url);
          const data = await res.json();
          // console.log(data);
          return data;
        });
        // console.log(detailedPokemonData);
        const detailedResponse =  await Promise.all(detailedPokemonData);
        console.log(detailedResponse);
        setPokemon(detailedResponse);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
      }
  }

  useEffect(()=>{
    fetchPokemon();
  },[]);


  //search functionality 
  const searchData  = pokemon.filter((curPokemon)=>
    curPokemon.name.toLowerCase().includes(search.toLocaleLowerCase())
)


  if(loading){
    return <h2>Loading.....</h2>
  }
  if(error){
    return <h2>{error.message}</h2>
  }


  return (
     <section className="container">
      <header><h1>Let's Catch Pokémon</h1></header>
      <div className="pokemon-search">
        <input type="text" placeholder="search Pokémon" value={search} onChange={(e)=> setSearch(e.target.value)}/>
      </div>
      <div>
        <ul className="cards">
          {
  //          pokemon.map((curPokemon)=>{
            searchData.map((curPokemon)=>{
                return <PokemonCards key = {curPokemon.id} pokemonData = {curPokemon}/>
            })
          }
        </ul>
      </div>
     </section>
  )
}

export default Pokemon
