import {Component} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {VkService} from "./services/vk.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'VkWallCleanerFrontend';
  public currentPostClean: number | null = null;

  public removedPostsUrls: Map<string, Date[]> = new Map<string, Date[]>();

  postUrl = new FormControl('')
  public lastPostClean: number | null = null;

  constructor(public authService: AuthService, public vkService: VkService) {
  }

  clearCurrentWall() {
    this.vkService.clearCurrentWall().subscribe(val => {
      this.currentPostClean = val;
    }, error => {
      console.log(error);
    });
  }

  addExclusion() {
    this.vkService.addExclusionPost(this.postUrl.value).subscribe(e => {
      e.subscribe(e => {
        console.log(e)
      }, error => console.log(error))
    }, error => {
      console.log(error);
    });
  }

  getAndCleanAllWall() {
    this.vkService.getAndCleanAllWall().subscribe(urls => {
    })
  }

  getRemovedPosts() {
    this.vkService.getRemovedPosts().subscribe(posts => {
      this.removedPostsUrls = posts;
      for (let entry in this.removedPostsUrls) {
        setTimeout(() => {
          window.open(entry, '_blank', 'noopener, noreferrer');
        }, 3000);

      }


    })
  }

  clearLastYearsPosts() {
    this.vkService.clearLastYearsPosts().subscribe(val => {
      this.lastPostClean = val;
    }, error => {
      console.log(error);
    });
  }
}
