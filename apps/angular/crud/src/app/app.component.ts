import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { TodoService } from './todo.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngIf="todos()?.loading">loading...</div>
    <div>
      <ng-container *ngIf="todos()?.error; else noError">
        error loading page
      </ng-container>
      <ng-template #noError>
        <div *ngIf="todos()?.todo as todos">
          <div *ngFor="let todo of todos">
            {{ todo.title }}
            <button>Update</button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  private http = inject(HttpClient);
  private todoService = inject(TodoService);
  todos = toSignal(this.todoService.todos$);

  ngOnInit(): void {
    this.todoService.getTodos().subscribe();
  }
}
