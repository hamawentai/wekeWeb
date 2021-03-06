import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AdCourse} from "../domain/adCourse";
import {Msg} from "../../../user/componet/pay/service/msg";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RecommendService {
  url: string = environment.myUrl+'recommendApi/getAdCourses';
  url2: string = environment.myUrl+'recommendApi/updateRecommend';
  getRecommends(kind: string): Observable<Array<AdCourse>> {
    return this.http.post<Array<AdCourse>>(this.url, {
      'kind': kind
    });
  }

  changeRecommend(adId: number, allId: number) {
    this.http.post(this.url2, {
      "adId": adId,
      "allId": allId
    }).subscribe();
  }

  constructor(private http: HttpClient) { }
}
