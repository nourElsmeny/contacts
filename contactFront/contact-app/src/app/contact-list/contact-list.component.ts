import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { fingerprint } from '@angular/compiler/src/i18n/digest';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {
  searchContact:any;
  contacts: any = {};
  constructor(private http: HttpClient,fb: FormBuilder) {
    this.listContacts('0',"");
    this.searchContact = fb.group({
      data: [
        ""
      ],
    });

  }

  ngOnInit(): void {
  };
  async listContacts(pageNum:any, data:any){
    const uHeader = '{"browser":{"name":"Chrome","version":"87.0.4280.141","major":"87"},"os":"Linux","engine":"WebKit","CPU":"amd64"}';
    const fingerprint = '12345678998765';
    const req = this.http.get('/user/list?fingerPrint='+fingerprint+'&uHeader='+uHeader+'&pageNum='+pageNum+'&data='+data)
    .subscribe(async res => {
      this.contacts = res
     }, err => {
          });
  }
  async filter(){
    await this.listContacts('0', this.searchContact.value.data)
  }
  async deleteContact(contact:any){
    console.log(contact);

    const req = this.http.put('/user/delete',{
      contactId:contact.contactId,
      uHeader : '{"browser":{"name":"Chrome","version":"87.0.4280.141","major":"87"},"os":"Linux","engine":"WebKit","CPU":"amd64"}',
      fingerPrint : '12345678998765',
      token: "g838f32YjmwL+GJNenUWi17je7dHC+fx46f8ViEm/M3FFoDV18l/7McKsems+FIGVfcZ6VAyURlIutb0j3Hli/RcbvT58BEM/5X7bjp1isMqoglKQRnDrx9IVAmfz2F9Q+DHcT3tayG3y1lo6psnj9/BsCaS1tQ/R1TIjtf7fzgbwskuFCqpM/kIWQ943lrkDpZdfnegaxxJhsUCywODsp/dx7I="
    })
    .subscribe(res => {

      this.contacts = res
     }, err => {
          });
    console.log(contact);
  }
}
