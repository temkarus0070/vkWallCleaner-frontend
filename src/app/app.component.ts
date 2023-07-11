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

  postUrl = new FormControl('')

  constructor(public authService: AuthService, public vkService: VkService) {
  }

  clearCurrentWall() {
    this.vkService.clearCurrentWall().subscribe(val => {
      this.currentPostClean = val;
    },error => {
      console.log(error);
    });
  }

  addExclusion() {
    this.vkService.addExclusionPost(this.postUrl.value).subscribe(e => {
    e.subscribe(e=>{
      console.log(e)
    },error => console.log(error))
    },error => {
      console.log(error);
    });
  }
}
