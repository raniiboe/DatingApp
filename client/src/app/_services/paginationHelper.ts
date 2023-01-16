import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs";
import { PaginatedResult } from "../_models/pagination";

export function getPaginatedResult<T>(url: string, params: HttpParams, http: HttpClient) {
    const paginatedReult: PaginatedResult<T> = new PaginatedResult<T>;
    return http.get<T>(url, { observe: "response", params }).pipe(
      map(response => {
        if (response.body) {
          paginatedReult.result = response.body;
        }
        const pagination = response.headers.get('Pagination');
        if (pagination) {
          paginatedReult.pagination = JSON.parse(pagination);
        }
        return paginatedReult;
      })

    );
  }

  export function getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();

    params = params.append("pagenumber", pageNumber);
    params = params.append("pageSize", pageSize);
    
    return params;
  }