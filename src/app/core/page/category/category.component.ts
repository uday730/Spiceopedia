import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../service/auth.service';
import {environment} from '../../../../environments/environment';
import { Observable, of } from 'rxjs';
import {Category} from '../../Model/category.model';
import { catchError, tap } from 'rxjs/operators';
import {SpiceopediaService} from '../../service/spiceopedia.service';
import {EditButtonRenderer} from '../../../util/edit-button.component';

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

  defaultColDef:any;

 public rowClassRules = {  
                    'stripped-td': function (params:any) { 
                            return (params.rowIndex % 2) == 0
                          }
                    };

  constructor(private http: HttpClient, private authService: AuthService
    ,private spiceService:SpiceopediaService) { 

      this.frameworkComponents = {
        editButtonRenderer: EditButtonRenderer,
      };
    }

columnDefs = [
  { field: 'Edit', width: 100, cellRenderer: 'editButtonRenderer',cellRendererParams:{myfield:'id'}},
  { field: 'id',sortable: true, width: 150,},
  { field: 'name',sortable: true , width: 220},
  { field: 'description',sortable: true,  width: 350}
];
 rowData: Category[] ;

  ngOnInit(): void {
    this.getFromNewService();
    this.defaultColDef ={ resizable: true };
   
  }

  getFromNewService():void{
    this.spiceService.getCategories()
              .subscribe(
                  (response:any) =>{ 
                    this.rowData = response.categories;
                  },
                  err => console.log("angular is trash")
              );
  }

  onSelectionChanged(event:any) {
    var selectedRows = this.gridApi.getSelectedRows();
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
    //this.gridColumnApi = params.columnApi;

    //params.api.gridApi.sizeColumnsToFit();
  }

  onCellDoubleClicked($event:any){
    console.log("method called"); //This will be called 2 times if you fast/quickly double click the cell. It should call once only
 }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
