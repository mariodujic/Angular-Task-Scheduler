import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing-module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {TasksComponent} from './tasks/ui/tasks.component';
import {TaskCategoriesComponent} from './tasks/ui/task-categories/task-categories.component';
import {TaskContentComponent} from './tasks/ui/task-content/task-content.component';
import {HoverDirective} from './tasks/directives/hover.directive';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DateLocalePipe} from './tasks/pipes/date-locale.pipe';
import {FloatButtonComponent} from './tasks/components/float-button/float-button.component';
import {ShortTextPipe} from './tasks/pipes/short-text.pipe';
import {TimestampPipe} from './tasks/pipes/timestamp.pipe';
import {AddItemDialogComponent} from './tasks/components/add-item-dialog/add-item-dialog.component';
import {FormsModule} from '@angular/forms';
import {TaskPriorityIconPipe} from './tasks/pipes/task-priority-icon.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TaskCategoriesComponent,
    TaskContentComponent,
    HoverDirective,
    DateLocalePipe,
    FloatButtonComponent,
    ShortTextPipe,
    TimestampPipe,
    AddItemDialogComponent,
    TaskPriorityIconPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,

    // Material
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddItemDialogComponent]
})
export class AppModule {
}
