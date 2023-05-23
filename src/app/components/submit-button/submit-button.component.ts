import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss'],
})
export class SubmitButtonComponent {
  @Input() label!: string;
  @Input() icon!: string;
  @Input() class!: string;
  @Input() isDisabled!: boolean;
  @Output() clicked: EventEmitter<any> = new EventEmitter<any>();

  onClick() {
    this.clicked.emit();
  }
}
