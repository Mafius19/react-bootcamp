
import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs"
import { getHeroesByPageAction } from "@/heroes/actions/get-heroes-by-page.action"
import { useSearchParams } from "react-router"


export const HomePage = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get('tab') ?? 'all';
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '6';
  // const [activeTab, setActiveTab] = useState<'all' | 'favorites' | 'heroes' | 'villains'>('all')

  const selectedTab = useMemo(() => {
    const ValidatedTabs = ['all' , 'favorites' , 'heroes' , 'villains']
    return ValidatedTabs.includes(activeTab) ? activeTab : 'all'
  }, [activeTab])

  const { data : heroesResponse } = useQuery({
    queryKey: ['heroes', {page, limit}], //tambien deben ir los argumentos de la funcion de abajo
    queryFn: () => getHeroesByPageAction(+page, +limit), //recibo 2 argumentos page y limit
    staleTime: 1000 * 60 * 5 
  })

  // useEffect(() => {
  //   getHeroesByPageAction().then()
  // },[])

  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron title="Universo de Superhéroes" description="Descubre, explora y administra super héroes y villanos" />

        <CustomBreadCrumbs currentPage="Super Héroes"/>

        {/* Stats Dashboard */}
        <HeroStats />



        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all"
              onClick={() => setSearchParams(prev => {
                prev.set('tab', 'all')
                return prev;
              })}
            >
              All Characters (16)
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2"
              onClick={() => setSearchParams(prev => {
                prev.set('tab', 'favorites')
                return prev;
              })}
            >
              Favorites (3)
            </TabsTrigger>
            <TabsTrigger value="heroes"
              onClick={() => setSearchParams(prev => {
                prev.set('tab', 'heroes')
                return prev;
              })}
            >
              Heroes (12)
            </TabsTrigger>
            <TabsTrigger value="villains"
              onClick={() => setSearchParams(prev => {
                prev.set('tab', 'villains')
                return prev;
              })}
            >
              Villains (2)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {/* Mostrar todos los personajes */}
            <HeroGrid heroes= {heroesResponse?.heroes ?? []}/>
          </TabsContent>
          <TabsContent value="favorites">
            {/* Mostrar todos los personajes favoritos */}
            <HeroGrid heroes= {[]}/>
          </TabsContent>
          <TabsContent value="heroes">
            {/* Mostrar todos los heroes */}
            <HeroGrid heroes= {heroesResponse?.heroes ?? []}/>
          </TabsContent>
          <TabsContent value="villains">
            {/* Mostrar todos los villanos */}
            <HeroGrid heroes= {heroesResponse?.heroes ?? []}/>
          </TabsContent>
        </Tabs>


        {/* Pagination */}
        <CustomPagination totalPages={heroesResponse?.pages ?? 1}/>
      </>
    </>
  )
}
