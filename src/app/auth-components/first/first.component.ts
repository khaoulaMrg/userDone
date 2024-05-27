import { Component, OnInit } from '@angular/core';
import { FirstService } from './first-services/first.service';
import { PostDTO } from '../latest/latest-services/latest.service';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {
  archivedPosts: PostDTO[] = [];

  constructor(private firstService: FirstService) { }

  ngOnInit(): void {
    this.getArchivedPosts();
  }

  getArchivedPosts() {
    console.log('Fetching archived posts in FirstComponent'); // Ajouter un log
    this.firstService.getArchivedPosts().subscribe(posts => {
      console.log('Archived posts fetched:', posts); // Ajouter un log
      this.archivedPosts = posts;
    }, error => {
      console.error('Error fetching archived posts:', error);
    });
  }
}
