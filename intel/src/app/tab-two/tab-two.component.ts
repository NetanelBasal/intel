import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Rx";
import { FormState } from "../tab-one/tab-one.component";

@Component({
  selector: 'app-tab-two',
  templateUrl: './tab-two.component.html',
  styleUrls: [ './tab-two.component.css' ]
})
export class TabTwoComponent implements OnInit {

  form : Observable<FormState>
  buttonDisabled : boolean;

  constructor( private store : Store<any> ) {
    this.form = store.select("form");

    this.form.subscribe(res => {
      this.buttonDisabled = res.radioButton;
    });
  }


  ngOnInit() {
  }

}
