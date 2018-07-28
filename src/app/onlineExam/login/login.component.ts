import { Component, OnInit } from '@angular/core';
import {EmitService} from "../../route/emit.service";
import {LoginService} from "./service/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public emitService: EmitService,
              private loginService: LoginService) { }

  ngOnInit() {
    // 接收发射过来的数据
    this.emitService.eventEmit.subscribe((value: any) => {
      this.isVisible = true;
      if(value == "login") {
        // 这里就可以调取接口，刷新userList列表数据
        this.choiceFlag = 1;
      }
      if (value == 'register') {
        this.choiceFlag = 2;
      }
    });
  }

  isVisible = false;
  isOkLoading = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    window.setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  //记住密码
  checked = true;
  setCheck() {
    this.checked = false;
  }

  //同意
  agree = true;
  setAgree() {
    this.agree = false;
  }

  // 登录注册
  choiceFlag = 1;
  setLogin() {
    this.registerName='';
    this.registerPassword='';
    this.registerResult='';
    this.choiceFlag = 1;
  }
  setRegsiter() {
    this.loginName='';
    this.loginPassword='';
    this.loginResult='';
    this.choiceFlag = 2;
  }

  // 注册信息
  registerName = "";
  registerPassword = "";
  registerResult='';

  registerClick() {
    let temp = this.registerResult;

    this.loginService.registerUser(this.registerName,this.registerPassword).subscribe(
      (result: string) => {
          if (result) {
            temp = 'true';
            this.isVisible = false;
            this.loginService.loginFlag = 'true';
            console.log(result);
          }
        }
    );
    if (temp == this.registerResult) {
      this.registerResult = 'false';
    } else {
      this.registerResult = 'true';
    }
  }

  //登录信息
  loginName = "";
  loginPassword = "";
  loginResult = '';

  loginClick() {
    console.log("login");
    this.loginResult = 'false';
    this.loginService.loginUser(this.loginName, this.loginPassword).subscribe(
      res =>{
        if (res) {
          this.isVisible = false;
          this.loginService.loginFlag = 'true';
          this.loginResult = 'true';
          console.log(res.body);
          localStorage.setItem("token",res.body);
        }
      }
    );
  }
}
