import { useRef, useState } from 'react'
import type { Gif } from '../interfaces/gif.interface'
import { getGifsByQuery } from '../actions/get-gifs-by-query.actions'

// const gifCache: Record<string, Gif[]> = {};

export const useGifs = () => {

  const [gifs, setGifs] = useState<Gif[]>([])
  const [previousTerm, setPreviousTerm] = useState<string[]>([])
  const gifsCache = useRef<Record<string, Gif[]>>({});

  const handleTermClicked = async (term: string) => {
    if (gifsCache.current[term]) {
      setGifs(gifsCache.current[term]);
      return;
    }
    const gifs = await getGifsByQuery(term);
    setGifs(gifs);
    gifsCache.current[term] = gifs;
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

    gifsCache.current[queryValidated] = gifs;
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
