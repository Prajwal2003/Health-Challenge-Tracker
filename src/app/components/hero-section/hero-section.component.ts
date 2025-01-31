import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css'],
})
export class HeroSectionComponent {

  @ViewChild('bottomAnchor') bottomAnchor!: ElementRef;

  nextPage() {
      setTimeout(() => this.scrollToBottom(), 50);
  }

  scrollToBottom() {
    if (this.bottomAnchor) {
      this.bottomAnchor.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }

}
