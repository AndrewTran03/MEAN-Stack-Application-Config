import { Injectable } from "@angular/core";
import { aliensBackendUrlBase } from "../shared/models";
import { Alien, HTTP_REQUEST_METHODS } from "../shared/models";
import { parseAlienEntries } from "../shared/frontend.parser";

// Reference: https://jasonwatmore.com/post/2021/09/21/fetch-http-delete-request-examples
@Injectable({
    providedIn: "root"
})
export class AlienService {
    readonly aliensMongoDBURL = aliensBackendUrlBase;
    jsonRequest = {
        method: "<DEFAULT>",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Fetch POST Request Example" })
    };

    constructor() {}

    async getAliens(): Promise<Alien[]> {
        console.log(this.aliensMongoDBURL);
        return await fetch(this.aliensMongoDBURL, { method: HTTP_REQUEST_METHODS[HTTP_REQUEST_METHODS.GET] })
            .then((res) => res.json())
            .then(parseAlienEntries);
    }

    async insertAlien(alienToInsert: Alien) {
        this.jsonRequest.method = HTTP_REQUEST_METHODS[HTTP_REQUEST_METHODS.POST];
        this.jsonRequest.body = JSON.stringify(alienToInsert);
        return await fetch(this.aliensMongoDBURL, this.jsonRequest);
    }

    async deleteAlien(alienToDeleteId: string) {
        this.jsonRequest.method = HTTP_REQUEST_METHODS[HTTP_REQUEST_METHODS.PUT];
        this.jsonRequest.body = JSON.stringify({ _id: alienToDeleteId });
        return await fetch(this.aliensMongoDBURL, this.jsonRequest);
    }

    async updateAlien(alienToUpdate: Alien) {
        this.jsonRequest.method = HTTP_REQUEST_METHODS[HTTP_REQUEST_METHODS.PUT];
        this.jsonRequest.body = JSON.stringify(alienToUpdate);
        return await fetch(this.aliensMongoDBURL, this.jsonRequest);
    }
}
