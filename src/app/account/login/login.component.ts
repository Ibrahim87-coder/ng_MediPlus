import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email=""
  pass=""
  constructor(private Auth: AngularFireAuth,private router:Router) { }

  ngOnInit(): void {
    (<HTMLDivElement>document.getElementById("spinner")).hidden = true;

  }

  signin(){
    (<HTMLDivElement>document.getElementById("spinner")).hidden = false;
    (<HTMLDivElement>document.getElementById("all")).classList.add("disabled");

    if (this.email=="" && this.pass==""){
      (<HTMLDivElement>document.getElementById("spinner")).hidden = true;
      (<HTMLDivElement>document.getElementById("all")).classList.remove("disabled");

      alert("please fill in all the fields");
    }else{
      
      this.Auth.signInWithEmailAndPassword(this.email,this.pass).then(()=>{
        (<HTMLDivElement>document.getElementById("spinner")).hidden = true;
        (<HTMLDivElement>document.getElementById("all")).classList.remove("disabled");

        alert("signed in !")
        this.router.navigateByUrl("/account/profile");

      })
      .catch((error)=>{
        alert(error)
      })
    }
    
  }

}
