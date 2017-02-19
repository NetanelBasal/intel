import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Rx";

export interface FormState {
  radioButton : boolean;
  checkbox : boolean;
}

@Component({
  selector: 'app-tab-one',
  templateUrl: './tab-one.component.html',
  styleUrls: [ './tab-one.component.css' ]
})
export class TabOneComponent {
  form : Observable<FormState>;
  radioState : boolean;

  constructor( private store : Store<any> ) {
    // {
    // radioButton: false,
    // checkbox: false
    //}
    this.form = this.store.select("form");

    this.form.subscribe(( res : FormState ) => {
      this.radioState = res.radioButton;
    });
  }


  changeState( state : boolean ) {
    this.store.dispatch({
      type: "TOGGLE_BUTTON",
      payload: state
    })
  }

}
