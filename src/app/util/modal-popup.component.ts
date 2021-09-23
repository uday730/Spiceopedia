import { Component, EventEmitter, Input, Output } from '@angular/core';
import {CustomJSExtention} from '../util/custom-js-extension';

@Component({
  selector: 'modal-popup-component',
  template: `
  
        <div class="modal fade" id="SavePopup{{PopupName}}" tabindex="-1" data-backdrop="static" role="dialog" aria-labelledby="exampleModalLabel-2" aria-hidden="true" style="display: none;">
        
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel-2">Confirmation!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body" style="background-color:#cccc">
                <span> <i class='fa fa-exclamation-triangle fa-2x' [style.color]="alertType==='success'?'Orange':'Red'" ></i>    {{popupContent}}</span>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" (click)="invokeCallbackfunction()">Ok</button>
                <button type="button" class="btn btn-light" data-dismiss="modal" (click)="CancelModal()">Cancel</button>
            </div>
            </div>
        </div>
        </div>
  `,
})
export class ModalPopupComponent  {
  public cellValue: string;
  public id:number;
  @Input() PopupName:string=''

  alertTypeColor:string ='Orange';

  //@Input() callbackFunction: (args: any) => void;
  @Input() callbackFunction:Function ;
  @Input() saveCallbackFunction:Function;
 @Input() popupContent:string;
 @Input() alertType:string ='success';
 

  constructor(     ) { }

  public ngOnInit(){
      if(this.popupContent.toLowerCase().indexOf('delete')>0)
      {
        this.alertTypeColor='Red';
          //this.alertyType = 'delete';
      } 
  }

   invokeCallbackfunction = () => {
    //this.callbackFunction()?.emit(this.callbackParams);
    this.callbackFunction();
   }

   CancelModal = ()=> {
    new CustomJSExtention().ModalHide('SavePopup');
   }
}