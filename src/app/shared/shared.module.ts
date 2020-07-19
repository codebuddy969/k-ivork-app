import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AutoFocusDirective, ClickOutsideDirective} from './directives';
import {DropdownComponent} from './components';
import { StylesModalComponent } from './components/styles-modal/styles-modal.component';

@NgModule({
    declarations: [AutoFocusDirective, ClickOutsideDirective, DropdownComponent, StylesModalComponent],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [AutoFocusDirective, ClickOutsideDirective, DropdownComponent, StylesModalComponent]
})
export class SharedModule {
}
