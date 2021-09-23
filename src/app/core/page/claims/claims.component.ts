import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../service/auth.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-Claims',
  templateUrl: './Claims.component.html',
  styleUrls: ['./Claims.component.css']
})
export class ClaimsComponent implements OnInit {
  response: Object | undefined;
  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
  
    

  }

 
}
