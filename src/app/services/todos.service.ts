import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TodosService {
  private _apiUrl = environment.apiUrl;

  constructor(private _http: HttpClient) {
  }

  getTodos() {
    return this._http.get(`${this._apiUrl}/todos`);
  }

  getTodosByUser(id: number) {
    return this._http.get(`${this._apiUrl}/todos?userId=${id}`);
  }

  addTodo(todo) {
    return this._http.post(`${this._apiUrl}/todos`, todo);
  }

  updateTodo(todo) {
    return this._http.put(`${this._apiUrl}/todos/${todo.id}`, todo);
  }

  removeTodo(id: number) {
    return this._http.delete(`${this._apiUrl}/todos/${id}`);
  }
}
