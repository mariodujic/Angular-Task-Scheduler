import {Component} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Project, Task} from '../../data/task.model';
import {slideInOutLeft} from '../../animations/slides';
import {UserInterfaceService} from '../../services/user-interface.service';
import {take} from 'rxjs/operators';
import {AddRemoveItem} from '../../core/AddRemoveItem';
import {ItemBase} from '../../core/base/ItemBase';
import {ItemType} from '../../core/base/ItemType';
import {environment} from '../../../../environments/environment.prod';

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


    this.taskService.addItem(new Project('asdasd', 'Title', [new Task(new Date(), 'Title', 'Descri', 'asdasd')]));


    taskService.getCurrentProjectSubject().next(this.taskService.getProjects()[0]);
  }

  onProjectSelect(project: Project) {
    this.taskService.getCurrentProjectSubject().next(project);
  }

  onAddItem(): void {
    this.dialogResponse(environment.addProjectTitle, ItemType.AddProject)
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
    this.dialogResponse(environment.removeProjectTitle, ItemType.RemoveProject)
      .pipe(take(1))
      .subscribe(
        response => {
          if (response.dialog.isDialogSubmitted) {
            this.taskService.removeItem(itemId, null);
          }
        }
      );
  }
}
