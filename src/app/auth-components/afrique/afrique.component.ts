import { Component, OnInit } from '@angular/core';
import { LatestService, PostDTO } from '../latest/latest-services/latest.service';

@Component({
  selector: 'app-afrique',
  templateUrl: './afrique.component.html',
  styleUrl: './afrique.component.css'
})
export class AfriqueComponent implements OnInit {
  afriquePosts: PostDTO[] = [];
  listOfTypes = []; // Remplir avec les types disponibles
  listOfCategories = []; // Remplir avec les catégories disponibles

  constructor(private latestService: LatestService) { }

  ngOnInit(): void {
    this.getMarocPosts();
  }

  getMarocPosts(): void {
    this.latestService.getApprovedPostsByCategory('afrique')
      .subscribe(posts => {
        this.afriquePosts = posts.map(post => ({
          ...post,
          processedImg: 'data:image/jpeg;base64,' + post.byteImg
        }));
      });
  }

  getFirstThreePostsByType(typeName: string): PostDTO[] {
    return this.afriquePosts.filter(post => post.typeName === typeName).slice(0, 3);
  }
  getFirstByType(typeName: string): PostDTO[] {
    return this.afriquePosts.filter(post => post.typeName === typeName).slice(0, 1);
  }
  getFirstTwoPostsByType(typeName: string): PostDTO[] {
    return this.afriquePosts.filter(post => post.typeName === typeName).slice(0, 2);
  
}

}
