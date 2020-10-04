import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegistrationComponent} from './components/registration/registration.component';
import {TodosComponent} from './components/todos/todos.component';
import {AuthGuard} from './guards/auth.guard';
import {RegisterGuard} from './guards/register.guard';


const routes: Routes = [
  {
    path: '',
    canActivate: [RegisterGuard],
    component: RegistrationComponent
  },
  {
    path: 'todos',
    canActivate: [AuthGuard],
    component: TodosComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
