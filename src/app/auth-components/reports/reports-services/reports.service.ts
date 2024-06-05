import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostDTO } from '../../latest/latest-services/latest.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private SERVER_URL = 'http://localhost:8081/api/customer';

constructor(private http: HttpClient) { }

archiveAndRemovePost(id: number): Observable<void> {
  return this.http.put<void>(`${this.SERVER_URL}/${id}/archive`, {});
}

getArchivedPostsByType(type: string): Observable<PostDTO[]> {
  const url = `${this.SERVER_URL}/posts/archived?type=${type}`;
  return this.http.get<PostDTO[]>(url);
}
archivePost(postId: number): Observable<void> {
return this.http.put<void>(`${this.SERVER_URL}/posts/${postId}/archive`, {});
}

}