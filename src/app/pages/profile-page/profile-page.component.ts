import { Component, inject } from '@angular/core';
import { ProfileHeaderComponent } from '../../common/profile-header/profile-header.component';
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { ButtonComponent } from "../../common/button/button.component";
import { SettingsIconComponent } from "../../common/icons/settings-icon/settings-icon.component";
import { SubscriberCardComponent } from "../../common/sidebar/subscriber-card/subscriber-card.component";
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";
import { ChipsComponent } from "../../common/chips/chips.component";
import { PostFeedComponent } from "./post-feed/post-feed.component";
import { PostInputComponent } from "./post-input/post-input.component";
import { PostComponent } from "./post/post.component";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    ButtonComponent,
    RouterLink,
    SettingsIconComponent,
    SubscriberCardComponent,
    ImgUrlPipe,
    ChipsComponent,
    PostFeedComponent,
    PostInputComponent,
    PostComponent
],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  profileService = inject(ProfileService);

  route = inject(ActivatedRoute);
  router = inject(Router);

  me$ = toObservable(this.profileService.me);

  subscribers$ = this.profileService.getSubscribersShortList(5);

  profile$ = this.route.params.pipe(
    switchMap(({ id }) => {
      if (id === 'me') return this.me$;

      return this.profileService.getAccount(id);
    })
  );

  navigateSection() {
    this.router.navigateByUrl('/settings');
  }
}
