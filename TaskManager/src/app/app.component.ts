import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routes';
import { TaskListComponent } from "./components/task-list/task-list.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppRoutingModule, FormsModule, HttpClientModule, TaskListComponent, CommonModule],
  templateUrl: './app.component.html',
//   template: `
//   <h1>Task Manager</h1>
//   <app-task-list></app-task-list>
// `,
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'TaskManager';
}
