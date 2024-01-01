// Shared Typescript Types/Interfaces/Other Global-Variables Used Throughout the Project:

// Reference: https://www.totaltypescript.com/concepts/the-prettify-helper
type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

// Example
type Generic_User = {
    id: number;
    fName: string;
};

// Required with All MongoDB Entries:
type MongoDBEntry = {
    _id: string; // Primary Key (IDentifier)
    __v: number; // Version Number (Auto-Increments - Avoiding Duplicate Entry-Modification)
};

const aliensBackendUrlBase = "http://localhost:3000/api/alien";

type Alien = Prettify<
    MongoDBEntry & {
        name: string;
        tech: string;
        age: number;
        sub: boolean;
    }
>;

enum HTTP_REQUEST_METHODS {
    GET,
    POST,
    PUT,
    DELETE,
    PATCH,
    OPTIONS,
    HEAD
}

export { Generic_User, Alien, aliensBackendUrlBase, HTTP_REQUEST_METHODS };
