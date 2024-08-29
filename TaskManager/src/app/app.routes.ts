import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskService } from './services/task.services';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/new', component: TaskFormComponent },
  { path: 'tasks/:id', component: TaskDetailComponent },
  { path: '**', redirectTo: '/tasks' }
];


@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule,FormsModule],
  exports: [RouterModule],
  providers: [TaskService]
})
export class AppRoutingModule {}
