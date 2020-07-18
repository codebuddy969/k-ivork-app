import {Directive, ElementRef, HostListener, DoCheck, OnInit} from '@angular/core';
import {SessionService} from '@app/core';

@Directive({
    selector: '[appFocus]'
})
export class AutoFocusDirective implements OnInit, DoCheck {

    commandID = 0;
    commandsList = [];

    constructor(private el: ElementRef, private sessionService: SessionService) {
    }

    @HostListener('document:keydown', ['$event']) onKeydown(event: KeyboardEvent) {
        if (event.key === 'ArrowUp') {
            this.commandsList = this.sessionService.read(this.el.nativeElement.id) as any;
            this.commandID = !this.commandID ? 0 : this.commandID - 1;
            this.el.nativeElement.value = this.commandsList[this.commandID];
        }

        if (event.key === 'ArrowDown') {
            this.commandsList = this.sessionService.read(this.el.nativeElement.id) as any;
            this.commandID = this.commandID === this.commandsList.length - 1 ? this.commandsList.length - 1 : this.commandID + 1;
            this.el.nativeElement.value = this.commandsList[this.commandID];
        }
    }

    ngOnInit() {
        this.commandsList = this.sessionService.read(this.el.nativeElement.id) as any;
        this.commandID = this.commandsList.length;
    }

    ngDoCheck() {
        this.el.nativeElement.focus();
    }
}
