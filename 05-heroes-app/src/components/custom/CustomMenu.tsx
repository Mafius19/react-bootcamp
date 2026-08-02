import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { Link, useLocation } from 'react-router'

export const CustomMenu = () => {
  const { pathname } = useLocation()

  const isActive = (path: string) => pathname === path

  return (
    <NavigationMenu className='py-5'>
      <NavigationMenuList>
        {/* Home */}
        <NavigationMenuItem>
          <NavigationMenuLink
            render={<Link to="/" />}
            className={cn(isActive('/') && ` bg-slate-300 rounded-md`,navigationMenuTriggerStyle() ,'p-2')}
          >
            Inicio
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Search */}
        <NavigationMenuItem>
          <NavigationMenuLink
            render={<Link to="/search" />}
            className={cn(isActive('/search') && ` bg-slate-300 rounded-md`,navigationMenuTriggerStyle() ,'p-2')}
          >
            Buscar Superhéroe
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
