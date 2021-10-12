import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../service/auth.service';
import {environment} from '../../../../environments/environment';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {SpiceopediaService} from '../../service/spiceopedia.service';
import {EditButtonRenderer} from '../../../util/edit-button.component';
import { Router } from '@angular/router';
import { CustomJSExtention } from 'src/app/util/custom-js-extension';
import { HttpStatus } from 'src/app/helpers/http-status.enum';
import { Constants, ToastOption } from 'src/app/Constants/constants';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
})

export class AttachmentComponent implements OnInit {
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
 rowData: any[] ;

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
      { "field": 'Edit', headerName: "Action", width: 100, cellRenderer: 'editButtonRenderer',cellRendererParams:{
        myfield:'id',
        editEventCallback:   this.onEditCallback,
        deleteEventCallback:this.onDeleteCallback}
      },
      { field: 'id', headerName: "ID",sortable: true, width: 75,},
      { field: 'attachmentName', headerName: "Name",sortable: true , width: 240},
      //{ field: 'filePath', headerName: "File Path",sortable: true , width: 240},
      { field: 'attachmentType.name', headerName: "Type",sortable: true , width: 150},
      { field: 'tags', headerName: "Tags",sortable: true , width: 150},
      { field: 'size', headerName: "Size",sortable: true , width: 100},
      { field: 'status.name', headerName: "Status",sortable: true , width: 100},
      {field:  'id', headerName: "Download",width: 100,
        cellRenderer: (params:any) => {
          //return  '<div><a  href="javascript:void(0)" (click) ="downloadImage('+params.value+')" ><i class="fas fa-download"></i></a></div>'
          var link = document.createElement('a');
              link.href = 'javascript:void(0)';
              link.innerHTML = '<i class="fas fa-download"></i>' //params.value;
              link.addEventListener('click', (e) => {
                  e.preventDefault();
                  this.downloadImage(params.data)
        });
        return link;
      }},
    ];

    this.getAllAttachments();
    this.defaultColDef ={ resizable: true };
  }

  getAllAttachments = () => {
    this.spiceService.getAttachment()
              .subscribe(
                  (response:any) =>{ 
                    this.rowData = response.attachmentList;
                  },
                  err => console.log("angular is trash")
              );
  }

  navigateToDetailPage =() => {
    this.router.navigate(['/attachmentdetail',0]);
  }

  onSelectionChanged = (event:any) => {
    var selectedRows = this.gridApi.getSelectedRows();
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
  }

  downloadImage =(data:any) =>{
    var fileName = data.filePath.substring(data.filePath.lastIndexOf('\\')+1,data.filePath.length) 
    this.spiceService.downloadImage(data.id,fileName)
    .subscribe(
      (response:any)=>{}
      ,err=>{
        console.log('error')
      }
    )
  }
  onEditCallback = (id?:any,event?:any) => {
    this.router.navigate(['/attachmentdetail',id]);
  }

  onDeleteCallback = (id?:any,event?:any) => {
    this.popupBody = " Are you sure want to delete the record?";
    this.alertIcon = "delete";
    
    this.subject$.next(id);
    new CustomJSExtention().ModalShow('SavePopup');
  }

  deleteCallbackFunction = () => {
    this.deleteId = this.subject$.getValue();
    this.deleteAttachment(this.deleteId);
  }

  deleteAttachment = (id:number) => {
    this.spiceService.deleteAttachment(id)
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
