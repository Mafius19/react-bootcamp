import { QueryClient, QueryClientContext, QueryClientProvider } from '@tanstack/react-query';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { HeroStats } from './HeroStats';
import { render, screen } from '@testing-library/react';
import { useHeroSummary } from '../hooks/useHeroSummary';
import type { SummaryInformationResponse } from '../types/summary-information.response';
import { FavoriteHeroProvider } from '../context/FavoriteHeroCOntext';

vi.mock('../hooks/useHeroSummary');
const mockUseHeroSummary = vi.mocked(useHeroSummary)

const mockHero = {
    "id": "1",
    "name": "Clark Kent",
    "slug": "clark-kent",
    "alias": "Superman",
    "powers": [
      "Súper fuerza",
      "Vuelo",
      "Visión de calor",
      "Visión de rayos X",
      "Invulnerabilidad",
      "Súper velocidad"
    ],
    "description": "El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.",
    "strength": 10,
    "intelligence": 8,
    "speed": 9,
    "durability": 10,
    "team": "Liga de la Justicia",
    "image": "1.jpeg",
    "firstAppearance": "1938",
    "status": "Active",
    "category": "Hero",
    "universe": "DC"
}

const mockSummaryData : SummaryInformationResponse= {
  "totalHeroes": 25,
  "strongestHero": {
    "id": "1",
    "name": "Clark Kent",
    "slug": "clark-kent",
    "alias": "Superman",
    "powers": [
      "Súper fuerza",
      "Vuelo",
      "Visión de calor",
      "Visión de rayos X",
      "Invulnerabilidad",
      "Súper velocidad"
    ],
    "description": "El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.",
    "strength": 10,
    "intelligence": 8,
    "speed": 9,
    "durability": 10,
    "team": "Liga de la Justicia",
    "image": "1.jpeg",
    "firstAppearance": "1938",
    "status": "Active",
    "category": "Hero",
    "universe": "DC"
  },
  "smartestHero": {
    "id": "2",
    "name": "Bruce Wayne",
    "slug": "bruce-wayne",
    "alias": "Batman",
    "powers": [
      "Artes marciales",
      "Habilidades de detective",
      "Tecnología avanzada",
      "Sigilo", "Genio táctico"
    ],
    "description": "El Caballero Oscuro de Ciudad Gótica, que utiliza el miedo como arma contra el crimen y la corrupción.",
    "strength": 6,
    "intelligence": 10,
    "speed": 6,
    "durability": 7,
    "team": "Liga de la Justicia",
    "image": "2.jpeg",
    "firstAppearance": "1939",
    "status": "Active", "category":
      "Hero",
    "universe": "DC"
  },
  "heroCount": 18,
  "villainCount": 7
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    }
  }
})

const renderHeroStats = (mockData?: Partial<SummaryInformationResponse>) => {
  mockUseHeroSummary.mockReturnValue({
    data: mockData ?? undefined
  } as unknown as ReturnType<typeof useHeroSummary>)

  return render(
    <QueryClientProvider client={queryClient}>
      <FavoriteHeroProvider>
        <HeroStats />
      </FavoriteHeroProvider>
    </QueryClientProvider>
  )
}

describe('HeroStats', () => {
  // beforeEach(() => {
  //   vi.clearAllMocks()
  // })

  test('should render component with default values', () => {

    const { container } = renderHeroStats()
    // screen.debug()

    expect(screen.getByText('Loading...')).toBeDefined()
    expect(container).toMatchSnapshot()
  })

  test('should render HeroStats with mock data', () => {

    const { container } = renderHeroStats(mockSummaryData)
    // screen.debug()

    expect(container).toMatchSnapshot()
    expect(screen.getByText('Total de personajes')).toBeDefined()
    expect(screen.getByText('Favoritos')).toBeDefined()
    expect(screen.getByText('Mas fuerte')).toBeDefined()
  })

  test('should change the percentage of favorites when a hero is added to favorite ', () => {
    localStorage.setItem('favorites', JSON.stringify([mockHero]))
    renderHeroStats(mockSummaryData)
    screen.debug()

    const favoritesPercentageElement = screen.getByTestId('favorites-percentage')
    const favoritesCountElement = screen.getByTestId('favorites-count')
    expect(favoritesPercentageElement.innerHTML).toContain('4.00%')
    expect(favoritesCountElement.innerHTML).toContain('1')
    
  })
})