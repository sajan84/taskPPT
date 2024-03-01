import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../servieces/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
/**
 *
 */
loginform!:FormGroup;
constructor(private fb:FormBuilder,private service:AuthService) {
 
  
}
ngOnInit(): void {
    this.loginform=new FormGroup({
      email:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required)
    })
}

submit(){

  if (this.loginform.valid) {
    this.service.login(this.loginform.value).subscribe((result)=>{
      console.log("loggin sucessfulyy");
    })
    //send the obj to the database 
  }else{
    //throw the error using toaster with required fields 
    this.validateAllFormFields(this.loginform);
    alert("Your form is invalid");
  }
  console.log(this.loginform.value);
}

private validateAllFormFields(formGroup:FormGroup){
  Object.keys(formGroup.controls).forEach(field=>{
    const control=formGroup.get(field);
    if (control instanceof FormControl) {
      
    }else if(control instanceof FormGroup){
      this.validateAllFormFields(control)
    }
  })
}


}
