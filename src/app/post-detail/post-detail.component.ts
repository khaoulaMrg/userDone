import { Component, OnInit } from '@angular/core';
import { LatestService, PostDTO } from '../auth-components/latest/latest-services/latest.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit {
  post: PostDTO | null = null;

  constructor(
    private route: ActivatedRoute,
    private latestService: LatestService
  ) {}

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      const id = +idParam;
      if (!isNaN(id)) {
        this.latestService.getPostById(id).subscribe(post => {
          if (post) {
            this.post = {
              ...post,
              processedImg: this.processImage(post.img)
            };
            console.log('Fetched post:', post);
            console.log('Processed post:', this.post);
          }
        });
      }
    }}
private processImage(base64Img: string): string {
  return `data:image/jpeg;base64,${base64Img}`;
}
}