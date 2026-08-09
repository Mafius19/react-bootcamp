import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { SearchControls } from './SearchControls';
import { MemoryRouter } from 'react-router';

// lo que viene es para emular un objetoGlobal usado por el componente accordion de shadcn
if (typeof window.ResizeObserver === 'undefined') {
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  window.ResizeObserver = ResizeObserver;
}

const renderWithRouter = (initialEntries: string[] = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <SearchControls />
    </MemoryRouter>
  );
};

describe('SearchControls', () => {
  test('should render SearchControls with default values', () => {
    const { container } = renderWithRouter();

    expect(container).toMatchSnapshot();
  });

  test('should set input value when search param name is set', () => {
    renderWithRouter(['/?name=Batman']);

    const input = screen.getByPlaceholderText(
      'Search heroes, villains, powers, teams...'
    );

    expect(input.getAttribute('value')).toBe('Batman');
  });

  test('should change params when input is changed and enter is pressed', () => {
    renderWithRouter(['/?name=Batman']);
    const input = screen.getByPlaceholderText(
      'Search heroes, villains, powers, teams...'
    );
    expect(input.getAttribute('value')).toBe('Batman');

    fireEvent.change(input, { target: { value: 'Superman' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(input.getAttribute('value')).toBe('Superman');
  });

  test('should change params strength when slider is changed', () => {
    renderWithRouter(['/?name=Batman&active-accordion=advanced-filters']);
    // paso extra por diferencia actualizacion de libreria de slider, ahora el valor getAttribute('value-now') se obtiene en el input dentro del slider
    const slider = screen.getByTestId('slider').getElementsByTagName('input')[0];
    screen.debug(slider)

    expect(slider.getAttribute('aria-valuenow')).toBe('0');

    fireEvent.keyDown(slider, { key: 'ArrowRight' });

    expect(slider.getAttribute('aria-valuenow')).toBe('1');
  });

  test('should accordion be open when active-accordion param is set', () => {
    renderWithRouter(['/?name=Batman&active-accordion=advanced-filters']);

    const accordion = screen.getByTestId('accordion');
    const accordionItem = accordion.querySelector('div');

    expect(accordionItem?.getAttribute('data-state')).toBe('open');
  });

  test('should accordion be closed when active-accordion param is not set', () => {
    renderWithRouter(['/?name=Batman']);

    const accordion = screen.getByTestId('accordion');
    const accordionItem = accordion.querySelector('div');

    expect(accordionItem?.getAttribute('data-state')).toBe('closed');
  });
});