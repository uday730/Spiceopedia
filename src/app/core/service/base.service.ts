import { HttpClient, HttpHeaders ,HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable,of,throwError } from 'rxjs';
import {AuthService} from './auth.service';
import  {ServiceResponse} from '../Model/service-response.model';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { CustomJSExtention } from 'src/app/util/custom-js-extension';
import { HttpStatus } from 'src/app/helpers/http-status.enum';
import { Constants, ToastOption } from 'src/app/Constants/constants';

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
        if( this._authService.isLoggedIn()===false)
        {
          new CustomJSExtention().ToasterSuccess("Session got expired... Press F5 to refresh!",ToastOption.Info,Constants.Toast_Danger_BgColor);
          return of();
        }
            this.setHttpHeadear();
            let  httpOptions ={
                  headers: this.myheaders
            };

    return this._http.get<ServiceResponse<T>>(Constants.baseURL+"spice/"+methodName,httpOptions)
            .pipe(map((result:any)=>{
                    if (result.status === HttpStatus.OK) {
                        return result;
                    }else if (result.status === HttpStatus.InternalServerError) {
                        return throwError("Oooops! Something went wrong while getting data!")
                      }
                }),
                catchError(this.handleError)
            );
   };

    public DownloadAPI = (methodName:string,fileName:string):Observable<any> => {
      if( this._authService.isLoggedIn()===false)
      {
        new CustomJSExtention().ToasterSuccess("Session got expired... Press F5 to refresh!",ToastOption.Info,Constants.Toast_Danger_BgColor);
        return of();
      }

        this.setHttpHeadear();

        let  httpOptions ={
              headers: this.myheaders
        };
     
        return this._http.get(Constants.baseURL+"spice/"+methodName, {headers:httpOptions.headers,responseType: 'blob' as 'json'})
                .pipe(map((result:any)=>{
                      const a = document.createElement('a');
                      document.body.appendChild(a);
                      a.style.display = 'none';
                      const blob = new Blob([result], { type: 'application/octet-stream' });
                      const url = window.URL.createObjectURL(blob);

                      a.href = url; a.download = fileName;
                       a.click();
                      window.URL.revokeObjectURL(url);
                    }),
                    catchError(this.handleError)
                );
    };
 
   public PostAPI<T>(methodName:string,postData:object,miscdata?:object):Observable<ServiceResponse<T>>{
    if( this._authService.isLoggedIn()===false)
    {
      new CustomJSExtention().ToasterSuccess("Session got expired... Press F5 to refresh!",ToastOption.Info,Constants.Toast_Danger_BgColor);
      return of();
    }

      this.setHttpHeadear();
          let  httpOptions ={
                headers: this.myheaders
          };

        let body = JSON.stringify(postData);
        return this._http.post<ServiceResponse<T>>(Constants.baseURL + Constants.SpiceController + methodName,body,httpOptions)
                .pipe(map((result:any)=>{
                        if (result.status === HttpStatus.OK) {
                            return result;
                        }else if (result.status === HttpStatus.InternalServerError) {
                          //var errormsg = this.getServerErrorMessage(result);
                            throwError('Oooops something went wrong!...');
                            return result;
                        }else{
                          throwError('Oooops something went wrong!...');
                          return result;
                        }
                    }),
                    catchError(this.handleError)
                );
 };

public DeleteAPI<T>(methodName:string,id:number):Observable<ServiceResponse<T>>{
  if( this._authService.isLoggedIn()===false)
  {
    new CustomJSExtention().ToasterSuccess("Session got expired... Press F5 to refresh!",ToastOption.Info,Constants.Toast_Danger_BgColor);
    return of();
  }
  
  this.setHttpHeadear();
      let  httpOptions ={
            headers: this.myheaders
      };

      return this._http.delete<ServiceResponse<T>>(Constants.baseURL + Constants.SpiceController + methodName +"/"+id,httpOptions)
              .pipe(map((result:any)=>{
                      if (result.status === HttpStatus.OK) {
                          return result;
                      }else if (result.status === HttpStatus.InternalServerError) {
                       //var errormsg = this.getServerErrorMessage(result);
                         throwError('Oooops something went wrong!...');
                         return result;
                      }else{
                        throwError('Oooops something went wrong!...');
                        return result;
                      }
                  }),
                  catchError(this.handleError)
              );
};

 private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
        case 404: {
            return `Not Found: ${error.message}`;
        }
        case 403: {
            return `Access Denied: ${error.message}`;
        }
        case 500: {
            return `Internal Server Error: ${error.message}`;
        }
        default: {
            return `Unknown Server Error: ${error.message}`;
        }

    }
}
   protected setHttpHeadear(type?:any){
    let headers = new HttpHeaders()
                    .set('Access-Control-Allow-Origin','*')
                    .set('Accept',type==='image'?'application/octet-stream': 'application/json')
                    .set('Content-Type',type==='image'?'application/octet-stream':'application/json')
                    .set('Authorization',`${this._authService.getAuthorizationHeaderValue()}`);

        this.myheaders = headers;
   }

   handleError(error:any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}

 
