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

// Example Type
type GenericUser = {
    id: number;
    fName: string;
};

// Required with All MongoDB Entries:
type MongoDBEntry = {
    readonly _id: string; // Primary Key (IDentifier)
    readonly __v: number; // Version Number (Auto-Increments - Avoiding Duplicate Entry-Modification)
    readonly createdDate: string;
    readonly updatedDate: string;
};

type MongoDBCombined<T> = Prettify<MongoDBEntry & T>;

// Required for CRUD Operations with the fetch() API:
type JsonRequestConfig = {
    method: keyof typeof HTTP_REQUEST_METHODS;
    headers?: Record<string, string>;
    body?: string;
};

type APIErrorResponse = {
    errorLoc: string;
    errorMsg: string;
};

type AlienBase = {
    name: string;
    tech: string;
    age: number;
    sub: boolean;
};

type Alien = MongoDBCombined<AlienBase>;

export {
    Prettify,
    GenericUser,
    HTTP_REQUEST_METHODS,
    BACKEND_API_ENDPOINTS,
    backendUrlBase,
    MongoDBEntry,
    Alien,
    AlienBase,
    JsonRequestConfig,
    APIErrorResponse
};
