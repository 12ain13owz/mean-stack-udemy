import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { CoreModule } from '../../core/core.module';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [CoreModule, RouterLink, RouterLinkActive],
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private subscription: Subscription;
  userIsAuthenticated: boolean = false;

  ngOnInit(): void {
    this.authService.getIsAuth();
    this.userIsAuthenticated = this.authService.getIsAuth();

    this.subscription = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
