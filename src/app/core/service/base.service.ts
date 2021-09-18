import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';
import  {ServiceResponse} from '../Model/service-response.model';
import { map } from 'rxjs/operators';
import {Constants} from '../../Constants/constants';
import { HttpStatus } from 'src/app/helpers/http-status.enum';

@Injectable()
export class BaseService {
 
    protected apiURIL:string;
    myheaders = new HttpHeaders();

    private _http:HttpClient;
    private _authService:AuthService;

  constructor( http: HttpClient,  authService:AuthService) {
        this._http= http;
        this._authService = authService;

   }
  
   public GetAPI<T>(methodName:string):Observable<ServiceResponse<T>>{
        this.setHttpHeadear();
            let  httpOptions ={
                  headers: this.myheaders
            };

            return this._http.get<ServiceResponse<T>>(Constants.baseURL+"spice/"+methodName,httpOptions)
                    .pipe(map((result:any)=>{
                            if (result.status === HttpStatus.OK) {
                                return result;
                            }
                        }),
                    );
   };

   public PostAPI<T>(methodName:string,postData:object):Observable<ServiceResponse<T>>{
      this.setHttpHeadear();
          let  httpOptions ={
                headers: this.myheaders
          };

          let body = JSON.stringify(postData);
          return this._http.post<ServiceResponse<T>>(Constants.baseURL+"spice/"+methodName,body,httpOptions)
                  .pipe(map((result:any)=>{
                          if (result.status === HttpStatus.OK) {
                              return result;
                          }
                      }),
                  );
 };

   protected setHttpHeadear(){
    let headers = new HttpHeaders()
                    .set('Access-Control-Allow-Origin','*')
                    .set('Accept','application/json')
                    .set('Content-Type','application/json')
                    .set('Authorization',`${this._authService.getAuthorizationHeaderValue()}`);

        this.myheaders = headers;
   }

}

 
