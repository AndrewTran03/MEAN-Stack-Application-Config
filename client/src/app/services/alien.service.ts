import { Injectable } from "@angular/core";
import { JsonRequestConfig, backendUrlBase, BACKEND_API_ENDPOINTS, AlienBase } from "../shared/types";
import { Alien, HTTP_REQUEST_METHODS } from "../shared/types";
import { FrontendParser } from "../shared/frontend.parser";
import axios, { AxiosInstance } from "axios";

// Reference: https://jasonwatmore.com/post/2021/09/21/fetch-http-delete-request-examples
@Injectable({
    providedIn: "root"
})
export class AlienService {
    readonly aliensMongoDBURL = `${backendUrlBase}${BACKEND_API_ENDPOINTS.ALIENS}`;
    jsonRequest: JsonRequestConfig = {
        method: HTTP_REQUEST_METHODS.DEFAULT_DOES_NOT_WORK
    };
    private axiosInstance: AxiosInstance;

    constructor() {
        console.log(`BACKEND API URL: ${this.aliensMongoDBURL}`);
        this.axiosInstance = axios.create({
            baseURL: this.aliensMongoDBURL,
            headers: { "Content-Type": "application/json" },
            timeout: 10000
        });
        // this.axiosInstance.get<Alien>("")
        //     .then()
        //     .catch();
    }

    async getAliens(): Promise<Alien[]> {
        this.jsonRequest.method = HTTP_REQUEST_METHODS.GET;
        this.jsonRequest.headers = undefined;
        this.jsonRequest.body = undefined;
        this.printJsonReqObjConfigHelper();
        // TODO: Update with better error-handling logic
        return await fetch(this.aliensMongoDBURL, this.jsonRequest)
            .then((res) => res.json())
            .then(FrontendParser.parseAlienEntries);
    }

    async insertAlien(alienToInsert: AlienBase) {
        this.jsonRequest.method = HTTP_REQUEST_METHODS.POST;
        this.jsonRequest.headers = { "Content-Type": "application/json" };
        this.jsonRequest.body = JSON.stringify(alienToInsert);
        this.printJsonReqObjConfigHelper();
        // TODO: Update with better error-handling logic
        return await fetch(this.aliensMongoDBURL, this.jsonRequest);
    }

    async deleteAlien(alienToDeleteId: string) {
        this.jsonRequest.method = HTTP_REQUEST_METHODS.DELETE;
        this.jsonRequest.headers = undefined;
        this.jsonRequest.body = JSON.stringify({ _id: alienToDeleteId });
        this.printJsonReqObjConfigHelper();
        // TODO: Update with better error-handling logic
        return await fetch(this.aliensMongoDBURL, this.jsonRequest);
    }

    async updateAlien(alienToUpdate: Alien) {
        this.jsonRequest.method = HTTP_REQUEST_METHODS.PUT;
        this.jsonRequest.headers = { "Content-Type": "application/json" };
        this.jsonRequest.body = JSON.stringify(alienToUpdate);
        this.printJsonReqObjConfigHelper();
        // TODO: Update with better error-handling logic
        return await fetch(this.aliensMongoDBURL, this.jsonRequest);
    }

    printJsonReqObjConfigHelper() {
        console.log(`${this.jsonRequest.method}`, JSON.stringify(this.jsonRequest));
    }
}
