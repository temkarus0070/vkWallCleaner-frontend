import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import Keycloak, {KeycloakInstance} from "keycloak-js";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private keycloakAuth: KeycloakInstance = new Keycloak();

  constructor(private httpClient: HttpClient, private router: Router) {
  }


  init(): Promise<any> {
    return new Promise((resolve, reject) => {
      const config = {
        'url': 'http://localhost:8080',
        'realm': 'temkarus0070',
        'clientId': 'vk-wall'
      };
      // @ts-ignore
      this.keycloakAuth = new Keycloak(config);
      this.keycloakAuth.init({onLoad: 'check-sso'})
        .success((a) => {
          resolve(1);
        })
        .error(() => {
          reject();
        });
    });
  }

  login() {
    this.keycloakAuth.login({redirectUri: "http://localhost:4200"})
  }

  checkAuth(): boolean {
    return <boolean>this.keycloakAuth.authenticated;
  }

  getToken(): string {
    return <string>this.keycloakAuth.token;
  }


  getVkToken(): string {
    this.keycloakAuth.loadUserInfo()
    if (this.keycloakAuth.idTokenParsed) {
      return this.keycloakAuth.idTokenParsed['vkToken'];
    }
    return "";

  }

  logout() {
    const options = {
      'redirectUri': 'http://localhost:4200',
      'realm': 'keycloakdemo',
      'clientId': 'angular-app'
    };
    this.keycloakAuth.logout(options);
  }
}
