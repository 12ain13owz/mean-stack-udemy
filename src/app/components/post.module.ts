import { NgModule } from '@angular/core';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { PostRoutingModule } from './post-routing.module';
import { FormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [PostCreateComponent, PostListComponent, ErrorComponent],
  imports: [CoreModule, RouterModule, PostRoutingModule, FormsModule],
})
export class PostModule {}
