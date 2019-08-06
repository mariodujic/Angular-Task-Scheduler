import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AddItemDialogModel} from './add-item-dialog.model';
import {Project, Task} from '../../data/task.model';
import {ItemType} from '../../core/base/ItemType';
import {UserInterfaceService} from '../../services/user-interface.service';
import {SnackbarType} from '../../utils/handlers/SnackbarType';
import {environment} from '../../../../environments/environment.prod';
import {SnackbarTime} from '../../utils/handlers/SnackbarTime';

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.sass']
})
export class AddItemDialogComponent {

  public readonly dialogModel: AddItemDialogModel;
  public itemModel: Project | Task;
  // instance is passed from parent(where this component is invoked as dialog)
  public uiService: UserInterfaceService<Project | Task>;

  constructor(
    public dialogRef: MatDialogRef<AddItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.dialogModel = data.dialog;
    this.setItemModel(data);
  }

  private setItemModel(data) {
    if (data.type === ItemType.AddProject) {
      this.itemModel = new Project();
    } else if (data.type === ItemType.AddTask) {
      this.itemModel = new Task(new Date());
    }
  }

  public onDismiss(isSubmitted: boolean): void {
    console.log(this.itemModel.title);
    if (isSubmitted && this.itemModel.title === '') {
      this.rejectDialogSubmission();
    } else {
      this.acceptDialogSubmission();
    }
  }

  private rejectDialogSubmission(): void {
    this.uiService.showSnackbar(SnackbarType.WARNING, environment.noDialogInput, SnackbarTime.LONG);
  }

  private acceptDialogSubmission(): void {
    this.dialogModel.isDialogSubmitted = true;
    this.dialogRef.close(
      {
        dialog: this.dialogModel,
        item: this.itemModel
      }
    );
  }
}
