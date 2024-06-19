import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from '../../post.service';
import { Post } from '../../post.model';
import { mimeType } from './mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent {
  private subscription: Subscription;
  private mode = mode.create;
  private postId: string;

  post: Post = {
    title: '',
    content: '',
  };
  isLoading: boolean = false;
  form: FormGroup<Form>;
  imagePreview: string | ArrayBuffer;

  constructor(
    private postService: PostService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, {
        validators: [Validators.required],
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });
  }

  ngOnInit(): void {
    this.subscription = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.isLoading = true;
        this.mode = mode.edit;
        this.postId = paramMap.get('postId');
        this.postService.getPost(this.postId).subscribe((postData) => {
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            imagePath: postData.imagePath,
            creator: postData.creator,
          };
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            image: this.post.imagePath,
          });

          setTimeout(() => (this.isLoading = false), 500);
        });
      } else {
        this.mode = mode.create;
        this.postId = null;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSavePost() {
    if (this.form.invalid) return;
    this.isLoading = true;

    const post: Post = {
      id: this.postId,
      title: this.form.value.title,
      content: this.form.value.content,
    };

    if (this.mode === mode.create)
      this.postService.addPost(post, this.form.value.image);
    if (this.mode === mode.edit)
      this.postService.updatePost(post, this.form.value.image);

    this.form.reset();
    setTimeout(() => (this.isLoading = false), 500);
  }

  onImagePicked(e: Event) {
    const event = <HTMLInputElement>e.target;
    const file = event.files[0];

    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }

  get title() {
    return this.form.controls['title'];
  }

  get content() {
    return this.form.controls['content'];
  }

  get image() {
    return this.form.controls['image'];
  }
}

enum mode {
  create,
  edit,
}

interface Form {
  title: FormControl<string>;
  content: FormControl<string>;
  image: FormControl<File | string>;
}

// newPost: string = 'No content';
// input3: string;
// @ViewChild('postInput', { static: true }) input: ElementRef;
// @ViewChild('textInput', { static: true }) input2: ElementRef;
// onAddPost() {
//   this.newPost = "The user's new post";
//   const input = this.input.nativeElement as HTMLInputElement;
//   const input2 = <HTMLInputElement>this.input2.nativeElement;
//   console.log('Input 1', input.value);
//   console.log('Input 2', input2.value);
//   console.log('Input 3', this.input3);
// }
