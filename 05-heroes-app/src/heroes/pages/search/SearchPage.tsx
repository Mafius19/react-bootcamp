import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs";

export const SearchPage = () => {
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

        {/* Controls */}
      <SearchControls/>
    </>
  )
}

export default SearchPage;
