import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore'
import {Router} from '@angular/router'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstName = ""
  lastName = ""
  username = ""
  email = ""
  pass = ""
  number = ""
  adress = ""


  image = ""


  cost = ""
  specialization = ""
  city = ""
  street = ""
  near = ""
  cNumber = ""
  constructor(private Auth: AngularFireAuth, private firestore: AngularFirestore,private router:Router) { }

  ngOnInit(): void {
    (<HTMLImageElement>document.getElementById("profileImage")).hidden = true;

    (<HTMLHeadingElement>document.getElementById("title")).innerHTML = "Sign up";

    (<HTMLInputElement>document.getElementById("adress")).hidden = false;
    (<HTMLInputElement>document.getElementById("clinicAdress")).hidden = true;
    (<HTMLInputElement>document.getElementById("info")).hidden = true;
    (<HTMLInputElement>document.getElementById("profession")).hidden = true;

    (<HTMLDivElement>document.getElementById("spinner")).hidden = true;

  }


  swiched(event) {
    if (event.target.checked == true) {

      (<HTMLHeadingElement>document.getElementById("title")).innerHTML = "Sign up as a doctor";

      (<HTMLInputElement>document.getElementById("adress")).hidden = true;
      (<HTMLInputElement>document.getElementById("clinicAdress")).hidden = false;
      (<HTMLInputElement>document.getElementById("info")).hidden = false;
      (<HTMLInputElement>document.getElementById("profession")).hidden = false;

    } else {

      (<HTMLHeadingElement>document.getElementById("title")).innerHTML = "Sign up";

      (<HTMLInputElement>document.getElementById("adress")).hidden = false;
      (<HTMLInputElement>document.getElementById("clinicAdress")).hidden = true;
      (<HTMLInputElement>document.getElementById("info")).hidden = true;
      (<HTMLInputElement>document.getElementById("profession")).hidden = true;

    }

  }



  submit() {
    (<HTMLDivElement>document.getElementById("spinner")).hidden = false;
    (<HTMLDivElement>document.getElementById("all")).classList.add("disabled");
    if ((<HTMLInputElement>document.getElementById("mycheckbox")).checked == false) {
      this.Auth.createUserWithEmailAndPassword(this.email, this.pass).then((user) => {
        this.firestore.collection("clients").doc(user.user.uid).set({
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          number: this.number,
          email: this.email,
          adress: this.adress,
          image: this.image
        })
          .catch(() => {
            alert("error, please try again")
          });
        (<HTMLDivElement>document.getElementById("all")).classList.remove("disabled");
        (<HTMLDivElement>document.getElementById("spinner")).hidden = true;
      })
      .then(()=>{
        alert("signed up!")
        this.router.navigateByUrl("/account/profile")
      })
        .catch((error) => {
          alert(error);
          (<HTMLDivElement>document.getElementById("all")).classList.remove("disabled");
          (<HTMLDivElement>document.getElementById("spinner")).hidden = true;
        })
    } else {
      this.Auth.createUserWithEmailAndPassword(this.email, this.pass).then((user) => {
        this.firestore.collection("doctors").doc(user.user.uid).set({
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          number: this.number,
          email: this.email,
          id: user.user.uid,
          cost: this.cost,
          specialization: this.specialization,
          city: this.city,
          street: this.street,
          near: this.near,
          clinicNumber: this.cNumber,
          image: this.image


        })
          .then(() => {
            alert("signed up!");
            (<HTMLDivElement>document.getElementById("all")).classList.remove("disabled");
            (<HTMLDivElement>document.getElementById("spinner")).hidden = true;
          })
          .catch(() => {
            alert("error, please try again");
            (<HTMLDivElement>document.getElementById("all")).classList.remove("disabled");
            (<HTMLDivElement>document.getElementById("spinner")).hidden = true;
          });
      })
        .catch((error) => {
          alert(error);
          (<HTMLDivElement>document.getElementById("all")).classList.remove("disabled");
          (<HTMLDivElement>document.getElementById("spinner")).hidden = true;
        })
    }

    // alert(this.image);

  }
  handleUpload(e) {
    (<HTMLImageElement>document.getElementById("profileImage")).hidden = false;
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    this.image = reader.result;
  }


}
