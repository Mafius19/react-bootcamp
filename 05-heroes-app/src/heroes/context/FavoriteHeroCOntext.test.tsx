import { use } from 'react';
import { beforeEach, describe, expect, test } from 'vitest';
import { FavoriteHeroContext, FavoriteHeroProvider } from './FavoriteHeroCOntext';
import { fireEvent, render, screen } from '@testing-library/react';
import type { Hero } from '../types/hero.interface';


const mockHero = {
  id: '1',
  name:'batman'
} as Hero

const TestComponent = () => {
  const {favoriteCount, isFavorite, favorites, toggleFavorite} = use(FavoriteHeroContext)
  return (
    <div>
      <div data-testid="favorite-count">{favoriteCount}</div>
      <div data-testid="favorite-list">
        {
          favorites.map(hero => (
            <div key={hero.id} data-testid={`hero-${hero.id}`}>
              {hero.name}
            </div>
          ))
        }
      </div>
      <button data-testid="toggle-favorite"
        onClick={()=> toggleFavorite(mockHero)}
      >
        Toggle Favorite
      </button>
      <div data-testid="is-favorite">{isFavorite(mockHero).toString() }</div>
    </div>
  )
}

const renderCOntextTest = () => {

  return render(
    <FavoriteHeroProvider>
      <TestComponent/>
    </FavoriteHeroProvider>
  )
}

describe('favoriteHeroontext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('should initialize with default values', () => {
    renderCOntextTest()
    // screen.debug()
    expect(screen.getByTestId('favorite-count').textContent).toBe('0')
    expect(screen.getByTestId('favorite-list').children.length).toBe(0)
  })

  test('should add hero to favorites when toggle is called with new hero', () => {
    renderCOntextTest();
    const button = screen.getByTestId('toggle-favorite');
    fireEvent.click(button)

    expect(screen.getByTestId('favorite-count').textContent).toBe('1')
    expect(screen.getByTestId('is-favorite').textContent).toBe('true')
    expect(screen.getByTestId('hero-1').textContent).toBe('batman')
    expect(localStorage.getItem('favorites')).toBe('[{"id":"1","name":"batman"}]')
  });

  test('should remove hero from favorites when toggle is called', () => {
    // localStorage.clear() por si el beforeEach no borra el localStorage;
    localStorage.setItem('favorites', JSON.stringify([mockHero]))

    renderCOntextTest();
    expect(screen.getByTestId('favorite-count').textContent).toBe('1')
    expect(screen.getByTestId('is-favorite').textContent).toBe('true')
    expect(screen.getByTestId('hero-1').textContent).toBe('batman')

    const button = screen.getByTestId('toggle-favorite');
    fireEvent.click(button)

    // screen.debug()
    // console.log(localStorage.getItem('favorites'))

    expect(screen.getByTestId('favorite-count').textContent).toBe('0')
    expect(screen.getByTestId('is-favorite').textContent).toBe('false')
    expect(screen.queryByTestId('hero-1')).toBeNull()
  })
});