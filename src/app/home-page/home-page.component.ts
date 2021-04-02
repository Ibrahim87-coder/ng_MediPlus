import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore'
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  senderName = "";
  senderEmail = "";
  messageSubject = "";
  messageContent = "";

  constructor(private Auth: AngularFireAuth, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.Auth.onAuthStateChanged((user)=>{
      if (user){
        (<HTMLLIElement>document.getElementById("register")).hidden = true;
        (<HTMLLIElement>document.getElementById("login")).hidden = true;
        (<HTMLLIElement>document.getElementById("profile")).hidden = false;
      }else{
        (<HTMLLIElement>document.getElementById("register")).hidden = false;
        (<HTMLLIElement>document.getElementById("login")).hidden = false;
        (<HTMLLIElement>document.getElementById("profile")).hidden = true;
      }
    })
  }
sendMessage(){
  this.Auth.onAuthStateChanged((user)=>{
    if (user){
      this.firestore.collection("messages").doc(user.uid).set({
        name: this.senderName,
        email: this.senderEmail,
        subject: this.messageSubject,
        content: this.messageContent
      })
      .then(()=>{
        alert('Thanks for your message. We will contact you soon.')
      })
      .catch(()=>{
        alert("please try again.")
      })
    }
  })
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
}
