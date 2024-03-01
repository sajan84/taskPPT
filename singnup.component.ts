import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../servieces/auth.service';

@Component({
  selector: 'app-singnup',
  templateUrl: './singnup.component.html',
  styleUrl: './singnup.component.scss'
})
export class SingnupComponent {
  signupform!:FormGroup;
constructor(private fb:FormBuilder,private service:AuthService) {
 
  
}
ngOnInit(): void {
    this.signupform=new FormGroup({
      email:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required),
      name:new FormControl('',Validators.required),
      repeatpassword:new FormControl('',Validators.required),
      terms:new FormControl('',Validators.required)
    })
}

submit(){

  if (this.signupform.valid) {
    this.service.signup(this.signupform.value).subscribe((result)=>{
      console.log("Data Added Sucessfully");
    })
    //send the obj to the database 
  }else{
    //throw the error using toaster with required fields 
    
    alert("Your form is invalid");
  }
  console.log(this.signupform.value);
}
}
