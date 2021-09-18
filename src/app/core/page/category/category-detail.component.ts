import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {Category} from '../../Model/category.model';
import { AbstractControl,FormGroup, FormBuilder, Validators } from '@angular/forms';
//import Validation from '../utils/validation';
import Validation from '../../../util/validation';
import { SpiceopediaService } from '../../service/spiceopedia.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryDetailComponent implements OnInit {
  category: Category = new Category();
  form: FormGroup;
  submitted = false;
  id:number=0;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient, 
              private route: ActivatedRoute,
              private authService: AuthService
              ,private spiceService:SpiceopediaService) { }
 
           
  ngOnInit(): void {
      this.route.params.subscribe(p => {
        console.log(p);
        this.id = p.id;
      });

    // let id = this.route.paramMap
    //                         .pipe(
    //                           map((params: ParamMap) => params.get('id'))
    //                         );

    //this.clearValidation();
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

  // clearValidation():void{
  //   this.form = this.formBuilder.group({
  //     Name: [this.category?this.category.Name:'', null],
  //     Description: [this.category?this.category.Description:'', null],
  //   });
  // }

  onSubmit():void{
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));
    this.saveCategory();
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



  saveCategory():void{

    this.spiceService.saveCategory(this.form.value)
    .subscribe(
        (response:any) =>{ 
          //this.rowData = response;
          this.form.setValue({
            Name: response.category.name,
            Description: response.category.description,
            Id:response.category.id
         });

        // console.log(JSON.stringify(this.form.value, null, 2));
        },
        err => console.log("angular is trash")
    );
  }

}
