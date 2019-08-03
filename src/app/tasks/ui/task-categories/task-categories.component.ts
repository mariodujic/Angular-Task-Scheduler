import {Component} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Project} from '../../data/task.model';
import {slideInOutLeft} from '../../animations/slides';
import {UserInterfaceService} from '../../services/user-interface.service';
import {AddItemDialogModel} from '../../components/add-item-dialog/add-item-dialog.model';
import {take} from 'rxjs/operators';
import {AddRemoveItem} from '../../core/AddRemoveItem';
import {ItemType} from '../../core/ItemType';

@Component({
  selector: 'app-task-categories',
  animations: [slideInOutLeft],
  templateUrl: './task-categories.component.html',
  styleUrls: ['./task-categories.component.sass']
})
export class TaskCategoriesComponent implements AddRemoveItem {

  constructor(
    public taskService: TaskService,
    private uiService: UserInterfaceService<Project>
  ) {

    taskService.getCurrentProjectSubject().next(this.taskService.getProjects()[0]);
  }

  onProjectSelect(pursuit: Project) {
    this.taskService.getCurrentProjectSubject().next(pursuit);
  }

  onAddItem(): void {
    this.uiService.openDialog(
      new AddItemDialogModel('Add Project', false),
      ItemType.Project)
      .afterClosed()
      .pipe(take(1))
      .subscribe(
        response => {
          if (response.dialog.isDialogSubmitted) {
            this.taskService.addItem(response.item);
          }
        }
      );
  }

  onRemoveItem(itemId: string): void {
    this.taskService.removeItem(itemId);
  }
}
