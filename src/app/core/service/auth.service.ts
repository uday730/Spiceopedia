import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User, Log } from 'oidc-client';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private manager = new UserManager(getClientSettings());
   user: User;
  
  constructor() {
    this.manager.getUser().then(user => {
      this.user = user!;
  });
   }
  
  
  isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
  }

  getClaims(): any {
    return this.user.profile;
  }

  getAuthorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  startAuthentication(): Promise<void> {
    return this.manager.signinRedirect();
  } 

  signOut(): Promise<void> {
    return this.manager.signoutRedirect();
  }

  completeAuthentication(): Promise<void> {
    return this.manager.signinRedirectCallback().then(user => {
      this.user = user;
      console.log(this.user)
    });
  }

}

export function getClientSettings(): UserManagerSettings {
  return {
      authority: environment.IDENTITY_SERVER,
      client_id: environment.CLIENT_ID,
      redirect_uri: environment.REDIRECT_URI,
      post_logout_redirect_uri: environment.POSTLOGOUT_URI,
      response_type: environment.RESPONSE_TYPE,
      scope: environment.SCOPE,
      filterProtocolClaims: true,
      loadUserInfo: true
  };
}
