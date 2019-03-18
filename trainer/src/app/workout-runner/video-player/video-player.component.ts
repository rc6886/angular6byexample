import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'abe-video-player',
  templateUrl: './video-player.component.html',
  styles: []
})
export class VideoPlayerComponent implements OnInit, OnChanges {
  private youtubeUrlPrefix = 'https://www.youtube.com/embed/';
  @Input() videos: Array<string>;
  safeVideoUrls: Array<SafeResourceUrl>;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.safeVideoUrls = this.videos
      ? this.videos
        .map(video => this.sanitizer.bypassSecurityTrustResourceUrl(this.youtubeUrlPrefix + video))
      : this.videos;
  }

  ngOnInit(): void {
  }
}
