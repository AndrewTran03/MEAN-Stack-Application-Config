// Shared Typescript Types/Interfaces/Other Global-Variables Used Throughout the Project:

// Reference: https://www.totaltypescript.com/concepts/the-prettify-helper
type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

enum HTTP_REQUEST_METHODS {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
    HEAD = "HEAD",
    OPTIONS = "OPTIONS",
    DEFAULT_DOES_NOT_WORK = "DEFAULT_DOES_NOT_WORK"
}

enum BACKEND_API_ENDPOINTS {
    ALIENS = "/api/alien"
}

const backendUrlBase = "http://localhost:3000";

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

// Required for CRUD Operations with the fetch() API:
type JsonRequestConfig = {
    method: keyof typeof HTTP_REQUEST_METHODS;
    headers?: Record<string, string>;
    body?: string;
};

type Alien = Prettify<
    MongoDBEntry & {
        name: string;
        tech: string;
        age: number;
        sub: boolean;
    }
>;

export { Generic_User, HTTP_REQUEST_METHODS, BACKEND_API_ENDPOINTS, backendUrlBase, Alien, JsonRequestConfig };
