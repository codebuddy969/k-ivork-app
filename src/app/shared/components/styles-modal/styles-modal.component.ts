import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SessionService, IStyles} from '@app/core';

@Component({
    selector: 'app-styles-modal',
    templateUrl: './styles-modal.component.html',
    styleUrls: ['./styles-modal.component.css']
})
export class StylesModalComponent implements OnInit {

    @Input() name: string;
    @Output() action = new EventEmitter<void>();
    @Output() config = new EventEmitter<IStyles>();

    model: IStyles = {
        background: '#e66465',
        color: '#e66465',
        size: 16,
        cursor: 'normal'
    };

    constructor(private sessionService: SessionService) {
    }

    ngOnInit(): void {
        this.sessionService.createTheme(this.name);
    }

    updateTheme() {
        this.sessionService.updateTheme(this.name, this.model);
        this.config.emit(this.model);
    }
}
