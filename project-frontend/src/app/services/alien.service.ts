import { Injectable } from "@angular/core";
import { JsonRequestConfig, backendUrlBase, BACKEND_API_ENDPOINTS } from "../shared/models";
import { Alien, HTTP_REQUEST_METHODS } from "../shared/models";
import { parseAlienEntries } from "../shared/frontend.parser";

// Reference: https://jasonwatmore.com/post/2021/09/21/fetch-http-delete-request-examples
@Injectable({
    providedIn: "root"
})
export class AlienService {
    readonly aliensMongoDBURL = `${backendUrlBase}${BACKEND_API_ENDPOINTS.ALIENS}`;
    jsonRequest: JsonRequestConfig = {
        method: HTTP_REQUEST_METHODS.DEFAULT_DOES_NOT_WORK
    };

    constructor() {
        console.log(`BACKEND API URL: ${this.aliensMongoDBURL}`);
    }

    async getAliens(): Promise<Alien[]> {
        this.jsonRequest.method = HTTP_REQUEST_METHODS.GET;
        this.jsonRequest.headers = undefined;
        this.jsonRequest.body = undefined;
        this.printJsonReqObjConfigHelper();
        return await fetch(this.aliensMongoDBURL, this.jsonRequest)
            .then((res) => res.json())
            .then(parseAlienEntries);
    }

    async insertAlien(alienToInsert: Alien) {
        this.jsonRequest.method = HTTP_REQUEST_METHODS.POST;
        this.jsonRequest.headers = { "Content-Type": "application/json" };
        this.jsonRequest.body = JSON.stringify(alienToInsert);
        this.printJsonReqObjConfigHelper();
        return await fetch(this.aliensMongoDBURL, this.jsonRequest);
    }

    async deleteAlien(alienToDeleteId: string) {
        this.jsonRequest.method = HTTP_REQUEST_METHODS.DELETE;
        this.jsonRequest.headers = undefined;
        this.jsonRequest.body = JSON.stringify({ _id: alienToDeleteId });
        this.printJsonReqObjConfigHelper();
        return await fetch(this.aliensMongoDBURL, this.jsonRequest);
    }

    async updateAlien(alienToUpdate: Alien) {
        this.jsonRequest.method = HTTP_REQUEST_METHODS.PUT;
        this.jsonRequest.headers = { "Content-Type": "application/json" };
        this.jsonRequest.body = JSON.stringify(alienToUpdate);
        this.printJsonReqObjConfigHelper();
        return await fetch(this.aliensMongoDBURL, this.jsonRequest);
    }

    printJsonReqObjConfigHelper() {
        console.log(`${this.jsonRequest.method}`, JSON.stringify(this.jsonRequest));
    }
}
