import { Component, OnInit } from '@angular/core';
import { LatestService, PostDTO } from '../latest/latest-services/latest.service';
import { FirstService } from '../first/first-services/first.service';

@Component({
  selector: 'app-maroc',
  templateUrl: './maroc.component.html',
  styleUrls: ['./maroc.component.css']
})
export class MarocComponent implements OnInit {
  marocPosts: PostDTO[] = [];
  currentFirstPost: PostDTO | undefined;

  constructor(private latestService: LatestService, private firstService: FirstService) { }

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.getMarocPosts();
  }

  getMarocPosts(): void {
    console.log('getMarocPosts called');
    this.latestService.getApprovedPostsByCategory('maroc')
      .subscribe(posts => {
        console.log('getApprovedPostsByCategory response:', posts);
        this.marocPosts = posts.map(post => ({
          ...post,
          processedImg: 'data:image/jpeg;base64,' + post.byteImg
        }));
        this.currentFirstPost = this.getFirstByType('first')[0];
      });
  }

  addNewPost(newPost: PostDTO): void {
    console.log('addNewPost called with:', newPost);
    if (newPost.typeName === 'first') {
      if (this.currentFirstPost) {
        console.log(`Archiving and removing current first post with ID: ${this.currentFirstPost.id}`);
        this.firstService.archiveAndRemovePost(this.currentFirstPost.id).subscribe({
          next: () => {
            console.log(`Post with ID: ${this.currentFirstPost!.id} archived and removed`);
            this.marocPosts = this.marocPosts.filter(post => post.id !== this.currentFirstPost!.id);
            this.currentFirstPost = newPost;
            this.marocPosts.unshift(newPost);
          },
          error: (err) => {
            console.error('Error archiving post:', err);
          }
        });
      } else {
        console.log('No current first post. Adding new first post.');
        this.currentFirstPost = newPost;
        this.marocPosts.unshift(newPost);
      }
    }
  }

  getFirstByType(typeName: string): PostDTO[] {
    console.log('getFirstByType called with typeName:', typeName);
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