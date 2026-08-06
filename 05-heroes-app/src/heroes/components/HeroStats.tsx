import { Badge } from "@/components/ui/badge"
import { Heart, Trophy, Users, Zap } from "lucide-react"
import { HeroStatCard } from "./HeroStatCard"
import { useHeroSummary } from "../hooks/useHeroSummary";
import { use } from "react";
import { FavoriteHeroContext } from "../context/FavoriteHeroCOntext";

export const HeroStats = () => {

  const { data: summary } = useHeroSummary();
  const { favoriteCount} = use(FavoriteHeroContext);

  if (!summary) {
    return <h3>Loading...</h3>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

      <HeroStatCard
        title="Total de personajes"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-2xl font-bold">{summary?.totalHeroes}</div>
        <div className="flex gap-1 mt-2">
          <Badge variant="secondary" className="text-xs">
            {summary?.heroCount} Heroes
          </Badge>
          <Badge variant="destructive" className="text-xs">
            {summary?.villainCount} Villanos
          </Badge>
        </div>
      </HeroStatCard>

      {/* TODO: calcular este valor */}
      <HeroStatCard
        title="Favoritos"
        icon={<Heart className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-2xl font-bold text-red-600" data-testid="favorites-count">
          {favoriteCount}
        </div>
        <p className="text-xs text-muted-foreground" data-testid="favorites-percentage">
          {(favoriteCount/summary?.totalHeroes *100).toFixed(2)}% of total
        </p>
      </HeroStatCard>

      <HeroStatCard
        title="Mas fuerte"
        icon={<Zap className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-lg font-bold">{summary?.strongestHero.alias}</div>
        <p className="text-xs text-muted-foreground">Strength: {summary?.strongestHero.strength}/10</p>
      </HeroStatCard>

      <HeroStatCard
        title="Más inteligente"
        icon={<Trophy className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-lg font-bold">{summary?.smartestHero.alias}</div>
        <p className="text-xs text-muted-foreground">Intelligence: {summary?.smartestHero.intelligence}/10</p>
      </HeroStatCard>

    </div>
  )
}
