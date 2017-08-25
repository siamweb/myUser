//import { TodoServiceProvider } from './../../providers/todo-service/todo-service';

import { UserServiceProvider } from './../../providers/user-service/user-service';

import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NavController, AlertController, ToastController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

   users: Observable<any>;
   oneuser: any = {};
 
  constructor(public navCtrl: NavController, public UserServiceProvider: UserServiceProvider, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.loadUsers();
  }
 
  loadUsers() {
    this.users = this.UserServiceProvider.getUsers();
    
  }

 
  addUser() {
    let prompt = this.alertCtrl.create({
      title: 'เพิ่มสมาชิก',
      message: "กรุณากรอกข้อมูล",
      inputs: [
        {
          name: 'firstname',
          placeholder: 'ชื่อ'
        },
        {
          name: 'lastname',
          placeholder: 'นามสกุล'
        },
        {
          name: 'tel',
          placeholder: 'เบอร์โทรศัพท์'
        },
      ],
      buttons: [
        {
          text: 'ยกเลิก'
        },
        {
          text: 'บันทึก',
          handler: data => {
            this.UserServiceProvider.addUser(data.firstname,data.lastname,data.tel).subscribe(data => {
              this.showToast(data.msg);
              this.loadUsers();
            });
          }
        }
      ]
    });
    prompt.present();
  }
 
  editUser(id) {
    

    this.UserServiceProvider.getOneUser(id).subscribe(data => { 
     
        
      let prompt = this.alertCtrl.create({
      title: 'แก้ไขข้อมูลสมาชิก',
      message: "กรุณากรอกข้อมูล",
      inputs: [
        {
          name: 'firstname',
          placeholder: 'ชื่อ',
          value: data.firstname
        
        },
        {
          name: 'lastname',
          placeholder: 'นามสกุล',
          value: data.lastname
        },
        {
          name: 'tel',
          placeholder: 'เบอร์โทรศัพท์',
          value: data.tel
        },
      ],
      buttons: [
        {
          text: 'ยกเลิก'
        },
        {
          text: 'บันทึก',
          handler: data => {
              this.UserServiceProvider.editUser(id,data.firstname,data.lastname,data.tel).subscribe(data => {
              this.showToast(data.msg);
              this.loadUsers();
            });
          }
        }
      ]
    });
    prompt.present();




    });
    
   

  }

  removeUser(id) {
    this.UserServiceProvider.deleteUser(id).subscribe(data => {
      this.showToast(data.msg);
      this.loadUsers();
    })
  }
 
  private showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
