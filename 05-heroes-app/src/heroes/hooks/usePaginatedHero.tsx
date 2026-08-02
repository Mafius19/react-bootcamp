import { useQuery } from "@tanstack/react-query"
import { getHeroesByPageAction } from "../actions/get-heroes-by-page.action"


export const usePaginatedHero = (page : number, limit: number, category = 'all') => {
  
  return useQuery({
    queryKey: ['heroes', {page, limit, category}], //tambien deben ir los argumentos de la funcion de abajo
    queryFn: () => getHeroesByPageAction(page, limit, category), //recibo 2 argumentos page y limit
    staleTime: 1000 * 60 * 5 
  })
}
