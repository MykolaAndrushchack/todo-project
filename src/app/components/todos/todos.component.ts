import {Component, HostListener, OnInit} from '@angular/core';
import {TodosService} from '../../services/todos.service';
import {IdentityService} from '../../services/identity.service';
import {ITodo, IUserResponse} from '../../models/models';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  form: FormGroup;
  todos: any;
  currentUser: IUserResponse;
  todoChange: ITodo;

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.cancel();
  }

  constructor(private _todosService: TodosService,
              private _identity: IdentityService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
    });

    this._todosService.getTodos()
      .subscribe(value => {
        this.todos = value;
      });

    this.currentUser = this._identity.fullProfile;
  }

  handleAdd() {
    const todo: ITodo = {
      id: this._id(),
      userId: this.currentUser.id,
      title: this.form.value.title,
      completed: false
    };

    this._todosService.addTodo(todo)
      .subscribe(
        (g) => {
          this.todos = [todo, ...this.todos];
          this.form.reset();
        },
        (error => console.error(error))
      );
  }

  handleEdit() {
    const {title} = this.form.value;

    const updatedTodo = {
      ...this.todoChange,
      title
    };

    this._todosService.updateTodo(updatedTodo)
      .subscribe(
        () => {
          this.todos.find(todo => todo.id === this.todoChange.id).title = this.form.value.title;
          this.cancel();
        },
        (error) => {
          console.error(error);
          console.log('This error is occurred because in api not has id equal to this todo id!, Don\'t worry)');
          this.todos.find(todo => todo.id === this.todoChange.id).title = this.form.value.title;
          this.cancel();
        }
      );
  }

  handleClickEdit(todo) {
    this.todoChange = todo;
    this.form.controls['title'].setValue(todo.title);
  }

  handleDelete(id: number) {
    this._todosService.removeTodo(id)
      .subscribe(
        () => {
          if (this.todoChange && this.todoChange.id === id) {
            this.cancel();
          }
          this.todos = this.todos.filter((todo) => todo.id !== id);
        }
      );
  }

  cancel() {
    this.todoChange = null;
    this.form.reset();
  }

  private _id() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
}
