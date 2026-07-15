import React, { useState } from 'react'
import { mockGifs } from './mock-data/gifs.mock'
import { CustomHeader } from './shared/components/CustomHeader'
import { SearchBar } from './shared/components/SearchBar'
import { PreviousSearches } from './gifs/components/PreviousSearches'
import { GifList } from './gifs/components/GifList'
import { getGifsByQuery } from './gifs/actions/get-gifs-by-query.actions'
import type { Gif } from './gifs/interfaces/gif.interface'

export const GifsApp = () => {

  const [previousTerm, setPreviousTerm] = useState<string[]>([])
  const [gifs, setGifs] = useState<Gif[]>([])
  const handleTermClicked = (term: string) => {
    console.log({ term })
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
  return (
    <>
      {/* Header */}
      <CustomHeader title="Buscador de Gifs" description="Descubre y comparte el gif perfecto" />

      {/* Search */}
      <SearchBar placeholder="Busca lo que quieras" onQuery={handleSearch} />

      {/* Busquedas previas */}
      <PreviousSearches searches={previousTerm} onLabelClicked={handleTermClicked} />

      {/* Gifs */}
      <GifList gifs={gifs} />
    </>
  )
}
