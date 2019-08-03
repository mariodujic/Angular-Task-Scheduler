import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'float-button',
  templateUrl: './float-button.component.html',
  styleUrls: ['./float-button.component.sass']
})
export class FloatButtonComponent {

  @Output() isTaskAdded: EventEmitter<boolean> = new EventEmitter();

  onAddTask() {
    this.isTaskAdded.emit(null);
  }
}
