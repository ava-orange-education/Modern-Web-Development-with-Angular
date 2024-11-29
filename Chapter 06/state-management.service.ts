import { Component, Injectable, computed, inject, signal } from "@angular/core";

@Injectable({ providedIn: "root" })
export class BankAccountService {
  #state = signal({ money: 5723 });
  state = this.#state.asReadonly();

  withdrawMoney(amount: number): void {
    this.#state.update((state) => ({
      ...state,
      money: state.money - amount,
    }));
  }
}

@Component({
  selector: "app-bank-account",
  standalone: true,
  template: `
    <p>You have {{ state().money }} € in your bank account</p>
    <button (click)="withdrawTenEuros()">Withdraw 10 €</button>
  `,
})
export class BankAccountComponent {
  #bankAccountService = inject(BankAccountService);
  state = this.#bankAccountService.state;

  withdrawTenEuros(): void {
    this.#bankAccountService.withdrawMoney(10);
  }
}
