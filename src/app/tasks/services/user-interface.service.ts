import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {AddItemDialogComponent} from '../components/add-item-dialog/add-item-dialog.component';
import {AddItemDialogModel} from '../components/add-item-dialog/add-item-dialog.model';
import {ItemType} from '../core/ItemType';

@Injectable({
  providedIn: 'root'
})
export class UserInterfaceService<T> {

  constructor(private dialog: MatDialog) {
  }

  public openDialog(dialogModel: AddItemDialogModel, itemType: string): MatDialogRef<AddItemDialogComponent> {
    return this.dialog.open(AddItemDialogComponent, {
      data: {
        dialog: dialogModel,
        type: itemType
      }
    });
  }
}
