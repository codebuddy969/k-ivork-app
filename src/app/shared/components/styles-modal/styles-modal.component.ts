import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-styles-modal',
    templateUrl: './styles-modal.component.html',
    styleUrls: ['./styles-modal.component.css']
})
export class StylesModalComponent implements OnInit {

    @Output() action = new EventEmitter<void>();

    constructor() {
    }

    ngOnInit(): void {
    }
}
