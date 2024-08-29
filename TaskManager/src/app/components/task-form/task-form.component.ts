import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { TaskService, Task } from '../../services/task.services';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.less'],
})
export class TaskFormComponent {
  task: Task = {
    id: 0,
    title: '',
    description: '',
    status: 'To Do',
    dueDate: new Date(),
  };
  taskForm: FormGroup;

  constructor(private taskService: TaskService, private router: Router, private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      status: ['', [Validators.required]],
      dueDate: ['', [Validators.required, this.isPastDateValidator]],
      description: ['']
    });
  }

  createTask(): void {
    // הוספת הטיפול בתאריך כאן
    let dueDate = new Date(this.taskForm.get('dueDate')?.value);
    dueDate.setHours(12); // מגדיר את השעה 12:00 במקום 00:00
    this.taskForm.get('dueDate')?.setValue(dueDate);
    if (this.taskForm.invalid) {
      return;
    }
    this.task = this.taskForm.value;
    this.task.dueDate = new Date(this.task.dueDate).toISOString() as unknown as Date;

    this.taskService.createTask(this.task).subscribe(() => {
      this.router.navigate(['/tasks']);
    });
  }

  isPastDateValidator(control: FormControl): { [key: string]: boolean } | null {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(control.value);
    if (selectedDate < today) {
      return { 'pastDate': true };
    }
    return null;
  }
}
