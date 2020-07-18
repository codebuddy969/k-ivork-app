import {Directive, ElementRef, Input, HostListener, DoCheck} from '@angular/core';
import {SessionService} from '@app/core';

@Directive({
    selector: '[appFocus]'
})
export class AutoFocusDirective implements DoCheck {

    @Input() appFocus: string;

    commandID = 0;

    constructor(private el: ElementRef, private sessionService: SessionService) {
    }

    @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        if (event.key === 'ArrowUp') {
            const history = this.sessionService.read(this.el.nativeElement.id);
            this.el.nativeElement.value = 'sadasdasdasd';

            console.log(history);
        }

        if (event.key === 'ArrowDown') {

        }
    }

    ngDoCheck() {
        this.el.nativeElement.focus();
    }
}
