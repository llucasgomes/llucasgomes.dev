import { Directive, ElementRef, inject, OnInit, OnDestroy, PLATFORM_ID, input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appRevealOnScroll]',
})
export class RevealOnScrollDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  readonly delay = input<number>(0);
  readonly threshold = input<number>(0.15);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const element = this.el.nativeElement;
    element.classList.add('reveal-init');

    if (this.delay() > 0) {
      element.style.transitionDelay = `${this.delay()}ms`;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            element.classList.add('reveal-visible');
            this.observer?.unobserve(element);
          }
        }
      },
      {
        threshold: this.threshold(),
        rootMargin: '0px 0px -40px 0px',
      }
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
