import { Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { PostModule } from './components/post.module';

export const routes: Routes = [
  { path: 'test', component: TestComponent },
  { path: '', loadChildren: () => PostModule },
];
