import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {Routes, RouterModule} from "@angular/router"

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { MusicProgressComponent } from './music-progress/music-progress.component';
import { PourcentagePipe } from './pourcentage.pipe';
import { FormattimePipe } from './formattime.pipe';
import { TrackComponent } from './track/track.component';
import { TracksComponent } from './tracks/tracks.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ItemMenuComponent } from './item-menu/item-menu.component';
import { ItemMenuUserComponent } from './item-menu-user/item-menu-user.component';
import { LoginComponent } from './login/login.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SearchComponent } from './search/search.component';
import { PlayListComponent } from './play-list/play-list.component';
import { LikeComponent } from './like/like.component';
import { StreamComponent } from './stream/stream.component';
import { MusicService } from './music.service';
import { ApiService } from './api.service';
import { SearchService } from './search.service';
import { GuardService } from './guard.service';
import { AlertComponent } from './alert/alert.component';
import { LoaderComponent } from './loader/loader.component';
import { RegisterComponent } from './register/register.component';
import { List25Component } from './list25/list25.component';

const routes : Routes = [
  {
    path : '', component : StreamComponent,
  },
  {
    path : 'like', component : LikeComponent, canActivate : [GuardService]
  },
  {
    path : 'playlist', component : PlayListComponent, canActivate : [GuardService]
  },
]

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    MusicProgressComponent,
    PourcentagePipe,
    FormattimePipe,
    TrackComponent,
    TracksComponent,
    SideBarComponent,
    ItemMenuComponent,
    ItemMenuUserComponent,
    LoginComponent,
    SignInComponent,
    SearchComponent,
    PlayListComponent,
    LikeComponent,
    StreamComponent,
    AlertComponent,
    LoaderComponent,
    RegisterComponent,
    List25Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [MusicService, ApiService, SearchService, GuardService],
  entryComponents : [AlertComponent, LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
