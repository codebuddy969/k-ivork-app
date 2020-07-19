import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
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
    @ViewChild('field') field: ElementRef;

    name = '';
    cells = 0;
    modal = '';
    terminals = [];
    serverData: any;
    selected = 'terminal-initial';
    options = ['File', 'Edit', 'View', 'Search', 'Terminal', 'Help'];

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
        this.terminals = [];
        for (let i = 0; i < sessionStorage.length; i++) {
            if (sessionStorage.key(i).startsWith('terminal')) {
                this.terminals.push({
                    name: sessionStorage.key(i),
                    styles: this.sessionService.read(`theme-${sessionStorage.key(i)}`)
                });
            }
        }
        this.cells = Math.ceil((this.terminals.length) / 2);
    }

    onSubmit(id: string) {
        const fieldValue = this.field.nativeElement.value;
        const commands = fieldValue.replace(/ /g, '').split('&')

        this.sessionService.store(id, fieldValue);
        this.serverData = [];

        commands.map(command => {
            this.baseProvider.Request('GET', `https://jsonplaceholder.typicode.com/${command}`)
                .then(response => {
                    this.serverData.push(response);
                    this.self.reset();
                })
                .catch((e) => {
                    console.log(e);
                });
        });
    }
}
