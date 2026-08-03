import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router";
import { searchHeroesAction } from "@/heroes/actions/search-heroes.actions";

export const SearchPage = () => {

  //TODO: useQuery

  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') ?? undefined;

  const { data: heroes} = useQuery({
    queryKey: ['search', {name} ],
    queryFn: () => searchHeroesAction({name}),
    staleTime: 1000*6*5, //5 minutos
    retry: false,
  })

  // if(!heroes) return <h3>searching...</h3>
  return (
    <>
      <CustomJumbotron title="Búsqueda de Superhéroes" description="Descubre, explora y administra super héroes y villanos" />
      
      <CustomBreadCrumbs currentPage="Buscador de Héroes"
        // breadcrumbs={[
        //   {label: 'Home 1', to: '/'},
        //   {label: 'Home 2', to: '/'},
        //   {label: 'Home 3', to: '/'},
        // ]}
      />
      {/* Stats Dashboard */}
      <HeroStats/>

      {/* Filters and Search */}
      <SearchControls/>

      {/* Heroes buscados */}
      { heroes && (
        <HeroGrid heroes={heroes}/>
      )}
    </>
  )
}

export default SearchPage;
