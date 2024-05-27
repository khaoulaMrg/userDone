import { Component, OnInit } from '@angular/core';
import { LatestService, PostDTO } from './latest-services/latest.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.css']
})
export class LatestComponent  implements OnInit{
  latestPosts: PostDTO[] = [];
  listOfTypes = []; // Remplir avec les types disponibles
  listOfCategories = []; // Remplir avec les catégories disponibles

  constructor(private latestService: LatestService) { }

  ngOnInit(): void {
    this.getLatestPosts();
  }

  getLatestPosts(): void {
    this.latestService.getApprovedPostsByCategory('latest')
      .subscribe(posts => {
        this.latestPosts = posts.map(post => ({
          ...post,
          processedImg: 'data:image/jpeg;base64,' + post.byteImg
        }));
      });
  }
  getFirstThreePostsByType(typeName: string): PostDTO[] {
    return this.latestPosts.filter(post => post.typeName === typeName).slice(0, 3);
  }
  getFirstByType(typeName: string): PostDTO[] {
    return this.latestPosts.filter(post => post.typeName === typeName).slice(0, 1);
  }
  getFirstTwoPostsByType(typeName: string): PostDTO[] {
    return this.latestPosts.filter(post => post.typeName === typeName).slice(0, 2);
  }
}
