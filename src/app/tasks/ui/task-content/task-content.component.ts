import {Component} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {take} from 'rxjs/operators';
import {Task} from '../../data/task.model';
import {AddRemoveItem} from '../../core/AddRemoveItem';
import {UserInterfaceService} from '../../services/user-interface.service';
import {AddItemDialogModel} from '../../components/add-item-dialog/add-item-dialog.model';
import {ItemType} from '../../core/ItemType';
import {combineLatest, Observable} from 'rxjs';
import {SnackbarType} from '../../utils/SnackbarType';
import {SnackbarTime} from '../../utils/SnackbarTime';
import {environment} from '../../../../environments/environment.prod';

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

  // first observable holds task and dialog data, second dialog holds project data
  onAddItem(): void {
    combineLatest(this.dialogResponse(), this.taskService.getCurrentProjectSubject())
      .subscribe(value => {
        if (value[0].dialog.isDialogSubmitted) {
          this.taskService.addItem(value[1], value[0].item);
          this.uiService.showSnackbar(SnackbarType.SUCCESS, environment.taskSuccessfullyAdded, SnackbarTime.LONG);
        }
      });
  }

  private dialogResponse(): Observable<any> {
    return this.uiService.openDialog(
      new AddItemDialogModel('Add Project', false),
      ItemType.Task).afterClosed();
  }

  onRemoveItem(itemId: string): void {
    this.taskService.getCurrentProjectSubject().pipe(take(1))
      .subscribe(
        project => this.taskService.removeItem(project.id, itemId)
      );
  }
}
