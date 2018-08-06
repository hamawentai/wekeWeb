import { Injectable } from '@angular/core';
import {Person} from '../../msgInput/domain/person';
import {Observable, of} from 'rxjs';
import {History} from '../domian/history';
import {HttpClient} from "@angular/common/http";
import {retry} from "rxjs/operators";
import {Menu} from "../../freeCourse/kind/domain/menu";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  url: string = 'http://10.0.0.31:8080/userApi/getUser';
  url2: string = 'http://10.0.0.31:8080/userApi/changeUser';

  person: Person = new Person('https://img.mukewang.com/59e5c5b30001aa2601000100-200-200.jpg', '丁丁鱼', '学生', '张家界', '保密', '7788');
  history: History[] = [new History("账号登录", "2018/7/15", '张家界', '10.0.0.29', 'web'),new History("账号登录", "2018/8/16", '张家界', '10.0.0.29', 'web')];
  getPersonById(): Observable<Person>{
    // 通过Id返回Person信息
    return this.http.get<Person>(this.url).pipe(
      retry(3)
    );
  }
  getHistoryById(): Observable<History[]>{
    // 通过Id返回History信息
    // return this.http.get<History[]>(this.url).pipe(
    //   retry(3)
    // );
    return of(this.history);
  }

  savaPerson(person: Person){
    this.http.post(this.url2, {
      "url" : person.url,
      "nickname": person.nickname,
      "job": person.job,
      "address": person.address,
      "sex": person.sex,
      "info": person.info
    }).pipe(
      retry(3)
    ).subscribe();
  }
  constructor(private http: HttpClient) { }
}
