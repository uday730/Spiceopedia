import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../service/auth.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  response: Object | undefined;
  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
  
    let headers = new HttpHeaders({
      'Authorization': this.authService.getAuthorizationHeaderValue(),
      responseType: 'json'
    })

    this.http.get<any>( environment.WEBAPI_URI + "WeatherForecast", { headers: headers })
      .subscribe(
        response => this.response = response,
        err => console.log("angular is trash"));

  }

 
}
