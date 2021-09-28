import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {AppSetting} from '../Model/appSetting.model';

const SETTINGS_LOCATION = "assets/appsettings.json";

@Injectable({
  providedIn: 'root'
})
export class AppSettingService  {
     SETTINGS_LOCATION="assets/appsettings.json";

    constructor(private httpClient: HttpClient){}
    
    getSettings(): Observable<any> {
        return this.httpClient.get(SETTINGS_LOCATION)
        .pipe(
                map((response) => {
                    response || {}
                }),
            catchError(err=> err)
        );
    }
}
