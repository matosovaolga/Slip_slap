import { Component, inject } from '@angular/core';
import { HomeIconComponent } from '../icons/home-icon/home-icon.component';
import { SearchIconComponent } from '../icons/search-icon/search-icon.component';
import { ChatIconComponent } from '../icons/chat-icon/chat-icon.component';
import { CommonModule } from '@angular/common';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { RouterLink } from '@angular/router';
import { RightArrowIconComponent } from '../icons/right-arrow-icon/right-arrow-icon.component';
import { ProfileService } from '../../data/services/profile.service';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";
import { SettingsIconComponent } from "../icons/settings-icon/settings-icon.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    HomeIconComponent,
    RouterLink,
    CommonModule,
    SubscriberCardComponent,
    RightArrowIconComponent,
    ImgUrlPipe,
    SettingsIconComponent
],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  profileService = inject(ProfileService);

  subscribers$ = this.profileService.getSubscribersShortList();
  me = this.profileService.me;

  menuItems = [
    {
      label: 'My profile',
      icon: HomeIconComponent,
      link: '',
    },
    {
      label: 'Chats',
      icon: ChatIconComponent,
      link: 'chats',
    },
    {
      label: 'Search',
      icon: SearchIconComponent,
      link: 'search',
    },
  ];

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }
}
