const person = {
    name: 'Tony',
    age:45,
    key:'Ironman'
}

const { name: ironmanName, age, key} = person
// const name = person.name;
// const age = person.age;
// const key = person.key;

console.log({ironmanName, age, key})

interface Hero {
    name: string,
    age: number,
    key: string,
    rank?: string
}

const useContext = ({ age, key, name, rank = 'sin rango' }: Hero) => {
    return {
        keyName: key,
        user: {
            name,
            age,
        },
        rank: rank,
    };
};

// const context = useContext(person);
const {
    rank,
    keyName, 
    user: {name}
} = useContext(person);

console.log({rank, keyName, name});