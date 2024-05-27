import { Component, OnInit } from '@angular/core';
import { LatestService, PostDTO } from '../latest/latest-services/latest.service';

@Component({
  selector: 'app-asie',
  templateUrl: './asie.component.html',
  styleUrl: './asie.component.css'
})
export class AsieComponent  implements OnInit {
  asiePosts: PostDTO[] = [];
  listOfTypes = []; // Remplir avec les types disponibles
  listOfCategories = []; // Remplir avec les catégories disponibles

  constructor(private latestService: LatestService) { }

  ngOnInit(): void {
    this.getMarocPosts();
  }

  getMarocPosts(): void {
    this.latestService.getApprovedPostsByCategory('asie')
      .subscribe(posts => {
        this.asiePosts = posts.map(post => ({
          ...post,
          processedImg: 'data:image/jpeg;base64,' + post.byteImg
        }));
      });
  }

  getFirstThreePostsByType(typeName: string): PostDTO[] {
    return this.asiePosts.filter(post => post.typeName === typeName).slice(0, 3);
  }
  getFirstByType(typeName: string): PostDTO[] {
    return this.asiePosts.filter(post => post.typeName === typeName).slice(0, 1);
  }
  getFirstTwoPostsByType(typeName: string): PostDTO[] {
    return this.asiePosts.filter(post => post.typeName === typeName).slice(0, 2);
  }
  
}


