import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostDTO } from '../../latest/latest-services/latest.service';

@Injectable({
  providedIn: 'root'
})
export class FirstService {
  private SERVER_URL = 'http://localhost:8081/api/customer';

  constructor(private http: HttpClient) { }

  archiveAndRemovePost(postId: number): Observable<void> {
    console.log(`Calling archiveAndRemovePost for post ID: ${postId}`);
    return this.http.put<void>(`${this.SERVER_URL}/post/${postId}/archive-and-remove`, {});
  }

  getArchivedPosts(): Observable<PostDTO[]> {
    console.log('Fetching archived posts');
    return this.http.get<PostDTO[]>(`${this.SERVER_URL}/posts/archived`);
  }
}
