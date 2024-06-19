import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CoreModule } from '../../core/core.module';
import { RouterModule } from '@angular/router';
import { PostRoutingModule } from '../post-routing.module';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [CoreModule, RouterModule, AuthRoutingModule, FormsModule],
})
export class AuthModule {}
