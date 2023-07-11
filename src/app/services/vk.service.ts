import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BACKEND_URL, VK_API_VERSION} from "../app.module";
import {map, Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class VkService {

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  clearCurrentWall(): Observable<number> {
    return this.httpClient.post<number>(`${BACKEND_URL}/clean-current`, null, {})

  }

  addExclusionPost(url: String): Observable<Observable<any>> {
    var postId = url.substr(url.indexOf("wall")+4);
    const formData = new FormData();


    var headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });
    headers=headers.append('Authorization', `Bearer ${this.authService.getVkToken()}`);
    console.log(formData.getAll("posts"))
    return this.httpClient.post(`/vk-api/method/wall.getById?v=${VK_API_VERSION}&posts=${postId}`,
      formData,{headers:headers})
      .pipe(map((x: any) => {
        console.log(x)
        if (x.response.length>0&&x.response[0].copy_history.length > 0)
          return this.httpClient.post(`${BACKEND_URL}/posts/exclude`, {
            postId: x.response[0].id,
            text: x.response[0].copy_history[0].text
          });
        return x;
      }))


  }
}
