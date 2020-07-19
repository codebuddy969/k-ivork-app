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
            sessionStorage.setItem('terminal-default', JSON.stringify(['apt-command']));
        }
    }

    createSession(id: string): void {
        if (window.sessionStorage) {
            sessionStorage.setItem(id, JSON.stringify(['initial-command']));
        }
    }

    createTheme(id: string): void {
        const condition = sessionStorage.getItem(`theme-${id}`);
        if (window.sessionStorage && !condition) {
            sessionStorage.setItem(`theme-${id}`, JSON.stringify({}));
        }
    }

    updateTheme(id: string, config: any): void {
        sessionStorage.setItem(`theme-${id}`, JSON.stringify(config));
    }

    readTheme(id: string) {
        if (window.sessionStorage) {
            return JSON.parse(sessionStorage.getItem(`theme-${id}`));
        }
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
