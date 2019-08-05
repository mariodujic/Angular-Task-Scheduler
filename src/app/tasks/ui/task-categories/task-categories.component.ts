import {Component} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Project} from '../../data/task.model';
import {slideInOutLeft} from '../../animations/slides';
import {UserInterfaceService} from '../../services/user-interface.service';
import {take} from 'rxjs/operators';
import {AddRemoveItem} from '../../core/AddRemoveItem';
import {ItemBase} from '../../core/base/ItemBase';
import {ItemType} from '../../core/base/ItemType';

@Component({
  selector: 'app-task-categories',
  animations: [slideInOutLeft],
  templateUrl: './task-categories.component.html',
  styleUrls: ['./task-categories.component.sass']
})
export class TaskCategoriesComponent extends ItemBase<Project> implements AddRemoveItem {

  constructor(
    public taskService: TaskService,
    public uiService: UserInterfaceService<Project>
  ) {
    super(uiService);

    taskService.getCurrentProjectSubject().next(this.taskService.getProjects()[0]);
  }

  onProjectSelect(project: Project) {
    console.log(project);
    this.taskService.getCurrentProjectSubject().next(project);
  }

  onAddItem(): void {
    this.dialogResponse('Add Project', ItemType.Project)
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
