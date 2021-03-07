import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
httpOptions:object={};
  addContact:FormGroup;
  constructor( private http: HttpClient,fb: FormBuilder) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    };
    this.addContact = fb.group({
    firstName: [
      ""
    ],
    lastName: [
      ""
    ],
    mobile: [
      ""
    ],
    email: [
      ""
    ]
  }); }

  ngOnInit(): void {
  }
async addC(){
console.log(this.addContact.value);
const uHeader = '{"browser":{"name":"Chrome","version":"87.0.4280.141","major":"87"},"os":"Linux","engine":"WebKit","CPU":"amd64"}';
    const fingerprint = '12345678998765';
    this.addContact.value.fingerPrint = fingerprint;
    this.addContact.value.uHeader = uHeader;
    this.addContact.value.token = 'g838f32YjmwL+GJNenUWi17je7dHC+fx46f8ViEm/M3FFoDV18l/7McKsems+FIGVfcZ6VAyURlIutb0j3Hli/RcbvT58BEM/5X7bjp1isMqoglKQRnDrx9IVAmfz2F9Q+DHcT3tayG3y1lo6psnj9/BsCaS1tQ/R1TIjtf7fzgbwskuFCqpM/kIWQ943lrkDpZdfnegaxxJhsUCywODsp/dx7I=';
    const req = this.http.post('/user/add',this.addContact.value, this.httpOptions)
    .subscribe(async res => {
          console.log(res);
     }, err => {
          });
}
}
