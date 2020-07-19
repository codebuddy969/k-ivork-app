import {Injectable, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class SessionService {

    private window: Window;

    constructor(@Inject(DOCUMENT) private document: Document) {
        this.window = this.document.defaultView;
    }

    createDefaultSession(): void {
        if (window.sessionStorage && !sessionStorage.length) {
            sessionStorage.setItem('terminal-initial', JSON.stringify(['apt-command']));
            sessionStorage.setItem(`theme-terminal-initial`, JSON.stringify({}));
        }
    }

    createSession(id: string): void {
        if (window.sessionStorage) {
            sessionStorage.setItem(id, JSON.stringify(['initial-command']));
            sessionStorage.setItem(`theme-${id}`, JSON.stringify({}));
        }
    }

    updateTheme(id: string, config: any): void {
        sessionStorage.setItem(`theme-${id}`, JSON.stringify(config));
    }

    store(id: string, command: string): void {
        if (window.sessionStorage) {
            const data = JSON.parse(sessionStorage.getItem(id));
            data.push(command);
            sessionStorage.setItem(id, JSON.stringify(data));
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
            sessionStorage.removeItem(`theme-${key}`);
        }
    }
}
