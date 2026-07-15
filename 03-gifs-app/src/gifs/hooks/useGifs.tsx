import { useState } from 'react'
import type { Gif } from '../interfaces/gif.interface'
import { getGifsByQuery } from '../actions/get-gifs-by-query.actions'

export const useGifs = () => {

  const [gifs, setGifs] = useState<Gif[]>([])
  const [previousTerm, setPreviousTerm] = useState<string[]>([])

  const handleTermClicked = async (term: string) => {
    const gifs = await getGifsByQuery(term);
    setGifs(gifs);
  }

  const handleSearch = async (query: string = '') => {
    if (query === '') return;
    const queryValidated = query.trim().toLowerCase();
    previousTerm.includes(queryValidated) ?
      null
      :
      setPreviousTerm([queryValidated, ...previousTerm].slice(0, 8));

    const gifs = await getGifsByQuery(queryValidated);
    setGifs(gifs);
  }

  return {
    // Values
    gifs,
    previousTerm,
    // Functions
    handleTermClicked,
    handleSearch
  }
  }
