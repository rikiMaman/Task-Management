import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

import { TaskService, Task } from '../../services/task.services';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, MatListModule, MatFormFieldModule, MatInputModule, MatSelectModule, RouterModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.less'],
})
export class TaskDetailComponent implements OnInit {
  task: Task | undefined;
  formattedDueDate: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTask(id).subscribe((task) => {
      this.task = task;
      if (this.task && this.task.dueDate) {
        this.formattedDueDate = this.formatDate(new Date(this.task.dueDate));
      }
      this.changeDetectorRef.detectChanges();
    });
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  isPastDate(date: string | Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(date);
    return selectedDate < today;
  }

  onSubmit(form: NgForm): void {
    if (form.invalid || !this.isValidDate()) {
      form.controls['title'].markAsTouched();
      form.controls['dueDate'].markAsTouched();
      form.controls['status'].markAsTouched();
      return;
    }

    this.updateTask();
  }

  isValidDate(): boolean {
    if (!this.formattedDueDate) return false;
    const selectedDate = new Date(this.formattedDueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }

  updateTask(): void {
    if (this.task && this.formattedDueDate && this.isValidDate()) {
      let dueDate = new Date(this.formattedDueDate);
      dueDate.setHours(12); // מגדיר את השעה 12:00 במקום 00:00
      this.task.dueDate = dueDate;

      // this.task.dueDate = new Date(this.formattedDueDate);
      this.taskService.updateTask(this.task).subscribe({
        next: () => {
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          console.error('Error updating task:', error);
        },
      });
    }
  }
}
