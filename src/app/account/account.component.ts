import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  firstName = ""
  lastName = ""
  username = ""
  email = ""
  // pass = ""
  number = ""
  adress = ""
  image = ""
  cost = ""
  Specialization = ""
  city = ""
  street = ""
  near = ""
  cNumber = ""
  constructor(private Auth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
    (<HTMLDivElement>document.getElementById("imageInput")).hidden = true;

    (<HTMLInputElement>document.getElementById("fname")).disabled = true;
    (<HTMLInputElement>document.getElementById("lname")).disabled = true;
    (<HTMLInputElement>document.getElementById("phone")).disabled = true;
    (<HTMLInputElement>document.getElementById("email")).disabled = true;
    (<HTMLInputElement>document.getElementById("iadress")).disabled = true;
    (<HTMLInputElement>document.getElementById("icost")).disabled = true;
    (<HTMLInputElement>document.getElementById("ispecialization")).disabled = true;
    (<HTMLInputElement>document.getElementById("icity")).disabled = true;
    (<HTMLInputElement>document.getElementById("istreet")).disabled = true;
    (<HTMLInputElement>document.getElementById("inear")).disabled = true;
    (<HTMLInputElement>document.getElementById("iclinicNumber")).disabled = true;




    (<HTMLButtonElement>document.getElementById("cancel")).hidden = true;
    (<HTMLButtonElement>document.getElementById("update")).hidden = true;

    (<HTMLDivElement>document.getElementById("all")).classList.add("disabled");
    (<HTMLDivElement>document.getElementById("spinner")).hidden = false;
    this.Auth.onAuthStateChanged((user) => {
      if (user) {
        this.firestore.collection("clients").doc(user.uid).get().subscribe((clients) => {

          if (clients.exists) {
            var clientData = <any>clients.data();
            this.adress = clientData.adress;
            this.email = clientData.email;
            this.firstName = clientData.firstName;
            this.lastName = clientData.lastName;
            this.number = clientData.number;
            this.username = clientData.username;
            if (clientData.image != "") {
              this.image = clientData.image
            } else {
              this.image = "https://bootdey.com/img/Content/avatar/avatar7.png"
            }

            (<HTMLDivElement>document.getElementById("adressTitle")).hidden = true;

            (<HTMLDivElement>document.getElementById("specialization")).hidden = true;
            (<HTMLDivElement>document.getElementById("cost")).hidden = true;
            (<HTMLDivElement>document.getElementById("city")).hidden = true;
            (<HTMLDivElement>document.getElementById("clinicNumber")).hidden = true;
            (<HTMLDivElement>document.getElementById("near")).hidden = true;
            (<HTMLDivElement>document.getElementById("street")).hidden = true;
            (<HTMLDivElement>document.getElementById("adress")).hidden = false;

            (<HTMLDivElement>document.getElementById("spinner")).hidden = true;
            (<HTMLDivElement>document.getElementById("all")).classList.remove("disabled");
          } else {
            this.firestore.collection("doctors").doc(user.uid).get().subscribe((doctors) => {
              var doctorsData = <any>doctors.data();
              this.adress = doctorsData.adress;
              this.email = doctorsData.email;
              this.firstName = doctorsData.firstName;
              this.lastName = doctorsData.lastName;
              this.number = doctorsData.number;
              this.username = doctorsData.username;
              this.image = doctorsData.image;
              this.cost = doctorsData.cost;
              this.Specialization = doctorsData.specialization;
              this.city = doctorsData.city;
              this.street = doctorsData.street;
              this.near = doctorsData.near;
              this.cNumber = doctorsData.clinicNumber;

              (<HTMLDivElement>document.getElementById("specialization")).hidden = false;
              (<HTMLDivElement>document.getElementById("cost")).hidden = false;
              (<HTMLDivElement>document.getElementById("city")).hidden = false;
              (<HTMLDivElement>document.getElementById("clinicNumber")).hidden = false;
              (<HTMLDivElement>document.getElementById("near")).hidden = false;
              (<HTMLDivElement>document.getElementById("street")).hidden = false;
              (<HTMLDivElement>document.getElementById("adress")).hidden = true;

              (<HTMLDivElement>document.getElementById("spinner")).hidden = true;
              (<HTMLDivElement>document.getElementById("all")).classList.remove("disabled");

            })
          }
        })
      } else {
        alert("currently no user, please sign in");
        (<HTMLDivElement>document.getElementById("spinner")).hidden = true;
        (<HTMLDivElement>document.getElementById("all")).classList.remove("disabled");
        this.router.navigateByUrl("/account/login");
      }
    })

  }



  update() {
    (<HTMLDivElement>document.getElementById("all")).classList.add("disabled");
    (<HTMLDivElement>document.getElementById("spinner")).hidden = false;
    this.Auth.onAuthStateChanged((user) => {
      if ((<HTMLDivElement>document.getElementById("specialization")).hidden == false) {
        this.firestore.collection("doctors").doc(user.uid).update({
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          email: this.email,
          number: this.number,
          // adress : this.adress,
          image: this.image,
          cost: this.cost,
          specialization: this.Specialization,
          city: this.city,
          street: this.street,
          near: this.near,
          clinicNumber: this.cNumber
        })
          .then(() => {
            (<HTMLButtonElement>document.getElementById("cancel")).hidden = true;
            (<HTMLButtonElement>document.getElementById("update")).hidden = true;
            (<HTMLButtonElement>document.getElementById("edit")).hidden = false;
            (<HTMLDivElement>document.getElementById("spinner")).hidden = true;
            (<HTMLDivElement>document.getElementById("imageInput")).hidden = true;
            (<HTMLDivElement>document.getElementById("all")).classList.remove("disabled");(<HTMLInputElement>document.getElementById("fname")).disabled = true;

            (<HTMLInputElement>document.getElementById("lname")).disabled = true;
            (<HTMLInputElement>document.getElementById("phone")).disabled = true;
            (<HTMLInputElement>document.getElementById("email")).disabled = true;
            (<HTMLInputElement>document.getElementById("iadress")).disabled = true;
            (<HTMLInputElement>document.getElementById("icost")).disabled = true;
            (<HTMLInputElement>document.getElementById("ispecialization")).disabled = true;
            (<HTMLInputElement>document.getElementById("icity")).disabled = true;
            (<HTMLInputElement>document.getElementById("istreet")).disabled = true;
            (<HTMLInputElement>document.getElementById("inear")).disabled = true;
            (<HTMLInputElement>document.getElementById("iclinicNumber")).disabled = true;


            alert("updated");
            
          })
      } else {
        this.firestore.collection("clients").doc(user.uid).update({
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          email: this.email,
          number: this.number,
          adress: this.adress,
          image: this.image

        })
          .then(() => {
            (<HTMLButtonElement>document.getElementById("cancel")).hidden = true;
            (<HTMLButtonElement>document.getElementById("update")).hidden = true;
            (<HTMLButtonElement>document.getElementById("edit")).hidden = false;
            (<HTMLDivElement>document.getElementById("spinner")).hidden = true;
            (<HTMLDivElement>document.getElementById("imageInput")).hidden = true;
            (<HTMLDivElement>document.getElementById("all")).classList.remove("disabled");(<HTMLInputElement>document.getElementById("fname")).disabled = true;
            
            (<HTMLInputElement>document.getElementById("lname")).disabled = true;
            (<HTMLInputElement>document.getElementById("phone")).disabled = true;
            (<HTMLInputElement>document.getElementById("email")).disabled = true;
            (<HTMLInputElement>document.getElementById("iadress")).disabled = true;
            (<HTMLInputElement>document.getElementById("icost")).disabled = true;
            (<HTMLInputElement>document.getElementById("ispecialization")).disabled = true;
            (<HTMLInputElement>document.getElementById("icity")).disabled = true;
            (<HTMLInputElement>document.getElementById("istreet")).disabled = true;
            (<HTMLInputElement>document.getElementById("inear")).disabled = true;
            (<HTMLInputElement>document.getElementById("iclinicNumber")).disabled = true;
            alert("updated");

          })
      }
    })
  }

  edit() {
    (<HTMLButtonElement>document.getElementById("edit")).hidden = true;
    (<HTMLButtonElement>document.getElementById("cancel")).hidden = false;
    (<HTMLButtonElement>document.getElementById("update")).hidden = false;
    (<HTMLDivElement>document.getElementById("imageInput")).hidden = false;

    (<HTMLInputElement>document.getElementById("fname")).disabled = false;
    (<HTMLInputElement>document.getElementById("lname")).disabled = false;
    (<HTMLInputElement>document.getElementById("phone")).disabled = false;
    // (<HTMLInputElement>document.getElementById("email")).disabled = false;
    (<HTMLInputElement>document.getElementById("iadress")).disabled = false;
    (<HTMLInputElement>document.getElementById("icost")).disabled = false;
    // (<HTMLInputElement>document.getElementById("ispecialization")).disabled = false;
    (<HTMLInputElement>document.getElementById("icity")).disabled = false;
    (<HTMLInputElement>document.getElementById("istreet")).disabled = false;
    (<HTMLInputElement>document.getElementById("inear")).disabled = false;
    (<HTMLInputElement>document.getElementById("iclinicNumber")).disabled = false;
  }

  cancel() {
    this.Auth.onAuthStateChanged((user) => {

      if ((<HTMLDivElement>document.getElementById("specialization")).hidden == false) {
        this.firestore.collection("doctors").doc(user.uid).get().subscribe((doctors) => {
          var data = <any>doctors.data()
          this.firstName = data.firstName
          this.lastName = data.lastName
          this.username = data.username
          this.email = data.email
          this.number = data.number
          this.image = data.image
          this.cost = data.cost
          this.Specialization = data.specialization
          this.city = data.city
          this.street = data.street
          this.near = data.near
          this.cNumber = data.clinicNumber
        })

      } else {
        this.firestore.collection("clients").doc(user.uid).get().subscribe((doctors) => {
          var data = <any>doctors.data()
          this.firstName = data.firstName
          this.lastName = data.lastName
          this.username = data.username
          this.email = data.email
          this.number = data.number
          this.adress = data.adress
        })
      }

    });
    (<HTMLButtonElement>document.getElementById("cancel")).hidden = true;
    (<HTMLButtonElement>document.getElementById("update")).hidden = true;
    (<HTMLButtonElement>document.getElementById("edit")).hidden = false;
    (<HTMLDivElement>document.getElementById("imageInput")).hidden = true;

    (<HTMLInputElement>document.getElementById("fname")).disabled = true;
    (<HTMLInputElement>document.getElementById("lname")).disabled = true;
    (<HTMLInputElement>document.getElementById("phone")).disabled = true;
    (<HTMLInputElement>document.getElementById("email")).disabled = true;
    (<HTMLInputElement>document.getElementById("iadress")).disabled = true;
    (<HTMLInputElement>document.getElementById("icost")).disabled = true;
    (<HTMLInputElement>document.getElementById("ispecialization")).disabled = true;
    (<HTMLInputElement>document.getElementById("icity")).disabled = true;
    (<HTMLInputElement>document.getElementById("istreet")).disabled = true;
    (<HTMLInputElement>document.getElementById("inear")).disabled = true;
    (<HTMLInputElement>document.getElementById("iclinicNumber")).disabled = true;


  }


  signout() {
    this.Auth.onAuthStateChanged((user) => {
      if (user) {
        this.Auth.signOut().then(() => {
          alert("logged out");

        })
          .catch((error) => {
            alert(error)
          })
      } else {
        alert("currently no user")
      }

    })

  }



  handleUpload(e) {
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


  resetPassword() {
    this.Auth.onAuthStateChanged((user) => {
      if (user) {
        this.Auth.sendPasswordResetEmail(user.email).then(() => {
          alert("An email has been sent to you")
        })
          .catch(() => {
            alert("error, please try again")
          })
      }
    })
  }

}
