import { HttpClient, HttpHeaders ,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import {AuthService} from './auth.service';
import  {ServiceResponse} from '../Model/service-response.model';
import { map } from 'rxjs/operators';
import {Constants} from '../../Constants/constants';
import { HttpStatus } from 'src/app/helpers/http-status.enum';
import { catchError } from 'rxjs/operators';

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
                            }else if (result.status === HttpStatus.InternalServerError) {
                                return throwError("Oooops! Something went wrong while getting data!")
                              }
                        }),
                        catchError(this.handleError)
                    );
   };

   public PostAPI<T>(methodName:string,postData:object):Observable<ServiceResponse<T>>{
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
   protected setHttpHeadear(){
    let headers = new HttpHeaders()
                    .set('Access-Control-Allow-Origin','*')
                    .set('Accept','application/json')
                    .set('Content-Type','application/json')
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

 
