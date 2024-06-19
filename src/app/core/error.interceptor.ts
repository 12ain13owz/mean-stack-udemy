import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, throwError } from 'rxjs';
import { ErrorComponent } from '../components/error/error.component';

// Old versions
// @Injectable()
// export class ErrorInterceptor implements HttpInterceptor {
//   private dialog = inject(MatDialog);

//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     console.log(5);
//     return next.handle(req).pipe(
//       catchError((error: HttpErrorResponse) => {
//         let errorMessage = 'An unknow error occurred!';
//         if (error.error.message) errorMessage = error.error.message;

//         this.dialog.open(ErrorComponent, { data: { message: errorMessage } });
//         return throwError(() => error);
//       })
//     );
//   }
// }

// export const ErrorInterceptorProviders = [
//   { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
// ];

import { HttpInterceptorFn } from '@angular/common/http';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const dialog = inject(MatDialog);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknow error occurred!';
      if (error.error.message) errorMessage = error.error.message;

      dialog.open(ErrorComponent, { data: { message: errorMessage } });
      return throwError(() => error);
    })
  );
};
