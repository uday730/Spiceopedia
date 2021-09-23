import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {Category} from '../../Model/category.model';
import { AbstractControl,FormGroup, FormBuilder, Validators } from '@angular/forms';
//import Validation from '../utils/validation';
import Validation from '../../../util/validation';
import { SpiceopediaService } from '../../service/spiceopedia.service';
import { catchError, map } from 'rxjs/operators';
import {CustomJSExtention} from '../../../util/custom-js-extension';
import {Constants,ToastOption} from '../../../Constants/constants';
import { HttpStatus } from 'src/app/helpers/http-status.enum';

@Component({
  selector: 'app-category',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryDetailComponent implements OnInit {
  category: Category = new Category();
  form: FormGroup;
  submitted = false;
  public popupBody ="Are you sure want to save the details?"
  id:number=0;
  public alertIcon:string = 'success';
  
  constructor(private formBuilder: FormBuilder,
              private http: HttpClient, 
              private route: ActivatedRoute,
              private authService: AuthService
              ,private spiceService:SpiceopediaService) { }
 
           
  ngOnInit(): void {
      this.route.params.subscribe(p => {
        //console.log(p);
        this.id = p.id;
      });

    this.form = this.formBuilder.group({
                Name: [this.category?this.category.Name:'', Validators.required],
                Description: [this.category?this.category.Description:'', Validators.required],
                Id: [this.category?this.category.Id:0,''],
    });

    if(this.id>0)
    {
      this.getCategoryDetails();
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit():void{
    this.submitted = true;
    
    if (this.form.invalid) {
      new CustomJSExtention().ToasterSuccess("Please enter all the mandatory fields!",ToastOption.Danger,Constants.Toast_Danger_BgColor); 
      return;
    }
    new CustomJSExtention().ModalShow('SavePopup');
  }

  getCategoryDetails():void{
    this.spiceService.getCategoryById(this.id)
    .subscribe(
        (response:any) =>{ 
          this.form.setValue({
            Name: response.category.name,
            Description: response.category.description,
            Id:response.category.id
         });
        },
        err => console.log("angular is trash")
    );
  }

  myCallbackFunction(): void {
    //callback code here
    this.saveCategory();
    }

  saveCategory():void{
    this.spiceService.saveCategory(this.form.value)
    
    .subscribe(
        (response:any) =>{ 
            if( response.status === HttpStatus.OK)
            {
                this.form.setValue({
                  Name: response.category.name,
                  Description: response.category.description,
                  Id:response.category.id
                  
              });
                new CustomJSExtention().ModalHide('SavePopup');
                new CustomJSExtention().ToasterSuccess("Saved successfully!",ToastOption.Success,Constants.Toast_Success_BgColor);
            }
            else
            {
              new CustomJSExtention().ModalHide('SavePopup');
              new CustomJSExtention().ToasterSuccess(response.message,ToastOption.Danger,Constants.Toast_Danger_BgColor);  
            }
        },
        (err:any) => {
          var x = err;
          new CustomJSExtention().ModalHide('SavePopup');
          new CustomJSExtention().ToasterSuccess("Something went wrong!",ToastOption.Danger,Constants.Toast_Danger_BgColor);
      }
    );
  }

}
