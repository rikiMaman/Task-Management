import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { trigger, transition, style, animate } from '@angular/animations';

import { ReactiveFormsModule } from '@angular/forms';
import { TaskService, Task } from '../../services/task.services';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TaskDetailComponent,
    TaskFormComponent,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.less'],
  animations: [
    trigger('taskAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.5s', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  task: Task = {
    id: 0,
    title: '',
    description: '',
    status: '',
    dueDate: new Date()
  };
  filteredTasks: Task[] = []; // רשימת המשימות המסוננות לתצוגה
  paginatedTasks: Task[] = [];
  pageSize: number = 5;
  pageIndex: number = 0;
  searchQuery: string = ''; // שאילתת חיפוש
  sortOption: string = 'title';
  isLoading: boolean = false;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.filterTasks();
      // this.sortTasks(this.sortOption);
      this.updatePaginatedTasks();
    });
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePaginatedTasks();
  }

  updatePaginatedTasks() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedTasks = this.filteredTasks.slice(startIndex, endIndex);
  }

  createTask(): void {
    this.task.dueDate = new Date(this.task.dueDate).toISOString() as unknown as Date;
    this.taskService.createTask(this.task).subscribe((newTask) => {
      this.tasks.push(newTask);
      this.resetTask();
      this.filterTasks(); // עדכון הרשימה המסוננת לאחר הוספת משימה חדשה
    });
  }

  resetTask(): void {
    this.task = {
      id: 0,
      title: '',
      description: '',
      status: '',
      dueDate: new Date() // Reset to current date or empty date
    };
  }

  deleteTask(taskId: number) {
    this.isLoading = true;
    this.taskService.deleteTask(taskId).subscribe(() => {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
      this.isLoading = false;
      this.filterTasks();
    }, error => {
      this.isLoading = false;
      // handle error
    });
  }

  filterTasks(): void {
    this.filteredTasks = this.tasks.filter(task =>
      task.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.sortTasks(this.sortOption); // מיון לאחר הסינון
    this.updatePaginatedTasks(); // עדכון המשימות המפוצלות לעמודים
  }
  
  sortTasks(sortBy: string): void {
    if (sortBy === 'title') {
      this.filteredTasks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'dueDate') {
      this.filteredTasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    }
    this.updatePaginatedTasks();
  }
}
