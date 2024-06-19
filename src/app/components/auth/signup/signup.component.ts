import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  private subscription: Subscription;
  isLoading: boolean = false;

  authService = inject(AuthService);

  email: string = 'test@t.com';
  password: string = '123456';

  ngOnInit() {
    this.subscription = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSingup(form: NgForm) {
    if (form.invalid) return;

    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password);
  }
}
