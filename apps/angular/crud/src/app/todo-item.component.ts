import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { NgIf } from '@angular/common';
import {
  getTodos,
  setTodos,
  selectTodo$,
  setIsTodoLoading,
  setNotLoading,
} from './todo.store';
import { Todo } from './todo';
import { toSignal } from '@angular/core/rxjs-interop';
import { TodoService } from './todo.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [NgIf],
  template: `
    <div *ngIf="todo.id === this.selectedId && todoItem()?.loading">
      loading ...
    </div>
    <div>{{ todo.title }}</div>
    <div>
      <button (click)="updateTodo(todo)">update todo</button>
    </div>
    <!-- <div *ngIf="todoItem()?.loading">loading...</div> -->
    <!-- <div>
      <ng-container *ngIf="todoItem()?.error; else noError">
        error loading todo
      </ng-container>
      <ng-template #noError>
        <div>
          {{ todoItem()?.todo?.title }}
        </div>
        <button (click)="updateTodo(todoItem()?.todo)">update</button>
      </ng-template>
    </div> -->
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  // @Input() set todo(todo: Todo) {
  //   setTodo(todo);
  // }
  selectedId: number | undefined = 0;
  @Input() todo!: Todo;

  private todoservice = inject(TodoService);

  todoItem = toSignal(selectTodo$.pipe(tap((x) => console.log(x))));

  updateTodo(todo?: Todo) {
    this.selectedId = todo?.id;
    setIsTodoLoading();
    this.todoservice.updateTodos(todo).subscribe((res) => {
      const todos = getTodos().map((todoitem) =>
        todoitem.id === todo?.id ? res : todoitem
      );
      setTodos(todos);
      setNotLoading();
    });
  }
}
