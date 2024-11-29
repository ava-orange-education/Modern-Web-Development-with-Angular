import { Component } from "@angular/core";

import { inject } from "@angular/core";

// State
interface BankAccountState {
  money: number;
}

// Actions
import { Store, createActionGroup, props } from "@ngrx/store";

const BankAccountActions = createActionGroup({
  source: "Bank Account",
  events: {
    "Withdraw Money": props<{ amount: number }>(),
  },
});

BankAccountActions.withdrawMoney({ amount: 50 });

// Reducer
import { createReducer, on } from "@ngrx/store";

const initialState: BankAccountState = {
  money: 5723,
};

export const bankAccountReducer = createReducer(
  initialState,
  on(BankAccountActions.withdrawMoney, (state, { amount }) => ({
    ...state,
    money: state.money - amount,
  }))
);

// Selectors
import { createFeatureSelector, createSelector } from "@ngrx/store";

const selectBankAccount =
  createFeatureSelector<BankAccountState>("bankAccount");

const selectMoney = createSelector(
  selectBankAccount,
  (bankAccount) => bankAccount.money
);

const selectIsAccountInPositive = createSelector(
  selectMoney,
  (money) => money > 0
);

@Component({
  selector: "app-bank-account",
  standalone: true,
  template: `
    <p>You have {{ money() }} € in your bank account</p>
    <button (click)="withdrawTenEuros()">Withdraw 10 €</button>
  `,
})
export class BankAccountComponent {
  #store = inject(Store<BankAccountState>);
  money = this.#store.selectSignal(selectMoney);

  withdrawTenEuros(): void {
    this.#store.dispatch(BankAccountActions.withdrawMoney({ amount: 10 }));
  }
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [BankAccountComponent],
  template: ` <app-bank-account /> `,
})
export class AppComponent {}
