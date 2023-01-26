import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {

  static show: () => void = () => {};
  static hide: () => void = () => {};

  isVisible = false;

  constructor() {
    LoadingSpinnerComponent.show = () => this.changeVisibility(true);
    LoadingSpinnerComponent.hide = () => this.changeVisibility(false);
  }

  changeVisibility(isVisible: boolean) {
    this.isVisible = isVisible;
  }
}
