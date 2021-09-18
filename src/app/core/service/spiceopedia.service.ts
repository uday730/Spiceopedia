import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User, Log } from 'oidc-client';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import { Category } from '../Model/category.model';
import {AuthService} from './auth.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class SpiceopediaService extends BaseService {
 
  constructor(private http: HttpClient, private authService:AuthService) {
      super(http,authService);
   }
  
   public getCategories(): Observable<any> {
            var result:any = this.GetAPI("categories");
            return result;
   }

   public getCategoryById(id:number): Observable<any> {
    var result:any = this.GetAPI("categoryById/"+id);
    return result;
}
 

   public saveCategory(data:Category):Observable<any>{
    var result = this.PostAPI("savecategory",data);
    return result;
   }

   

}

 
