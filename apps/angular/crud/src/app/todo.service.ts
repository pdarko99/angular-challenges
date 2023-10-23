import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Todo } from './todo';
import { randText } from '@ngneat/falso';
import { tap } from 'rxjs';
import { setTodos, todoDataSource$ } from './todo.store';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);
  todos$ = todoDataSource$;

  getTodos = () =>
    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe(tap((x) => setTodos(x)));

  updateTodos = (todo?: Todo) => {
    return this.http.put<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${todo?.id}`,
      JSON.stringify({
        todo: todo?.id,
        title: randText(),
        body: todo?.body,
        userId: todo?.userId,
      }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );
  };
}
