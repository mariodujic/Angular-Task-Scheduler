import {Component} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {take} from 'rxjs/operators';
import {Task} from '../../data/task.model';
import {AddRemoveItem} from '../../core/AddRemoveItem';
import {UserInterfaceService} from '../../services/user-interface.service';
import {AddItemDialogModel} from '../../components/add-item-dialog/add-item-dialog.model';
import {ItemType} from '../../core/ItemType';

@Component({
  selector: 'app-task-content',
  templateUrl: './task-content.component.html',
  styleUrls: ['./task-content.component.sass']
})
export class TaskContentComponent implements AddRemoveItem {

  currentTaskIndex;

  constructor(public taskService: TaskService,
              public uiService: UserInterfaceService<Task>) {
  }

  setTaskIndex(index: number) {
    this.currentTaskIndex = index;
  }

  nextTask() {
    this.currentTaskIndex++;
  }

  previousTask() {
    this.currentTaskIndex--;
  }

  // TODO improve this into possibly mergin to observables
  onAddItem(): void {
    this.uiService.openDialog(
      new AddItemDialogModel('Add Project', false),
      ItemType.Task)
      .afterClosed()
      .pipe(take(1))
      .subscribe(
        response => {
          this.taskService.getCurrentProjectSubject()
            .pipe(take(1))
            .subscribe(
              project => {
                if (response.dialog.isDialogSubmitted) {
                  this.taskService.addItem(project, response.item);
                }
              }
            );
        }
      );
  }

  onRemoveItem(itemId: string): void {
    this.taskService.getCurrentProjectSubject().pipe(take(1))
      .subscribe(
        project => this.taskService.removeItem(project.id, itemId)
      );
  }
}
