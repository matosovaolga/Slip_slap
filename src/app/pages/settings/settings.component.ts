import { Component, effect, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProfileHeaderComponent } from '../../common/profile-header/profile-header.component';
import { ButtonComponent } from '../../common/button/button.component';
import { ProfileService } from '../../data/services/profile.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule, ProfileHeaderComponent, ButtonComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: [''],
    stack: [''],
  });

  constructor() {
    effect(() => {
      //@ts-ignore
      this.form.patchValue(this.profileService.me());
    });
  }

  onSave = () => {
	console.log('submit')
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;
    //@ts-ignore
    firstValueFrom(this.profileService.patchProfile(this.form.value));
  };
}
