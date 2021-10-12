import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User, Log } from 'oidc-client';
import { Observable,of,throwError } from 'rxjs';
import {environment} from '../../../environments/environment';
import { Category } from '../Model/category.model';
import {AuthService} from './auth.service';
import { BaseService } from './base.service';
import { catchError } from 'rxjs/operators';
import { CropSubType } from '../Model/cropsubtype.model';

@Injectable({
  providedIn: 'root'
})
export class SpiceopediaService extends BaseService {
  errorMsg:string;
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

public deleteCategory(id:number):Observable<any>{
  var result:any = this.DeleteAPI("deletecategory",id);
  return result;
}   

//#region cropsubtype
public getCropSubtypes(): Observable<any> {
  var result:any = this.GetAPI("cropsubtype");
  return result;
}

public getCropsubtypeById(id:number): Observable<any> {
var result:any = this.GetAPI("cropsubtypebyid/"+id);
return result;
}

public saveCropSubtype(data:CropSubType):Observable<any>{
var result = this.PostAPI("savecropsubtype",data);
return result;
}

public deleteCropSubtype(id:number):Observable<any>{
var result:any = this.DeleteAPI("deletecropsubtype",id);
return result;
}  
//#endregion

//#region croptype
public getCropTypes(): Observable<any> {
  var result:any = this.GetAPI("croptype");
  return result;
}

public getCropTypeById(id:number): Observable<any> {
var result:any = this.GetAPI("croptypebyid/"+id);
return result;
}

public saveCropType(data:CropSubType):Observable<any>{
var result = this.PostAPI("savecroptype",data);
return result;
}

public deleteCropType(id:number):Observable<any>{
var result:any = this.DeleteAPI("deletecroptype",id);
return result;
}  
//#endregion


//#region Description
public getDescription(): Observable<any> {
  var result:any = this.GetAPI("description");
  return result;
}

public getDescriptionById(id:number): Observable<any> {
var result:any = this.GetAPI("descriptionbyid/"+id);
return result;
}

public saveDescription(data:any):Observable<any>{
var result = this.PostAPI("savedescription",data);
return result;
}

public deleteDescription(id:number):Observable<any>{
var result:any = this.DeleteAPI("deletedescription",id);
return result;
}  
//#endregion

//#region Lifecycle
public getLifecycle(): Observable<any> {
  var result:any = this.GetAPI("lifecycle");
  return result;
}

public getLifecycleById(id:number): Observable<any> {
var result:any = this.GetAPI("lifecyclebyid/"+id);
return result;
}

public saveLifecycle(data:any):Observable<any>{
var result = this.PostAPI("savelifecycle",data);
return result;
}

public deleteLifecycle(id:number):Observable<any>{
var result:any = this.DeleteAPI("deletelifecycle",id);
return result;
}  
//#endregion

//#region AttachmentType
public getAttachmentType(): Observable<any> {
  var result:any = this.GetAPI("attachmenttype");
  return result;
}

public getAttachmentTypeById(id:number): Observable<any> {
var result:any = this.GetAPI("attachmenttypebyid/"+id);
return result;
}

public saveAttachmentType(data:any):Observable<any>{
var result = this.PostAPI("saveattachmenttype",data);
return result;
}

public deleteAttachmentType(id:number):Observable<any>{
var result:any = this.DeleteAPI("deleteattachmenttype",id);
return result;
}  
//#endregion

//#region Attachment
public getAttachment(): Observable<any> {
  var result:any = this.GetAPI("attachment");
  return result;
}

public getAttachmentById(id:number): Observable<any> {
var result:any = this.GetAPI("attachmentbyid/"+id);
return result;
}

public saveAttachment(data:any):Observable<any>{
var result = this.PostAPI("saveattachment",data);
return result;
}

public deleteAttachment(id:number):Observable<any>{
var result:any = this.DeleteAPI("deleteattachment",id);
return result;
}  
//#endregion

//#region Miscellaneous
public getStatusList(): Observable<any> {
  var result:any = this.GetAPI("status");
  return result;
}

public downloadImage(id:number,fileName:string):Observable<any>{
  
  var result:any = this.DownloadAPI("getfile/"+id,fileName);
  return result;
}
//#endregion

}

 
