import {environment} from '../../environments/environment';
export class Constants{
    public static readonly baseURL:string =environment.WEBAPI_URI;
    public static readonly SpiceController:string = 'spice/';

     public static readonly Toast_Success_BgColor = '#f96868';
     public static readonly Toast_Info_BgColor = '#46c35f';
     public static readonly Toast_Warning_BgColor = '#57c7d4';
     public static readonly Toast_Danger_BgColor = '#f2a654';
}

export enum ToastOption{
    Success,
    Info,
    Warning,
    Danger
}