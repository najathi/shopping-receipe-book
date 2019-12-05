import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import {User} from './user.model';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

export interface AuthResponseData {
  //kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  //user = new Subject<User>();
  user = new BehaviorSubject<User>(null);
  // BehaviorSubject generally just like other subject which means we can call next to emit a value and we can subscribe to it to be informed about new values. The differences is that behaviour is subject also gives subscribers immediate access to the previously emitted value. even if they haven't subscribed at the point of time that value was emitted.

  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {
  }

  signUp(email: string, password: string,) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey, {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      /*catchError(errorRes => {
        let errorMessage = 'An unknown error occurred!';

        if (!errorRes.error || !errorRes.error.error) {
          throwError(errorMessage);
        }

        switch (errorRes.error.error.message) {
          case  'EMAIL_EXISTS': {
            errorMessage = 'This email exists already.';
            break;
          }
          case 'OPERATION_NOT_ALLOWED': {
            errorMessage = 'Password sign-in is disabled for this project';
            break;
          }
          case 'TOO_MANY_ATTEMPTS_TRY_LATER': {
            errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
            break;
          }
          default:
            throwError(errorMessage);
        }
        return throwError(errorMessage);
      })*/
      catchError(this.handleError),

      //tap() - tap is a rxjs operator that allows us to perform some action without changing the response(before the response data).
      /*tap(
        resData => {
          /!*const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);

          const user = new User(
            resData.email,
            resData.localId,
            resData.idToken,
            expirationDate
          );

          // user Subject
          this.user.next(user);*!/
        }
      )*/
      tap(resDate => {
        this.handleAuthentication(
          resDate.email,
          resDate.localId,
          resDate.idToken,
          +resDate.expiresIn
        );
      })
    );
  }

  logIn(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    ).pipe(
      /*catchError (errorRes => {
        let errorMessage = 'An unknown error occurred!';

        if (!errorRes.error || !errorRes.error.error) {
          throwError(errorMessage);
        }

        switch (errorRes.error.error.message) {
          case  'EMAIL_NOT_FOUND': {
            errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted';
            break;
          }
          case 'INVALID_PASSWORD': {
            errorMessage = 'Password sign-in is disabled for this project';
            break;
          }
          case 'USER_DISABLED': {
            errorMessage = 'The user account has been disabled by an administrator';
            break;
          }
          default:
            throwError(errorMessage);
        }
        return throwError(errorMessage);
      })*/
      catchError(this.handleError),
      tap(resDate => {
        this.handleAuthentication(
          resDate.email,
          resDate.localId,
          resDate.idToken,
          +resDate.expiresIn
        );
      })
    );
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    //JSON.parse() - Converts a JavaScript Object Notation (JSON) string into an js object.

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);

      // auto logout
      const expirationDate = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      // getTime() - Gets the time value in milliseconds.
      this.autoLogout(expirationDate);
    }

  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);

    //clear the localStorage
    //localStorage.clear();
    localStorage.removeItem('userData');

    // clear the setTimeOut
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    console.log('expirationDuration', expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );

    // user Subject
    this.user.next(user);

    // auto logout
    this.autoLogout(expiresIn * 1000);

    localStorage.setItem('userData', JSON.stringify(user));
    // JSON.stringify() - Converts a JavaScript value to a JavaScript Object Notation (JSON) string.

  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (!errorRes.error || !errorRes.error.error) {
      throwError(errorMessage);
    } else {
      switch (errorRes.error.error.message) {
        case  'EMAIL_NOT_FOUND':
          errorMessage = 'The email does not exists';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'Password is not correct';
          break;
        case 'USER_DISABLED':
          errorMessage = 'The user account has been disabled by an administrator';
          break;
        case  'EMAIL_EXISTS':
          errorMessage = 'This email exists already.';
          break;
        case 'OPERATION_NOT_ALLOWED':
          errorMessage = 'Password sign-in is disabled for this project';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
          break;
      }
    }
    return throwError(errorMessage);

  }

}
