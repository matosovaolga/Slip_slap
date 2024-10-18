import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../../data/services/profile.service';


@Component({
  selector: 'app-profile-filters',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss'
})
export class ProfileFiltersComponent {
	fb =  inject(FormBuilder);
	searchForm = this.fb.group({
		firstName: [''],
		lastName: [''],
		stack: ['']
	})

	profileService = inject(ProfileService);

	constructor() {
		// this.searchForm.
	}
}
