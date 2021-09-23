import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../service/auth.service';
import {environment} from '../../../../environments/environment';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import {Category} from '../../Model/category.model';
import { catchError, tap } from 'rxjs/operators';
import {SpiceopediaService} from '../../service/spiceopedia.service';
import {EditButtonRenderer} from '../../../util/edit-button.component';
import { Router } from '@angular/router';
import { CustomJSExtention } from 'src/app/util/custom-js-extension';
import { HttpStatus } from 'src/app/helpers/http-status.enum';
import { Constants, ToastOption } from 'src/app/Constants/constants';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {
  response: Object | undefined;
  private gridApi:any;
 public rowselection:string ="single";
 public paginationPageSize:number=10;
 public fullWidthCellRenderer:string = 'fullWidthCellRenderer';
 public frameworkComponents:any;
 public deleteId:number=0;
 public popupBody ="Are you sure want to save the details?"
 public alertIcon:string = 'delete';

 subject$ = new BehaviorSubject<number>(0);

defaultColDef:any;
public columnDefs:any =[]
 rowData: Category[] ;

 public rowClassRules = {  
                    'stripped-td': function (params:any) { 
                            return (params.rowIndex % 2) == 0
                          }
                    };

  constructor(private authService: AuthService,
              private router: Router ,
              private spiceService:SpiceopediaService) { 

      this.frameworkComponents = {
        editButtonRenderer: EditButtonRenderer,
      };
    }
  

  ngOnInit(): void {

    this.columnDefs = [
      { "field": 'Edit', width: 100, cellRenderer: 'editButtonRenderer',cellRendererParams:{
        myfield:'id',
        editEventCallback:   this.onEditCallback,
        deleteEventCallback:this.onDeleteCallback}
      },
      { field: 'id',sortable: true, width: 70,},
      { field: 'name',sortable: true , width: 220},
      { field: 'description',sortable: true,  width: 350}
    ];

    
    this.getAllCategories();
    this.defaultColDef ={ resizable: true };
   
  }

  getAllCategories = () => {
    this.spiceService.getCategories()
              .subscribe(
                  (response:any) =>{ 
                    this.rowData = response.categories;
                  },
                  err => console.log("angular is trash")
              );
  }

  navigateToDetailPage =() => {
    this.router.navigate(['/categorydetail',0]);
  }

  onSelectionChanged = (event:any) => {
    var selectedRows = this.gridApi.getSelectedRows();
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
    //this.gridColumnApi = params.columnApi;
    //params.api.gridApi.sizeColumnsToFit();
  }

  onEditCallback = (id?:any,event?:any) => {
    this.router.navigate(['/categorydetail',id]);
  }

  onDeleteCallback = (id?:any,event?:any) => {
    this.popupBody = " Are you sure want to delete the record?";
    this.alertIcon = "delete";
    
    this.subject$.next(id);
    new CustomJSExtention().ModalShow('SavePopup');
  }

  deleteCallbackFunction = () => {
    this.deleteId = this.subject$.getValue();
    this.deleteCategory(this.deleteId);
  }

  deleteCategory = (id:number) => {
    this.spiceService.deleteCategory(id)
    .subscribe(
      (result:any)=>{
          if (result.status ===HttpStatus.OK)
          {
            new CustomJSExtention().ModalHide('SavePopup');
            new CustomJSExtention().ToasterSuccess("Deleted successfully!",ToastOption.Success,Constants.Toast_Success_BgColor);
      
            var selectedRowNodes = this.gridApi.getSelectedNodes();

            this.rowData = this.rowData.filter( (dataItem:any) => {
              //return selectedIds.indexOf(dataItem.id) < 0;
              return selectedRowNodes[0].data.id===dataItem.id?false:true;
            });

            this.gridApi.setRowData(this.rowData);

          }else{
            new CustomJSExtention().ModalHide('SavePopup');
            new CustomJSExtention().ToasterSuccess(result.message,ToastOption.Danger,Constants.Toast_Danger_BgColor); 
          }
      },
      err => {
        new CustomJSExtention().ModalHide('SavePopup');
        new CustomJSExtention().ToasterSuccess("Something went wrong!",ToastOption.Danger,Constants.Toast_Danger_BgColor); 
    
      }
    )

  }

  onCellDoubleClicked($event:any){
    console.log("method called"); //This will be called 2 times if you fast/quickly double click the cell. It should call once only
 }

}
