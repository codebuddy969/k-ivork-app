import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AutoFocusDirective, ClickOutsideDirective} from './directives';
import {DropdownComponent} from './components';

@NgModule({
    declarations: [AutoFocusDirective, ClickOutsideDirective, DropdownComponent],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [AutoFocusDirective, ClickOutsideDirective, DropdownComponent]
})
export class SharedModule {
}
