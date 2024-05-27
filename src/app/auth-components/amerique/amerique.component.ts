import { Component, OnInit } from '@angular/core';
import { LatestService, PostDTO } from '../latest/latest-services/latest.service';

@Component({
  selector: 'app-amerique',
  templateUrl: './amerique.component.html',
  styleUrl: './amerique.component.css'
})
export class AmeriqueComponent implements OnInit {
  ameriquePosts: PostDTO[] = [];
  listOfTypes = []; // Remplir avec les types disponibles
  listOfCategories = []; // Remplir avec les catégories disponibles

  constructor(private latestService: LatestService) { }

  ngOnInit(): void {
    this.getMarocPosts();
  }

  getMarocPosts(): void {
    this.latestService.getApprovedPostsByCategory('amerqiue')
      .subscribe(posts => {
        this.ameriquePosts = posts.map(post => ({
          ...post,
          processedImg: 'data:image/jpeg;base64,' + post.byteImg
        }));
      });
  }

  getFirstThreePostsByType(typeName: string): PostDTO[] {
    return this.ameriquePosts.filter(post => post.typeName === typeName).slice(0, 3);
  }
  getFirstByType(typeName: string): PostDTO[] {
    return this.ameriquePosts.filter(post => post.typeName === typeName).slice(0, 1);
  }
  getFirstTwoPostsByType(typeName: string): PostDTO[] {
    return this.ameriquePosts.filter(post => post.typeName === typeName).slice(0, 2);
  }
  
}
