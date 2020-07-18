import { Injectable, Inject } from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class SessionService {

    private window: Window;

    constructor(@Inject(DOCUMENT) private document: Document) {
        this.window = this.document.defaultView;
    }

    createDefaultSession(id: string): void {
        if (window.sessionStorage && !sessionStorage.length) {
            sessionStorage.setItem('terminal-default', JSON.stringify(['apt-command']));
        }
    }

    createSession(id: string): void {
        sessionStorage.setItem(id, JSON.stringify(['apt-command']));
    }

    storeCommand(command: string): void {
        if (window.sessionStorage) {
            const data = JSON.parse(sessionStorage.getItem('terminal-default'));
            data.push(command);
            sessionStorage.setItem('terminal-default', JSON.stringify(data));
        }
    }

    read(id: string): void {
        if (window.sessionStorage) {
            return JSON.parse(sessionStorage.getItem(id));
        }
    }

    delete(key: string): void {
        if (window.sessionStorage) {
            sessionStorage.removeItem(key);
        }
    }

    clear(): void {
        if (window.sessionStorage) {
            sessionStorage.clear();
        }
    }
}
