import { Component, OnInit, OnChanges, SimpleChanges, Input, ViewChild, ElementRef, Renderer2, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit, OnChanges {

  @Input() title: string;
  @Input() body: string;
  @Input() link: string;

  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('truncator') truncator: ElementRef<HTMLElement>;
  @ViewChild('bodyText') bodyText: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['body'] || changes['title']) {
      this.updateTruncator();
    }
  }

  updateTruncator() {
    if (this.bodyText && this.bodyText.nativeElement) {
      let style = window.getComputedStyle(this.bodyText.nativeElement, null);
      let viewableHeight = parseInt(style.getPropertyValue("height"), 10);

      if (this.bodyText.nativeElement.scrollHeight > viewableHeight) {
        // if there is a text overflow, show the fade out truncator
        if (this.truncator && this.truncator.nativeElement) {
          this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
        }
      } else {
        // else (there is no text overflow), hide the fade out truncator
        if (this.truncator && this.truncator.nativeElement) {
          this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
        }
      }
    }
  }

  onXButtonClick() {
    this.deleteEvent.emit();
  }
}
