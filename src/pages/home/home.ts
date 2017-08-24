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
          placeholder: 'ชื่อ',
          value:'ddd'
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
