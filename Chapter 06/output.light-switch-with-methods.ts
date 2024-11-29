import { Component } from "@angular/core";

@Component({
  selector: "app-light-switch",
  standalone: true,
  template: `
    <button (click)="onToggle(true)">On</button>
    <button (click)="onToggle(false)">Off</button>
  `,
})
export class LightSwitchComponent {
  isOn = false;

  onToggle(isOn: boolean): void {
    this.isOn = isOn;
  }
}
