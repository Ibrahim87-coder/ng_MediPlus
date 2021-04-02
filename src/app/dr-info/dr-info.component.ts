import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-dr-info',
  templateUrl: './dr-info.component.html',
  styleUrls: ['./dr-info.component.css']
})
export class DrInfoComponent implements OnInit {
  
  
  drdata:any=[];

  

  specialData= [];
  constructor(private route: ActivatedRoute,private firestore:AngularFirestore) { }

  ngOnInit(): void {

    var id=this.route.snapshot.paramMap.get('info')
    this.firestore.collection("doctors").doc(id).get().subscribe((docs)=>{
      this.specialData.push(docs.data())
      console.log(docs.data())
      var data = <any>docs.data()
      this.drdata=data;


  
    })
  }
}
