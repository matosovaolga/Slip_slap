import { Component, inject, Inject, signal } from '@angular/core';
import { ButtonComponent } from '../../common/button/button.component';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { ILogin } from '../../data/interfaces/auth.interfaces';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { ViewIconComponent } from "../../common/icons/view_icon/view_icon.component";
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, ViewIconComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  authService = inject(AuthService);
  router = inject(Router);

  isPasswordVisible = signal<boolean>(false);

  form: FormGroup<{ username: FormControl; password: FormControl }> =
    new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });

  onSubmit() {
	
    const loginData: ILogin = {
      username: this.form.value.username,
      password: this.form.value.password,
    };

    if (this.form.valid) {
      this.authService.login(loginData).subscribe((res) => {
		this.router.navigate(['/'])
	  })
    }
  }
}
