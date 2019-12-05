import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShoppingListComponent} from './shopping-list.component';

/*const routes: Routes = [
  {path: 'shopping-list', component: ShoppingListComponent},
];*/

@NgModule({
  //imports: [RouterModule.forChild(routes)],
  imports: [RouterModule.forChild([{path: '', component: ShoppingListComponent}])],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule {

}
