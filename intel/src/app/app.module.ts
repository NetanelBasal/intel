import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TabOneComponent } from './tab-one/tab-one.component';
import { TabTwoComponent } from './tab-two/tab-two.component';
import { Routes, RouterModule } from "@angular/router";
import { Action, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { Actions, Effect, EffectsModule } from "@ngrx/effects";
import { Observable } from "rxjs/Rx";

const routes : Routes = [
  {
    path: "",
    component: TabOneComponent,
    pathMatch: "full"
  },
  {
    path: "two",
    component: TabTwoComponent
  }
]


export const TOGGLE_BUTTON = 'TOGGLE_BUTTON';
export const TOGGLE_BUTTON_SUCCESS = 'TOGGLE_BUTTON_SUCCESS';
export const TOGGLE_CHECKBOX = 'TOGGLE_CHECKBOX';

// action = {
//   type: "TOGGLE_BUTTON",
//   payload: "true/false"
// }


const initialState = {
  radioButton: false,
  checkbox: false,
  error: null
}

export function formReducer( state : any = initialState, action : Action ) {
  switch ( action.type ) {
    case TOGGLE_BUTTON_SUCCESS:
      return {
        radioButton: action.payload,
        checkbox: state.checkbox
      }
    case TOGGLE_CHECKBOX:
      return {
        radioButton: state.radioButton,
        checkbox: action.payload
      }
    default:
      return state;
  }
}

@Injectable()
export class FormEffects {
  constructor( private actions$ : Actions ) {
  }

  @Effect() formUpdate$ = this.actions$
    .ofType("TOGGLE_BUTTON")
    .switchMap(action => Observable.timer(2000).mapTo(true)
      .map(res => ({ type: 'TOGGLE_BUTTON_SUCCESS', payload: res }))
      .catch(() => Observable.of({ type: 'TOGGLE_BUTTON_FAILURE' }))
    );
}

@NgModule({
  declarations: [
    AppComponent,
    TabOneComponent,
    TabTwoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    StoreModule.provideStore({ form: formReducer }),
    EffectsModule.run(FormEffects),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    })
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
