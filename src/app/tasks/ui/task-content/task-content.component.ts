import {Component} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {take} from 'rxjs/operators';
import {Task} from '../../data/task.model';
import {AddRemoveItem} from '../../core/AddRemoveItem';
import {UserInterfaceService} from '../../services/user-interface.service';
import {ItemType} from '../../core/base/ItemType';
import {combineLatest} from 'rxjs';
import {SnackbarType} from '../../utils/handlers/SnackbarType';
import {SnackbarTime} from '../../utils/handlers/SnackbarTime';
import {environment} from '../../../../environments/environment.prod';
import {ItemBase} from '../../core/base/ItemBase';

@Component({
  selector: 'app-task-content',
  templateUrl: './task-content.component.html',
  styleUrls: ['./task-content.component.sass']
})
export class TaskContentComponent extends ItemBase<Task> implements AddRemoveItem {

  currentTaskIndex;

  constructor(public taskService: TaskService,
              public uiService: UserInterfaceService<Task>) {
    super(uiService);
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
    combineLatest(this.dialogResponse('Add Project', ItemType.Task), this.taskService.getCurrentProjectSubject())
      .subscribe(value => {
        if (value[0].dialog.isDialogSubmitted) {
          this.taskService.addItem(value[1], value[0].item);
          this.uiService.showSnackbar(SnackbarType.SUCCESS, environment.taskSuccessfullyAdded, SnackbarTime.LONG);
        }
      });
  }

  onRemoveItem(itemId: string): void {
    this.taskService.getCurrentProjectSubject()
      .pipe(take(1))
      .subscribe(
        project => {
          this.taskService.removeItem(project.id, itemId);
          this.uiService.showSnackbar(SnackbarType.SUCCESS, environment.taskSuccessfullyRemoved, SnackbarTime.LONG);
        }
      );
  }
}
