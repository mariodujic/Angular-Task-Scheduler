import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AddItemDialogModel} from './add-item-dialog.model';
import {Project, Task} from '../../data/task.model';
import {ItemType} from '../../core/ItemType';

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.sass']
})
export class AddItemDialogComponent {

  public readonly dialogModel: AddItemDialogModel;
  public itemModel: Project | Task;

  constructor(
    public dialogRef: MatDialogRef<AddItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.dialogModel = data.dialog;
    this.setItemModel(data);
  }

  private setItemModel(data) {
    if (data.type === ItemType.Project) {
      this.itemModel = new Project();
    } else if (data.type === ItemType.Task) {
      this.itemModel = new Task(new Date());
    }
  }

  public onDismiss(isSubmitted: boolean): void {
    this.dialogModel.isDialogSubmitted = isSubmitted;
    this.dialogRef.close(
      {
        dialog: this.dialogModel,
        item: this.itemModel
      }
    );
  }
}
