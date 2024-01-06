// Shared Typescript Types/Interfaces/Other Global-Variables Used Throughout the Project:

type Alien = {
    name: string,
    tech: string,
    age: number,
    sub: boolean
};

type UserAuth = {
    username: string,
    password: string,
    user_level: string
}

export { Alien, UserAuth };
