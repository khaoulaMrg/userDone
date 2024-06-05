import { Component, OnInit } from '@angular/core';
import { PostDTO } from '../latest/latest-services/latest.service';
import { TrendService } from '../trend/trend-services/trend.service';
import { ReportsService } from './reports-services/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements  OnInit {
  archivedPosts: PostDTO[] = [];
  archivedPostsOfTypeFirst: PostDTO[] = []; // Ajout d'un tableau pour les posts archivés du type 'first'

  constructor(private reporstService: ReportsService) {}

  ngOnInit(): void {
    this.loadArchivedPostsByType('reports');
  }

  loadArchivedPostsByType(type: string): void {
    this.reporstService.getArchivedPostsByType(type).subscribe(archivedPosts => {
        this.archivedPosts = archivedPosts.map(post => ({
            ...post,
            processedImg: this.processImage(post.byteImg)
        }));
    });
}

  private processImage(base64Img: string): string {
    return `data:image/jpeg;base64,${base64Img}`;
  }
  }
  // Autres méthodes...

