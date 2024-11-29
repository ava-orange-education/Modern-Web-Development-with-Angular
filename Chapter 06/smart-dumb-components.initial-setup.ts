import { Component, EventEmitter, Input, Output } from "@angular/core";

interface TodoItem {
  name: string;
  isDone: boolean;
}

@Component({
  selector: "app-todo-item",
  standalone: true,
  template: `
    <span>
      <input type="checkbox" [checked]="todoItem.isDone" />
      <span>{{ todoItem.name }}</span>
    </span>
  `,
})
export class TodoItemComponent {
  @Input({ required: true }) todoItem!: TodoItem;
}

@Component({
  selector: "app-todo-list",
  standalone: true,
  imports: [TodoItemComponent],
  template: `
    @for (todo of todoItems; track todo.name) {
    <app-todo-item [todoItem]="todo" />
    }
  `,
})
export class TodoListComponent {
  @Input() todoItems: TodoItem[] = [];
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [TodoListComponent],
  template: `<app-todo-list [todoItems]="todoItems" />`,
})
export class AppComponent {
  todoItems: TodoItem[] = [
    { isDone: true, name: "Get groceries" },
    { isDone: false, name: "Do the dishes" },
  ];
}
