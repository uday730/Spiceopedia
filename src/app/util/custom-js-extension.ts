import { ToastOption } from "../Constants/constants";

 declare const jsObj: any;
export class CustomJSExtention{
   public ModalShow(elementId:string):void{
        jsObj.Modal_Show(elementId);
    }

    public ModalHide(elementId:string):void{
        jsObj.Modal_Hide(elementId);
    }

    public ToasterSuccess(msg:string,displayType:ToastOption,bgColor:string):void{
        var iconType = 'success';
        
        if (displayType ===ToastOption.Warning)
            iconType = 'warning';
        else if (displayType === ToastOption.Info)
            iconType = 'info'
        else if(displayType === ToastOption.Danger)
            iconType = 'error'

        jsObj.showSuccessToast(msg,iconType.toUpperCase(),bgColor,iconType);
    }
 }