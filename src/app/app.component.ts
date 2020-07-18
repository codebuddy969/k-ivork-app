import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {SessionService, BaseProvider} from '@app/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [BaseProvider]
})
export class AppComponent implements OnInit {

    @ViewChild('self') private readonly self: NgForm;

    name = '';
    cells = 0;
    terminals = [];
    selected = 'terminal-default';
    options = ['File', 'Edit', 'View', 'Search', 'Terminal', 'Help'];
    model = {command: ''};

    constructor(
        private sessionService: SessionService,
        private baseProvider: BaseProvider
    ) {
        this.sessionService.createDefaultSession(this.terminals[0]);
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

    onSubmit(id: string) {
        this.sessionService.storeCommand(id, this.model.command);
        console.log(this.self);
        this.baseProvider.Request('GET', 'http://localhost:4200/assets/data.json').then(response => {
            console.log(response);
        });
        this.self.reset();
    }
}
