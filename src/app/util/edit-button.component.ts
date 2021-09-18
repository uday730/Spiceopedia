import { Component } from '@angular/core';
import {AgRendererComponent} from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'edit-button-component',
  template: `
    <span>
    <button type="button" class="btn btn-primary btn-rounded grid-edit-btn " (click)="buttonClicked()" >Edit</button>
    </span>
  `,
})
export class EditButtonRenderer implements AgRendererComponent {
  public cellValue: string;
  public id:number;

  constructor(     private router: Router   ) { }

  // gets called once before the renderer is used
  agInit(params: any): void {
      //console.log(params)
      let data:any= params.data;
      if (data !==null && data !==undefined )
      {
            this.id = data[ params.myfield]
            this.cellValue = this.getValueToDisplay(data[ params.myfield]);
      }
  
  }

  // gets called whenever the user gets the cell to refresh
  refresh(params: ICellRendererParams):any {
    // set value into cell again
    this.cellValue = this.getValueToDisplay(params);
  }

  buttonClicked() {
    alert(`${this.id} medals won!`);
    this.router.navigate(['/categorydetail',this.id]);
  }

  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
}