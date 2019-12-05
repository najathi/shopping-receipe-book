import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable, Subscription} from 'rxjs';
import {AlertComponent} from '../shared/alert/alert.component';
import {PlaceholderDirective} from '../shared/placeholder.directive';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  authObs = new Observable<AuthResponseData>();

  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {

    // console.log(form);
    if (!form.valid) {
      return;
    }
    const email = form.value.email;

    const password = form.value.password;

    this.isLoading = true;
    if (this.isLoginMode) {
      //login mode
      this.authObs = this.authService.logIn(email, password);
      /*.subscribe(
      resData=>{
        console.log(resData);
        this.isLoading = false;
      },
      errorMsg => {
        console.log(errorMsg);
        this.error = errorMsg;
        this.isLoading = false;
      }
    )*/
    } else {
      //signUp mode
      this.authObs = this.authService.signUp(email, password);
      /*.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
      },
      errorMsg => {
        console.log(errorMsg);
        //this.error = errorMsg.error.error.message;
        //this.error = 'An error Occurred!';

        /!*switch (errorMsg.error.error.message) {
          case  'EMAIL_NOT_FOUND':
            this.error = 'This email exists already';
        }*!/

        this.error = errorMsg;
        this.isLoading = false;
      }
    );*/
    }

    this.authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;

        if (this.isLoginMode) {
          this.router.navigate(['/recipes']);
        } else {
          this.isLoginMode = true;
        }
      },
      errorMsg => {
        console.log(errorMsg);
        this.error = errorMsg;
        this.showErrorAlert(errorMsg);
        this.isLoading = false;
      }
    );

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    // you don't create it that is wrong. Dynamically load the component in angular tool is ComponentFactoryResolver. we need to inject that.
    //const alertComp = new AlertComponent();

    // load dynamic component (using ComponentFactoryResolver)
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(
      () => {
        this.closeSub.unsubscribe();
        hostViewContainerRef.clear(); // clear the dynamic component
      }
    );
  }

  ngOnDestroy(): void {
    if (this.closeSub)
      this.closeSub.unsubscribe();
  }

}
