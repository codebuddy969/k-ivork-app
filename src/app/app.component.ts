import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {SessionService, BaseProvider, IServerData} from '@app/core';

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
    modal = '';
    terminals = [];
    serverData: any;
    selected = 'terminal-default';
    options = ['File', 'Edit', 'View', 'Search', 'Terminal', 'Help'];
    model = {command: ''};

    constructor(
        private sessionService: SessionService,
        private baseProvider: BaseProvider
    ) {
        this.sessionService.createDefaultSession();
    }

    get getIdentifier() {
        return Math.floor(new Date().getTime() + Math.random()).toString(36);
    }

    ngOnInit() {
        this.syncronizeTerminals();
    }

    callOperation(name) {
        this[name]();
    }

    addTerminal() {
        if (this.terminals.length <= 5) {
            const identifier = this.getIdentifier;
            this.sessionService.createSession(`terminal-${identifier}`);
            this.syncronizeTerminals();
        }
    }

    removeTerminal(id?: string) {
        this.sessionService.delete(id);
        this.syncronizeTerminals();
    }

    syncronizeTerminals() {
        this.terminals = [];
        for (let i = 0; i < sessionStorage.length; i++) {
            this.terminals.push(sessionStorage.key(i));
        }
        this.cells = Math.ceil((this.terminals.length) / 2);
    }

    onSubmit(id: string) {
        this.sessionService.store(id, this.model.command);
        this.baseProvider.Request('GET', `https://jsonplaceholder.typicode.com/posts?userId=${this.model.command}`)
            .then(response => {
                this.serverData = response as any;
                this.self.reset();
            })
            .catch((e) => {
                console.log(e); // "Bad, bad, bad!"
            });
    }
}
