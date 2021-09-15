import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute,Navigation} from '@angular/router'
import { User } from 'oidc-client';
import { AuthService } from '../../service/auth.service';
@Component({
  selector: 'app-auth-callback',
  template: ``
})
export class AuthCallbackComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router:Router,
    private authService: AuthService) { 
  }

  ngOnInit(): void {
    //
    this.authService.completeAuthentication()
     .then(user=>{
       let userObj = <User>user!;
         this.router.navigate(['/dashboard'],    {queryParams: {}});
     });
  }

}