import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from '../../../post.models';
import { StorageService } from '../../../auth-services/storage-service/storage.service';

export interface PostDTO {
  id: number;
  name: string;
  content: string;
  text: string;

  postedBy: string;
  date: Date;
  approved: boolean;
  posted: boolean;
  archived: boolean;
  byteImg: string;
  processedImg?: string; 
  typeName: string;
  img: string;
  // Ajout de la propriété typeName
  // Ajoutez cette propriété avec le '?' pour indiquer qu'elle est facultative
}


@Injectable({
  providedIn: 'root'
})
export class LatestService {
  private SERVER_URL = "http://localhost:8081/api/customer/";

  constructor(private http: HttpClient, private storageService: StorageService) { }

  getAllCategories(): Observable<any> {
    return this.http.get(this.SERVER_URL + "cats", {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError)
    );
  }
// latest.service.ts

getApprovedPostsByCategory(category: string): Observable<PostDTO[]> {
  return this.http.get<PostDTO[]>(`${this.SERVER_URL}posts/approved-by-category?category=${category}`, {
    headers: this.createAuthorizationHeader(),
  }).pipe(
    catchError(this.handleError)
  );
}

  private createAuthorizationHeader(): HttpHeaders {
    const token = this.storageService.getToken();
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    } else {
      return new HttpHeaders();
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    return throwError(errorMessage);
  }
  getPostById(id: number): Observable<PostDTO> {
    return this.http.get<PostDTO>(`${this.SERVER_URL}posts/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  


  archivePost(postId: number): Observable<void> {
    return this.http.put<void>(`${this.SERVER_URL}/post/${postId}/archive`, {});
  }
  

}
