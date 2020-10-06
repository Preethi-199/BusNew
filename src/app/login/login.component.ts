import { Component, OnInit, NgZone  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ForbiddenNameValidator } from '../../assets/shared/user-name.validator';
import { PasswordValidator } from '../../assets/shared/password.validator';
import { ContactNumberValidator } from '../../assets/shared/contact-number.validator';
import { Login } from '../login';
import { CancelTicketStatus } from '../cancelTicketStatus';
import { Router } from '@angular/router';

import { BusServiceService } from "../bus-service.service";

import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  title='Regsister Page';
  userId: string;    
  pass: string;   
  registerForm: any;
  //getter method for Email.
  get Email(){
    return this.LoginForm.get('email');
  }

  //getter method for first name.
  get Password(){
    return this.LoginForm.get('password');
  }

  
  //constructor
  constructor(public fb: FormBuilder,private router: Router, private apiService: ApiService, private ngZone: NgZone,
    private service: BusServiceService){
      this.mainForm();
    }



  //declare variable of form group type.
  LoginForm: FormGroup;
  submitted= false;



  //Oninit method.
  ngOnInit(){}
  mainForm() {
    this.LoginForm= this.fb.group({

      //Email Validator
      email: ['',[Validators.required, Validators.minLength(3), Validators.email]],
      



      //Password Validator
      password: ['',[Validators.required, Validators.minLength(8)]],


    });
  }

  // Getter to access form control
  get myForm(){
    return this.LoginForm.controls;
    }

  //submit on click.
  OnSubmit(){    
     this.submitted = true;
    if (this.LoginForm.invalid) {
      // this.LoginForm.markAsTouched(); //fields will remain marked once filled. Even after submit.
      //        alert(this.registerForm.controls.fName.value);     
      
      //for dashboard property
      return false;
  }
    else{
      // this.LoginForm.markAsTouched();
      
        this.apiService.createLogin(this.LoginForm.value).subscribe(
        (res) => {
        console.log('new user login successfully created!')
        this.ngZone.run(() => this.router.navigateByUrl('/dashboardLink'))
        }, (error) => {
        console.log(error);
        });
       
     }


 
  }
 

  search:Login=new Login();

  //sessionStorage.setItem('email', this.search.emailId);

  // infoLogin:String;
  // searchb:CancelTicketStatus;
  // searchTicket(){
  //   // alert(JSON.stringify(this.search))
  //   sessionStorage.setItem('emailId', this.search.emailId);
  //   this.service.login(this.search).subscribe(data=>{
  //     if(data.status=="SUCCESS"){
  //       // alert(data.message);
  //       this.infoLogin=data.message;
  //       this.router.navigate(['/dashboardLink']);
  //     }
  //      else{
  //        this.infoLogin=data.message;
  //        //alert(data.message);
  //     }
  //   })
    


}

