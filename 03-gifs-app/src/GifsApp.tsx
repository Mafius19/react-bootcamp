import React from 'react'
import { mockGifs } from './mock-data/gifs.mock'
import { CustomHeader } from './shared/components/CustomHeader'
import { SearchBar } from './shared/components/SearchBar'
import { PreviousSearches } from './gifs/PreviousSearches'
import { GifList } from './gifs/GifList'

export const GifsApp = () => {
  return (
    <>
      {/* Header */}
      <CustomHeader title="Buscador de Gifs" description="Descubre y comparte el gif perfecto" />

      {/* Search */}
      <SearchBar placeholder="Busca lo que quieras" />

      {/* Busquedas previas */}
      <PreviousSearches searches={['Goku', 'Dragon Ball Z']} />

      {/* Gifs */}
      <GifList gifs={mockGifs} />
    </>
  )
}
