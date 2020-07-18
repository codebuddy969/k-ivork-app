import {Component, OnInit} from '@angular/core';
import {SessionService} from '@app/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    name = '';
    cells = 0;
    terminals = [];
    selected = 'terminal-default';
    options = ['File', 'Edit', 'View', 'Search', 'Terminal', 'Help'];

    constructor(private sessionService: SessionService
    ) {
        this.sessionService.createDefaultSession(this.terminals[0]);
        this.sessionService.storeCommand('hello');
    }

    ngOnInit() {
        for (let i = 0; i < sessionStorage.length; i++){
            this.terminals.push(sessionStorage.key(i));
        }
        this.cells = Math.ceil((this.terminals.length) / 2);
    }

    get getIdentifier() {
        return Math.floor(new Date().getTime() + Math.random()).toString(36);
    }

    setTerminal(name) {
        if (this.terminals.length <= 5) {
            const identifier = this.getIdentifier;
            this.sessionService.createSession(`terminal-${identifier}`);
            this.terminals.push(`terminal-${identifier}`);
            this.cells = Math.ceil((this.terminals.length) / 2);
        }
    }
}
