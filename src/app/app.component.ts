import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {SessionService, BaseProvider, IServerData, IStyles} from '@app/core';

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
    styles = [];
    terminals = [];
    theme: IStyles;
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
            this.sessionService.createSession(`terminal-${this.getIdentifier}`);
            this.syncronizeTerminals();
        }
    }

    removeTerminal(id?: string) {
        this.sessionService.delete(id);
        this.syncronizeTerminals();
    }

    syncronizeTerminals() {
        this.styles = [];
        this.terminals = [];
        for (let i = 0; i < sessionStorage.length; i++) {
            if (sessionStorage.key(i).startsWith('terminal')) {
                this.terminals.push(sessionStorage.key(i));
            }
            if (sessionStorage.key(i).startsWith('theme')) {
                this.styles.push(
                    {[sessionStorage.key(i).slice(6)]: JSON.parse(sessionStorage.getItem(sessionStorage.key(i)))}
                );
            }
        }
        console.log(this.styles);
        this.cells = Math.ceil((this.terminals.length) / 2);
    }

    updateTerminalStyles(event: IStyles) {
        console.log('Config', event);
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
