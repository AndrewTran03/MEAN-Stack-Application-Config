import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable } from "rxjs";

export type Data = {
  name: string;
  age: number;
  createdAt: Date;
};

export const DEFAULT_DATA: Data = {
  name: "",
  age: 0,
  createdAt: new Date(),
};

// export class Data {
//   name: string = '';
//   age: number = 0;
//   createdAt: Date = new Date();

//   static asData(content: Partial<Data>): Data {
//     const data: Data = Object.assign(new Data(), content);
//     if (content.createdAt) {
//         data.createdAt = new Date(content.createdAt);
//     }
//     return data;
//   }

//   static asDatas(jsonArray: Partial<Data>[]): Data[] {
//     return jsonArray.map((datum) => Data.asData(datum));
//   }

//   json() {
//     return JSON.stringify(this);
//   }
// }

type HttpResponse<T> = { response: Partial<T> };

export class ExecutionService {
  constructor(private readonly httpClient: HttpClient) { }

  // getAllEntries(data: Data[]): Observable<Data[]> {
  //   return this.httpClient.get<{ response: Data[] }>("/api/data")
  //     .pipe(
  //       map(res => res.response),
  //       map((response) => Data.asDatas(response)));
  // }

  getAllEntries(): Observable<Data[]> {
    return this.httpClient.get<Data[]>("/api/data")
      .pipe(
        map(
          (responses: Data[]) => responses.map((response) => ({ ...response, createdAt: new Date(response.createdAt) }))
        ),
        catchError((error: Error) => {
          console.error('Error fetching data:', error.message);
          throw error;
        })
    );

    // return this.httpClient.get<Data[]>("/api/data")
    //   .pipe(
    //     map(
    //       (responses: Data[]) => responses.map((response) => ({ ...response, createdAt: new Date(response.createdAt) }))
    //     ), // <-- Closing parenthesis added here
    //     catchError((error) => {
    //       console.error('Error fetching data:', error);
    //       throw error;
    //     })
    // );
  }

  // getNewEntries(): Observable<Data> {
  //   return this.httpClient.get<Data>("/api/data/latest")
  //     .pipe(
  //       map((response) => ({ ...response, createdAt: new Date(response.createdAt) })),
  //     );
  // }

  // deleteEntry(data: Data): Observable<void> {
  //   return this.httpClient.delete<HttpResponse<void>>("/api/data", HttpRequestBody(data))
  //     .pipe(map(res => res.response));
  // };

  // updateEntry(data: Data): Observable<Data> {
  //   return this.httpClient.put<Data>("/api/data", JSON.stringify(data))
  //     .pipe(map((response) => ({ ...response, createdAt: new Date(response.createdAt) })));
  // }

  // async fetchEntries(): Promise<Data[]> {
  //   return await fetch("/api/data").then((response) => {
  //     if (!response.status.toString().startsWith("2")) { // !response.ok
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     return response.json() as Data;
  //   })
  //   .then((data: Data[]) => data.map((datum) => ({ ...datum, createdAt: new Date(datum.createdAt) })))
  //   .catch(error => {
  //     console.error('Error fetching data:', error);
  //     throw error;
  //   });
  // }
}