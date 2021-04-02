import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  image:"";
  doctors = [];
  specialData=[];  

  constructor(private firestore:AngularFirestore, private Auth:AngularFireAuth) { }

  ngOnInit(): void {

    this.firestore.collection("doctors").get().subscribe((doctors) => {
      doctors.forEach((doc)=>{
        var data = <any>doc.data()
        this.image = data.image;
        this.doctors.push(doc.data());

      });
      console.log(this.doctors);
      
    });
  }

}
