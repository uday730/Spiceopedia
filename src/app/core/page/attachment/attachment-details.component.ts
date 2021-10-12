import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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
  selector: 'app-attachment-details',
  templateUrl: './attachment-details.component.html',
})

export class AttachmentDetailComponent implements OnInit {
  //category: Category = new Category();
  attachmentTypeList:any=[];
  statusList:any=[];
  form: FormGroup;
  submitted = false;
  public popupBody ="Are you sure want to save the details?"
  id:number=0;
  public alertIcon:string = 'success';
  selectedFile: File ;  
  imageUrl: string;  
  fileToUpload: File ;  
  saveFileForm: any;  
  lstFileDetails: any;  
  
  constructor(private formBuilder: FormBuilder,
              private http: HttpClient, 
              private route: ActivatedRoute,
              private router:Router,
              private authService: AuthService
              ,private spiceService:SpiceopediaService) { }
  @ViewChild('logoInput', {static: true}) logoInput:any; 
           
  ngOnInit(): void {
      this.route.params.subscribe(p => {
        this.id = p.id;
      });

      this.form = this.formBuilder.group({
                attachmentName: ['', Validators.required],
                filePath: ['', Validators.required],
                attachmentTypeId: ['', Validators.required],
                tags: ['', Validators.required],
                size: [0, Validators.required],
                statusId: ['', Validators.required],
                fileAsByteArray:['',''],
                Id: [0,''],
        });

    if(this.id>0)
    {
      this.getAttachmentDetails();
    }
    this.getAttachmentTypeList();
    this.getStatusList();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit():void{
    this.submitted = true;
    this.form.value
    
    if (parseInt(this.form.get('Id')?.value)>0){
     if (this.fileToUpload !== null && this.fileToUpload !== undefined)    {
      this.form.patchValue({
        filePath: this.fileToUpload.name,
     });
    }
    }else {
    if (this.fileToUpload === null || this.fileToUpload ===undefined)
      {
        new CustomJSExtention().ToasterSuccess("Please Upload image!",ToastOption.Danger,Constants.Toast_Danger_BgColor);
        return ;
      }

      this.form.patchValue({
        filePath: this.fileToUpload.name,
     });
    }
  

    if (this.form.invalid) {
      new CustomJSExtention().ToasterSuccess("Please enter all the mandatory fields!",ToastOption.Danger,Constants.Toast_Danger_BgColor); 
      return;
    }
    new CustomJSExtention().ModalShow('SavePopup');
  }

  getAttachmentTypeList = () => {
    this.spiceService.getAttachmentType()
              .subscribe(
                  (response:any) =>{ 
                    this.attachmentTypeList = response.attachmentTypeList;
                  },
                  err => console.log("angular is trash")
              );
  }

  getStatusList = () => {
    this.spiceService.getStatusList()
              .subscribe(
                  (response:any) =>{ 
                    this.statusList = response.statusList;
                  },
                  err => console.log("angular is trash")
              );
  }

  getAttachmentDetails():void{
    this.spiceService.getAttachmentById(this.id)
    .subscribe(
        (response:any) =>{ 
          this.form.setValue({

            attachmentName: response.attachment.attachmentName,
            filePath: response.attachment.filePath,
            attachmentTypeId: response.attachment.attachmentTypeId,
            tags: response.attachment.tags,
            size: response.attachment.size,
            statusId: response.attachment.statusId,
            fileAsByteArray:'',
            Id:response.attachment.id
         });
        },
        err => console.log("angular is trash")
    );
  }

  onSelectFile = (e:any) =>{ 
    var file = e.target.files;

    if(file.length>0)
    {
      this.fileToUpload = file.item(0)!;  
      var reader = new FileReader();  
      reader.onload = (event: any) => {  
          this.imageUrl =  event.target.result.toString();
      }  
      reader.readAsDataURL(this.fileToUpload);  
  }
}  

  myCallbackFunction(): void {
    //callback code here
    this.saveAttachment();
    }

    saveAttachment():void{
    let formData = new FormData();  
        formData.append('ImageUpload', this.logoInput.nativeElement.files[0]);  
        formData.append('data', this.form.value);  
        
        let reader = new FileReader();

        this.form.patchValue({
          fileAsByteArray: this.imageUrl,
          size: parseInt(this.form.get('size')?.value)
       });
        
    this.spiceService.saveAttachment(this.form.value)
    //this.spiceService.saveAttachment(formData)
    .subscribe(
        (response:any) =>{ 
            if( response.status === HttpStatus.OK)
            {
              new CustomJSExtention().ModalHide('SavePopup');
              this.router.navigate(['/attachment'],    {queryParams: {}});
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
