import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { trackModel } from './Models/track.model';
import { MusicService } from './music.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  @ViewChild('popUp',{static:false, read : ViewContainerRef}) popUp : ViewContainerRef;
  tracks : Array<trackModel> = [
    {
      title : 'titre test',
      url : "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      cover : ""
    },
    {
      title : 'titre test 2',
      url : "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      cover : ""
    },
    {
      title : 'titre test 3',
      url : "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      cover : ""
    },
  ]
  trackTest : trackModel = this.tracks[1];
  
  constructor(private music : MusicService) {
    
  }

  ngOnInit() {
   
    
  }

  getPopUpContainer() {
    return this.popUp;
  }
  

  nextTrack = (track) => {
    let index = this.tracks.indexOf(track);
    if(index < this.tracks.length-1)
    this.trackTest = this.tracks[index+1]
  }

  previousTrack = (track) => {
    let index = this.tracks.indexOf(track);
    if(index > 0)
    this.trackTest = this.tracks[index-1]
  }
}
