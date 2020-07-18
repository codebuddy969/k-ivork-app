import {Component, Input, Output, EventEmitter, OnChanges} from '@angular/core';

enum Actions {
    'New Terminal' = 'addTerminal',
    'Remove Terminal' = 'removeTerminal',
}


@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnChanges {

    @Input() name: string;
    @Output() action = new EventEmitter<string>();

    list = [];
    options = {
        file: ['New File', 'Remove File'],
        terminal: ['New Terminal', 'Remove Terminal']
    };

    constructor() {
    }

    ngOnChanges() {
        this.list = this.options[this.name.toLowerCase()];
    }

    setAction(actionName: string): void {
        this.action.emit(Actions[actionName]);
    }
}
