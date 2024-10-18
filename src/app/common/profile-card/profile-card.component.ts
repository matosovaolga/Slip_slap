import { Component, inject, Input } from '@angular/core';
import { ChipsComponent } from '../chips/chips.component';
import { ButtonComponent } from '../button/button.component';
import { IProfile } from '../../data/interfaces/profile.interface';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { ProfileService } from '../../data/services/profile.service';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [ChipsComponent, ButtonComponent, ImgUrlPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  @Input() profile!: IProfile;
  profileService = inject(ProfileService);

  subscribeToFollowers(id: number) {
	this.profileService.subscribeAccount(id).subscribe(res => console.log(res));
  };
}
