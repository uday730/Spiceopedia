import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userName:string;
  role:string;
  
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.userName = this.authService.getClaims().given_name;
    this.role = this.authService.getClaims().role;
  }

}
