import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";

export const SearchPage = () => {
  return (
    <>
      <CustomJumbotron title="Búsqueda de Superhéroes" description="Descubre, explora y administra super héroes y villanos" />
      
      {/* Stats Dashboard */}
      <HeroStats/>

        {/* Controls */}
      <SearchControls/>
    </>
  )
}

export default SearchPage;
