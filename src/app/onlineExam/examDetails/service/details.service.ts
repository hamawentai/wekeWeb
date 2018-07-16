import { Injectable } from '@angular/core';
import {Questions} from '../domain/questions';
import {Option} from '../domain/option';

@Injectable()
export class DetailsService {

 questions: Array<Questions> = [
    new Questions(1, 1, '以下操作中，数组比链表速度更快的是', [
      new Option('A', 'A:原地逆序'),
      new Option('B', 'B:原地逆序'),
      new Option('C', 'C:原地逆序')
    ], []),
   new Questions(3, 2, '龙王传说', null, []),
   new Questions(2, 3, 'float x 与“零值”比较的if语句为？', [
     new Option('A', 'A:if(x==0)'),
     new Option('B', 'B:if (x &lt; 0.00001f)'),
     new Option('C', 'C:if (fabs(x) &lt; 0.00001f) 或 if（Math.abs(x) &lt; 0.00001f）'),
     new Option('D', 'D:if (x &gt; -0.00001f)')
   ], []),
   new Questions(4, 4, '唐家三少是龙王传说的作者', [
     new Option('A', '√'),
     new Option('B', '×'),
   ], []),
  ];
  constructor() { }

  getQuestions(): Array<Questions> {
    return this.questions;
  }
  // 选择题答案修改
  setQuestions(value: string[] , num: number) {
    for (const question of this.questions) {
      if (question.questionNumber === num) {
        question.userAnswer = value;
        break;
      }
    }
    console.log(this.questions);
  }

  // 填空题答案修改
  getTextAreaAnswer(inputValue: string , num: number) {
    for (const question of this.questions) {
      if (question.questionNumber === num) {
        question.userAnswer[0] = inputValue;
        break;
      }
    }
    console.log(this.questions);
  }
}
