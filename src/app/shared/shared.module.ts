import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AutoFocusDirective, ClickOutsideDirective} from './directives';
import {DropdownComponent, StylesModalComponent} from './components';

@NgModule({
    declarations: [AutoFocusDirective, ClickOutsideDirective, DropdownComponent, StylesModalComponent],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ],
    exports: [AutoFocusDirective, ClickOutsideDirective, DropdownComponent, StylesModalComponent]
})
export class SharedModule {
}
