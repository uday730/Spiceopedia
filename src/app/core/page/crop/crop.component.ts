import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../service/auth.service';
import {environment} from '../../../../environments/environment';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import {CropSubType} from '../../Model/cropsubtype.model';
import { catchError, tap } from 'rxjs/operators';
import {SpiceopediaService} from '../../service/spiceopedia.service';
import {EditButtonRenderer} from '../../../util/edit-button.component';
import { Router } from '@angular/router';
import { CustomJSExtention } from 'src/app/util/custom-js-extension';
import { HttpStatus } from 'src/app/helpers/http-status.enum';
import { Constants, ToastOption } from 'src/app/Constants/constants';
import { AbstractControl,FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-crop',
  templateUrl: './crop.component.html',
  styleUrls: ['./crop.component.css']
})
export class CropComponent implements OnInit {
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
 cropSubTypeList:any[];
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
      { field: 'cropType', headerName: "Type",sortable: true , width: 240},
      { field: 'cropSubtype.subtype', headerName: "SubType",sortable: true , width: 220},
    ];

    this.getAllCropSubType();
    this.getAllCropType();

    this.defaultColDef ={ resizable: true };

    this.form = this.formBuilder.group({
                croptype: [null, Validators.required],
                cropsubtypeid: ['', Validators.required],
                  Id: [0,''],
                });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getAllCropType = () => {
    this.spiceService.getCropTypes()
              .subscribe(
                  (response:any) =>{ 
                    this.rowData = response.cropTypesList;
                  },
                  err => console.log("angular is trash")
              );
  }
  getAllCropSubType = () => {
    this.spiceService.getCropSubtypes()
              .subscribe(
                  (response:any) =>{ 
                    this.cropSubTypeList = response.cropSubtypesList;
                  },
                  err => console.log("angular is trash")
              );
  }

  getCropTypeDetails():void{
    this.spiceService.getCropTypeById(this.id)
    .subscribe(
        (response:any) =>{ 
          this.form.setValue({
            croptype: response.crop.cropType,
            cropsubtypeid: response.crop.cropSubtypeId,
            Id:response.crop.id
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
    //this.router.navigate(['/categorydetail',id]);
    this.id = id;
    this.getCropTypeDetails();
  }

  onDeleteCallback = (id?:any,event?:any) => {
    this.popupBody = " Are you sure want to delete the record?";
    this.alertIcon = "delete";
    
    this.subject$.next(id);
    new CustomJSExtention().ModalShow('SavePopup'+this.popupname);
  }
 
  
  deleteCallbackFunction = () => {
    this.deleteId = this.subject$.getValue();
    this.deleteCroptype(this.deleteId);
  }

  deleteCroptype = (id:number) => {
    this.spiceService.deleteCropType(id)
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
      croptype: '',
      cropsubtypeid:'',
      Id:0
   });

  }
  
  onSaveCallback =()=>{
    this.saveCropType()
  }

  saveCropType =() => {
    let isUpdated = this.form.value.Id>0;

    this.spiceService.saveCropType(this.form.value)
    .subscribe(
        (response:any) =>{ 
            if( response.status === HttpStatus.OK)
            {
              if (isUpdated)
              {
                let newRowData = this.rowData.map((row, index) => {
                  if (row.id ===this.form.value.Id)
                  {
                    //row.subtype= response.cropSubtype.subtype;
                    row.cropType      = response.crop.cropType,
                    row.cropSubtypeId = response.crop.cropSubtypeId,
                    row.id            = response.crop.id

                    return row;
                  }
                  return row;
                });
                
                this.rowData = newRowData;
                new CustomJSExtention().ToasterSuccess("Updated successfully!",ToastOption.Info,Constants.Toast_Info_BgColor);
              }
              else{
                  let newRowData = this.rowData.slice();
                  let subTypeObj:any = this.cropSubTypeList.filter((dataItem:any)=>{
                      return dataItem.id===response.crop.cropSubtypeId;
                  });

                  let newRow = { 
                                cropType: response.crop.cropType, 
                                id: response.crop.id, 
                                cropSubtype:
                                {
                                  subtype:subTypeObj[0].subtype
                                }

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
