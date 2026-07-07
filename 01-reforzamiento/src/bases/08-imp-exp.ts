import { heroes, type Hero } from '../data/heroes.data'


const getHeroById = (id: number): Hero | undefined => {
    const hero = heroes.find( (hero) => {
        return hero.id === id 
    });

    // if(!hero) {
    //     throw new Error(`No existe un heroe con el id ${id}`)
    // }

    return hero;
};

console.log(getHeroById(1));
