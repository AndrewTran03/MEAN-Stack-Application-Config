// Shared Typescript Types/Interfaces/Other Global-Variables Used Throughout the Project:

// Reference: https://www.totaltypescript.com/concepts/the-prettify-helper
type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

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
