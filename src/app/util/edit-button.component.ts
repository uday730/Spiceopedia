import { Component, ElementRef } from '@angular/core';
import {AgRendererComponent} from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'edit-button-component',
  template: `
    <div class="row">
    <div class="col-sm-6 "> <a myattribute='edit'  href="javascript:void(0)" ><i class="fa fa-edit"></i></a></div>
    <div class="col-sm-6 "> <a myattribute='delete' href="javascript:void(0)" ><i class="fa fa-trash" style="color:red"></i></a></div>
    </div>
  `,
})

// <div class="col-sm-6 "> <a myattribute='edit'  href="javascript:void(0)" (click)="buttonClicked()"><i class="fa fa-edit"></i></a></div>
//     <div class="col-sm-6 "> <a myattribute='delete' href="javascript:void(0)" (click)="deleteCategory()"><i class="fa fa-trash" style="color:red"></i></a></div>
export class EditButtonRenderer implements AgRendererComponent {
  public cellValue: string;
  public id:number;

  constructor(private elRef:ElementRef,     private router: Router   ) { }

  // gets called once before the renderer is used
  agInit(params: any): void {
      let data:any= params.data;
      if (data !==null && data !==undefined )
      {
        this.id = data[ params.myfield]

         let anchoreElementsList =   this.elRef.nativeElement.querySelectorAll('a');
         const allRealDivsArray = [...anchoreElementsList];

         for(let o of allRealDivsArray){
          if(o.getAttribute('myattribute')==='edit')
            {
              o.setAttribute('id','ankEdit'+this.id);
              o.addEventListener('click', params.editEventCallback.bind(this,this.id));
            }
            else
            {
              o.setAttribute('id','ankdelete'+this.id);
              o.addEventListener('click', params.deleteEventCallback.bind(this,this.id));
            }

        }
            
            this.cellValue = this.getValueToDisplay(data[ params.myfield]);
      }
  
  }

  //constructor(private elRef:ElementRef) {}

ngAfterViewInit() {
  // assume dynamic HTML was added before
  //this.elRef.nativeElement.querySelector('button').addEventListener('click', this.onClick.bind(this));
}

  // gets called whenever the user gets the cell to refresh
  refresh(params: ICellRendererParams):any {
    // set value into cell again
    this.cellValue = this.getValueToDisplay(params);
  }

  buttonClicked() {
    this.router.navigate(['/categorydetail',this.id]);
  }

  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
  deleteCategory(){
    alert('hi')
  }
}