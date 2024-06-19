import { Component } from '@angular/core';
import { Post } from '../../post.model';
import { PostService } from '../../post.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent {
  private subscription = new Subscription();
  posts: Post[] = [];
  isLoading: boolean = false;
  totalPosts: number = 0;
  postsPerPage: number = 5;
  currentPage: number = 1;
  pageSizeOptins: number[] = [1, 2, 5, 10];

  userIsAuthenticated: boolean = false;
  userId: string;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();

    this.subscription.add(
      this.postService
        .getPostUpdateListener()
        .subscribe(({ posts, postCount }) => {
          this.posts = posts;
          this.totalPosts = postCount;
          setTimeout(() => {
            this.isLoading = false;
          }, 200);
        })
    );

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.subscription.add(
      this.authService.getAuthStatusListener().subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDelete(id: string): void {
    this.isLoading = true;
    this.postService.deletePost(id).subscribe(
      () => {
        this.postService.getPosts(this.postsPerPage, this.currentPage);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
  }
}
