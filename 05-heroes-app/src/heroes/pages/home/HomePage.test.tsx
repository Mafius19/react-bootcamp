import { beforeEach, describe, expect, test, vi } from "vitest";
import { HomePage } from "./HomePage";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoriteHeroProvider } from "@/heroes/context/FavoriteHeroCOntext";

vi.mock('@/heroes/hooks/usePaginatedHero')

const mockUsePaginatedHero = vi.mocked(usePaginatedHero);

mockUsePaginatedHero.mockReturnValue({
  data: [],
  isLoading: false,
  isError: false,
  isSuccess: true
} as unknown as ReturnType<typeof usePaginatedHero>)

const queryClient = new QueryClient();

const renderHomePage = (initialEntries: string[] = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <FavoriteHeroProvider>
        <QueryClientProvider client={queryClient}>
          <HomePage />
        </QueryClientProvider>
      </FavoriteHeroProvider>
    </MemoryRouter>
  )
}


describe('HomePage', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should render HomePage with default values', () => {
    const { container } = renderHomePage()
    expect(container).toMatchSnapshot()
  });

  test('should call usePaginatedHero with default values', () => {
    renderHomePage()
    expect(mockUsePaginatedHero).toHaveBeenCalledWith(1, 6, 'all');
  });

  test('should call usePaginatedHero with custom query params', () => {
    renderHomePage(['/?page=2&limit=10&category=villain'])
    expect(mockUsePaginatedHero).toHaveBeenCalledWith(2, 10, 'villain');
  });

  test('should call usePaginatedHero with default page and limit on tab clicked', () => {
    renderHomePage(['/?tab=favorites&page=2&limit=10'])
    // const[allTabs, favoriteTabs, heroesTab, villainsTab] = screen.getAllByRole('tab')
    const[, , , villainsTab] = screen.getAllByRole('tab')
    screen.debug(villainsTab)
    fireEvent.click(villainsTab);
    expect(mockUsePaginatedHero).toHaveBeenCalledWith(1,10,'villain')
  });
})