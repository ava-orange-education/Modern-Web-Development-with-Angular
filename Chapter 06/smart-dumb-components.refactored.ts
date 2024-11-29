import { Component, EventEmitter, Input, Output } from "@angular/core";

interface TodoItem {
  id: number;
  name: string;
  isDone: boolean;
}

@Component({
  selector: "app-todo-item",
  standalone: true,
  template: `
    <span (click)="toggleCompletion.emit()">
      <input type="checkbox" [checked]="todoItem.isDone" />
      <span>{{ todoItem.name }}</span>
    </span>
  `,
})
export class TodoItemComponent {
  @Input({ required: true }) todoItem!: TodoItem;
  @Output() toggleCompletion = new EventEmitter<void>();
}

@Component({
  selector: "app-todo-list",
  standalone: true,
  imports: [TodoItemComponent],
  template: `
    <ul>
      @for (todo of todoItems; track todo.id) {
      <li>
        <app-todo-item
          [todoItem]="todo"
          (toggleCompletion)="onToggleCompletion(todo.id)"
        />
        <button (click)="deleteItem(todo.id)">Delete</button>
      </li>
      }
    </ul>
  `,
})
export class TodoListComponent {
  todoItems: TodoItem[] = [
    { id: 1, name: "Get groceries", isDone: true },
    { id: 2, name: "Do the dishes", isDone: false },
  ];

  deleteItem(id: number): void {
    this.todoItems = this.todoItems.filter((item) => item.id !== id);
  }

  onToggleCompletion(id: number): void {
    this.todoItems = this.todoItems.map((item) =>
      item.id === id ? { ...item, isDone: !item.isDone } : item
    );
  }
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [TodoListComponent],
  template: `<app-todo-list />`,
})
export class AppComponent {}
