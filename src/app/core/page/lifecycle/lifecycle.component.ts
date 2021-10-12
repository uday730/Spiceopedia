import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import {SpiceopediaService} from '../../service/spiceopedia.service';
import {EditButtonRenderer} from '../../../util/edit-button.component';
import { Router } from '@angular/router';
import { CustomJSExtention } from 'src/app/util/custom-js-extension';
import { HttpStatus } from 'src/app/helpers/http-status.enum';
import { Constants, ToastOption } from 'src/app/Constants/constants';
import { AbstractControl,FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-lifecycle',
  templateUrl: './lifecycle.component.html',
  styleUrls: ['./lifecycle.component.css']
})
export class LifecycleComponent implements OnInit {
  response: Object | undefined;
  private gridApi:any;
 public rowselection:string ="single";
 public paginationPageSize:number=10;
 public fullWidthCellRenderer:string = 'fullWidthCellRenderer';
 public frameworkComponents:any;
 public deleteId:number=0;
 public popupBody ="Are you sure want to save the details?"
 public popupBody2 ="Are you sure want to save the details?"
 public alertIcon:string = 'delete';
 public alertIcon2:string = 'success';
 public popupname:string = 'delete';
 public popupname2:string  ='save';

subject$ = new BehaviorSubject<number>(0);
defaultColDef:any;
public columnDefs:any =[]
 rowData: any[] ;
 dataList:any[];
 form: FormGroup;
 submitted = false;
 id:number=0;
  
 public rowClassRules = {  
                    'stripped-td': function (params:any) { 
                            return (params.rowIndex % 2) == 0
                          }
                    };
                    
    constructor(private formBuilder: FormBuilder,
                private authService: AuthService,
                private router: Router ,
                private spiceService:SpiceopediaService)
     { 
        this.frameworkComponents = { editButtonRenderer: EditButtonRenderer,};
      }

  ngOnInit(): void {
  
    this.columnDefs = [
      { field: 'Edit', headerName: "Action", width: 100, cellRenderer: 'editButtonRenderer',cellRendererParams:{
        myfield:'id',
        editEventCallback:   this.onEditCallback,
        deleteEventCallback:this.onDeleteCallback}
      },
      { field: 'id', headerName: "ID",sortable: true, width: 75,},
      { field: 'history', headerName: "History",sortable: true , width: 240},
      { field: 'description', headerName: "Description",sortable: true , width: 220},
    ];

    this.getAllLifeCycle();

    this.defaultColDef ={ resizable: true };

    this.form = this.formBuilder.group({
                history: [null, Validators.required],
                description: ['', Validators.required],
                  Id: [0,''],
                });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getAllLifeCycle = () => {
    this.spiceService.getLifecycle()
              .subscribe(
                  (response:any) =>{ 
                    this.rowData = response.lifecycleList;
                  },
                  err => console.log("angular is trash")
              );
  }
  

  getLifeCycleDetails():void{
    this.spiceService.getLifecycleById(this.id)
    .subscribe(
        (response:any) =>{ 
          this.form.setValue({
            history: response.lifecycle.history,
            description: response.lifecycle.description,
            Id:response.lifecycle.id
         });
        },
        err => console.log("angular is trash")
    );
  }

  onSelectionChanged = (event:any) => {
    var selectedRows = this.gridApi.getSelectedRows();
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
  }

  onEditCallback = (id?:any,event?:any) => {
    this.id = id;
    this.getLifeCycleDetails();
  }

  onDeleteCallback = (id?:any,event?:any) => {
    this.popupBody = " Are you sure want to delete the record?";
    this.alertIcon = "delete";
    
    this.subject$.next(id);
    new CustomJSExtention().ModalShow('SavePopup'+this.popupname);
  }
 
  
  deleteCallbackFunction = () => {
    this.deleteId = this.subject$.getValue();
    this.deleteLifecycle(this.deleteId);
  }

  deleteLifecycle = (id:number) => {
    this.spiceService.deleteLifecycle(id)
    .subscribe(
      (result:any)=>{
          if (result.status ===HttpStatus.OK)
          {
            new CustomJSExtention().ModalHide('SavePopup'+this.popupname);
            new CustomJSExtention().ToasterSuccess("Deleted successfully!",ToastOption.Success,Constants.Toast_Success_BgColor);
      
            var selectedRowNodes = this.gridApi.getSelectedNodes();
            this.rowData = this.rowData.filter( (dataItem:any) => {
              return selectedRowNodes[0].data.id===dataItem.id?false:true;
            });

            this.gridApi.setRowData(this.rowData);
          }else{
            new CustomJSExtention().ModalHide('SavePopup'+this.popupname);
            new CustomJSExtention().ToasterSuccess(result.message,ToastOption.Danger,Constants.Toast_Danger_BgColor); 
          }
      },
      err => {
        new CustomJSExtention().ModalHide('SavePopup'+this.popupname);
        new CustomJSExtention().ToasterSuccess("Something went wrong!",ToastOption.Danger,Constants.Toast_Danger_BgColor); 
      }
    )
  }

  onSubmit =()=> {
    this.submitted = true;
    
    if (this.form.invalid) {
      new CustomJSExtention().ToasterSuccess("Please enter all the mandatory fields!",ToastOption.Danger,Constants.Toast_Danger_BgColor); 
      return;
    }
    new CustomJSExtention().ModalShow('SavePopup'+this.popupname2);
  }

  onClear = () =>{
    this.form.setValue({
      history: '',
      description:'',
      Id:0
   });

  }
  
  onSaveCallback =()=>{
    this.saveLifeCycle()
  }

  saveLifeCycle =() => {
    let isUpdated = this.form.value.Id>0;

    this.spiceService.saveLifecycle(this.form.value)
    .subscribe(
        (response:any) =>{ 
            if( response.status === HttpStatus.OK)
            {
              if (isUpdated)
              {
                let newRowData = this.rowData.map((row, index) => {
                  if (row.id ===this.form.value.Id)
                  {
                    row.history      = response.lifecycle.history,
                    row.description = response.lifecycle.description,
                    row.id            = response.lifecycle.id

                    return row;
                  }
                  return row;
                });
                
                this.rowData = newRowData;
                new CustomJSExtention().ToasterSuccess("Updated successfully!",ToastOption.Info,Constants.Toast_Info_BgColor);
              }
              else{
                  let newRowData = this.rowData.slice();
                  let newRow = { 
                                history: response.lifecycle.history, 
                                description:response.lifecycle.description,
                                id: response.lifecycle.id, 
                              };
                  newRowData.push(newRow);

                  this.rowData = newRowData;
                  new CustomJSExtention().ToasterSuccess("Saved successfully!",ToastOption.Success,Constants.Toast_Success_BgColor);
              }
                this.submitted = false;
                this.onClear();

                new CustomJSExtention().ModalHide('SavePopup'+this.popupname2);
            }
            else
            {
              new CustomJSExtention().ModalHide('SavePopup'+this.popupname2);
              new CustomJSExtention().ToasterSuccess(response.message,ToastOption.Danger,Constants.Toast_Danger_BgColor);  
            }
        },
        (err:any) => {
          var x = err;
          new CustomJSExtention().ModalHide('SavePopup'+this.popupname2);
          new CustomJSExtention().ToasterSuccess("Something went wrong!",ToastOption.Danger,Constants.Toast_Danger_BgColor);
      }
    );
  }
}
