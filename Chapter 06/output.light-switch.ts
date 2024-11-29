import { Component } from "@angular/core";

@Component({
  selector: "app-light-switch",
  standalone: true,
  template: `
    <button (click)="isOn = true">On</button>
    <button (click)="isOn = false">Off</button>
  `,
})
export class LightSwitchComponent {
  isOn = false;
}
