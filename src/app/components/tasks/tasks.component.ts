import { Component, OnInit } from '@angular/core';
import {Task} from '../../Task';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from "../task-item/task-item.component";


@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  constructor(private taskService: TaskService) { }
  ngOnInit(): void {
    this.taskService.getTasks().subscribe(((tasks) => this.tasks = tasks));
  }
  
  deleteTask(task: Task) {
    console.log(`Deleting task with ID: ${task.id}`);
    this.taskService
    .deleteTask(task)
    .subscribe(
      () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
    );
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }

}
