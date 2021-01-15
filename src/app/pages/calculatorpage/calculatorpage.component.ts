import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'calculatorpage-cmp',
    templateUrl: 'calculatorpage.component.html'
})

export class CalculatorPageComponent implements OnInit{
  menuexpectedrole:string;
  calculatorModal: boolean;
  calculatorModal1: boolean;
  num1: number = 52;
  num2: number = 20;
  ngOnInit() {

    this.menuexpectedrole = localStorage.getItem('role');
    console.log(this.menuexpectedrole)

  }
  showCalculator() {
    this.calculatorModal = true;
  }
  showCalculator1() {
    this.calculatorModal1 = true;
  }
  ConvertToInt(val) {
    return parseFloat(val);
  }
}
