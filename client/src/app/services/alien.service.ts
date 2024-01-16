import { Injectable } from "@angular/core";
import { JsonRequestConfig, backendUrlBase, BACKEND_API_ENDPOINTS, AlienBase, APIErrorResponse } from "../shared/types";
import { Alien, HTTP_REQUEST_METHODS } from "../shared/types";
import { FrontendParser } from "../shared/frontend.parser";
import { APIRequestError } from "../shared/api.error";
import axios, { AxiosError, AxiosInstance } from "axios";
import { AlienSchema } from "./alien.schema";
import { fromZodError } from "zod-validation-error";

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
    }

    async getAliens(): Promise<Alien[]> {
        this.jsonRequest.method = HTTP_REQUEST_METHODS.GET;
        this.jsonRequest.headers = undefined;
        this.jsonRequest.body = undefined;
        this.printJsonReqObjConfigHelper();

        // FETCH:
        // const res = await fetch(this.aliensMongoDBURL, this.jsonRequest);
        // try {
        //     if (!res.ok) {
        //         const { errorLoc, errorMsg }: APIErrorResponse = await res.json();
        //         throw new APIRequestError("Failed to get Aliens!", { errorLoc, errorMsg });
        //     }
        //     const data = (await res.json()) as any[];
        //     return FrontendParser.parseAlienEntries(data);
        // } catch (err: any) {
        //     const error = err as APIRequestError;
        //     console.error(error.toString());
        //     return [];
        // }

        // AXIOS:
        return await this.axiosInstance
            .get(this.aliensMongoDBURL)
            .then((res) => {
                const data = res.data as any[];
                return FrontendParser.parseAlienEntries(data);
            })
            .catch((err: AxiosError) => {
                const errorConfig = err.response?.data as APIErrorResponse;
                const error = new APIRequestError("Failed to GET all aliens", errorConfig);
                console.error(error.toString());
                return [];
            });
    }

    async insertAlien(alienToInsert: AlienBase): Promise<void> {
        this.jsonRequest.method = HTTP_REQUEST_METHODS.POST;
        this.jsonRequest.headers = { "Content-Type": "application/json" };
        this.jsonRequest.body = JSON.stringify(alienToInsert);
        this.printJsonReqObjConfigHelper();

        const result = AlienSchema.safeParse(alienToInsert);
        if (!result.success) {
            console.error(fromZodError(result.error));
            // alert(fromZodError(result.error));
        }

        await this.axiosInstance
            .post(this.aliensMongoDBURL, alienToInsert)
            .then((res) => console.log(res))
            .catch((err: AxiosError) => {
                const errorConfig = err.response?.data as APIErrorResponse;
                const error = new APIRequestError("Failed to INSERT this alien", errorConfig);
                console.error(error.toString());
            });
    }

    async deleteAlien(alienToDeleteId: string): Promise<void> {
        this.jsonRequest.method = HTTP_REQUEST_METHODS.DELETE;
        this.jsonRequest.headers = undefined;
        this.jsonRequest.body = JSON.stringify({ _id: alienToDeleteId });
        this.printJsonReqObjConfigHelper();

        await this.axiosInstance
            .delete(`${this.aliensMongoDBURL}/${alienToDeleteId}`)
            .then((res) => console.log(res))
            .catch((err: AxiosError) => {
                const errorConfig = err.response?.data as APIErrorResponse;
                const error = new APIRequestError("Failed to DELETE this alien", errorConfig);
                console.error(error.toString());
            });
    }

    async updateAlien(alienToUpdate: Alien): Promise<void> {
        this.jsonRequest.method = HTTP_REQUEST_METHODS.PUT;
        this.jsonRequest.headers = { "Content-Type": "application/json" };
        this.jsonRequest.body = JSON.stringify(alienToUpdate);
        this.printJsonReqObjConfigHelper();

        const { _id, __v, createdDate, updatedDate, ...alienToUpdateParseCheck } = alienToUpdate;
        const result = AlienSchema.safeParse(alienToUpdateParseCheck);
        if (!result.success) {
            console.error(fromZodError(result.error));
        }

        await this.axiosInstance
            .put(this.aliensMongoDBURL, alienToUpdate)
            .then((res) => console.log(res))
            .catch((err: AxiosError) => {
                const errorConfig = err.response?.data as APIErrorResponse;
                const error = new APIRequestError("Failed to UPDATE this alien", errorConfig);
                console.error(error.toString());
            });
    }

    private printJsonReqObjConfigHelper() {
        console.log(`${this.jsonRequest.method}`, JSON.stringify(this.jsonRequest));
    }
}
