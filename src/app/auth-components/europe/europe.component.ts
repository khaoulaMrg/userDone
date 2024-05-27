import { Component, OnInit } from '@angular/core';
import { LatestService, PostDTO } from '../latest/latest-services/latest.service';
import { Observable } from 'rxjs';
import { FirstService } from '../first/first-services/first.service';

@Component({
  selector: 'app-europe',
  templateUrl: './europe.component.html',
  styleUrl: './europe.component.css'
})
export class EuropeComponent implements OnInit {
  marocPosts: PostDTO[] = [];
  currentFirstPost: PostDTO | undefined;

  constructor(private latestService: LatestService, private firstService: FirstService) { }

  ngOnInit(): void {
    this.getMarocPosts();
  }

  getMarocPosts(): void {
    this.latestService.getApprovedPostsByCategory('europe')
      .subscribe(posts => {
        this.marocPosts = posts.map(post => ({
          ...post,
          processedImg: 'data:image/jpeg;base64,' + post.byteImg
        }));
        this.currentFirstPost = this.getFirstByType('first')[0];
      });
  }

  addNewPost(newPost: PostDTO): void {
    if (newPost.typeName === 'first') {
      if (this.currentFirstPost) {
        this.firstService.archiveAndRemovePost(this.currentFirstPost.id).subscribe({
          next: () => {
            this.marocPosts = this.marocPosts.filter(post => post.id !== this.currentFirstPost!.id); // Retirer l'ancien post de la liste
            this.currentFirstPost = newPost; // Assigner le nouveau post
            this.marocPosts.unshift(newPost); // Ajouter le nouveau post au début de la liste
          },
          error: (err) => {
            console.error('Error archiving post:', err);
          }
        });
      } else {
        this.currentFirstPost = newPost; // Assigner le nouveau post
        this.marocPosts.unshift(newPost); // Ajouter le nouveau post au début de la liste
      }
    }
  }


  getFirstByType(typeName: string): PostDTO[] {
    return this.marocPosts.filter(post => post.typeName === typeName).slice(0, 1);
  }
  getFirstThreePostsByType(typeName: string): PostDTO[] {
    return this.marocPosts.filter(post => post.typeName === typeName).slice(0, 3);
  }

  getFirstTwoPostsByType(typeName: string): PostDTO[] {
    return this.marocPosts.filter(post => post.typeName === typeName).slice(0, 2);
  }

  getFirstFourPostsByType(typeName: string): PostDTO[] {
    return this.marocPosts.filter(post => post.typeName === typeName).slice(0, 4);
  }
}