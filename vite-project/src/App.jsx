import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
import axios, { all } from 'axios';
import PokeCard from '../components/PokeCard'
import { useDebounce } from './hooks/useDebounce'
import AutoComplete from '../components/AutoComplete'

function App() {

  const [allPokemons, setAllPokemons] = useState([]);
  const [displaydPokemons, setDisplayedPokemons] = useState([]);

  const limitNum = 20; 
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=1008&offset=0`;

  
//  const debouncedSearchTerm = useDebounce(searchTerm,500);

  useEffect(()=>{
    fetchPokeData();
  },[])

  // useEffect(()=>{
  //   handleSearchInput(debouncedSearchTerm)
  // },[debouncedSearchTerm])

  const filterDisplayPokemonData = (allPokemonsData, displaydPokemons =[])=>{
    const limit = displaydPokemons.length + limitNum;
    const array = allPokemonsData.filter((pokemon,index)=> index + 1 <=limit);
    return array;
  }

  const fetchPokeData = async() => {
    try{
      
      const response = await axios.get(url)
      setAllPokemons(response.data.results);
      setDisplayedPokemons(filterDisplayPokemonData(response.data.results));

      
    }catch(error){
      console.error(error);
    }
  }

  // const handleSearchInput = async (searchTerm) => {
  
  //   if(searchTerm.length >0){
  //     try{
  //       const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
  //       const pokemonData = {
  //         url: `https://pokeapi.co/api/v2/pokemon/${response.data.id}`,
  //         name:searchTerm
  //       }
  //       setPokemons([pokemonData])
  //     }catch(error){
  //       setPokemons([]);
  //       console.error(error);
  //     }
  //   }else{
  //     fetchPokeData(true);

  //   }
  // }

  return (
   <article className='pt-6'>
    <header className='flex flex-col gap-2 w-full px-4 z-50'>
      <AutoComplete
        allPokemons={allPokemons}
        setDisplayedPokemons={setDisplayedPokemons}
      />
    </header>
    <section className='pt-6 flex flex-col justify-content items-center overflow-auto z-0'>
      <div className='flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl'>
        {displaydPokemons.length > 0 ? 
        (displaydPokemons.map(({url,name},index)=>(
        
            <PokeCard key={url} url={url} name={name}/>
          
        ))) :
        (<h2>
          포켓몬이 없습니다.
        </h2>)}
      </div>
    </section>
          <div className='text-center'>
            {(allPokemons.length>displaydPokemons.length && (displaydPokemons.length !== 1)&& 
            <button 
            onClick={()=>setDisplayedPokemons(filterDisplayPokemonData(allPokemons,displaydPokemons))}
            className='bg-slate-800 px-6 py-2 my-4 text-base rounded-1g font-bold text-white'>
            더 보기 
            </button>)}
            
          </div>
   </article>
  )
}

export default App
 