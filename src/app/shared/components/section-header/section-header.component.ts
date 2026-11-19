import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-2 mb-10 md:mb-14">
      <div class="inline-flex items-center gap-2">
        <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
        <span class="font-mono text-xs font-semibold tracking-wider uppercase text-muted-foreground">
          {{ eyebrow() }}
        </span>
      </div>
      <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
        {{ title() }}
      </h2>
      @if (description()) {
        <p class="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
          {{ description() }}
        </p>
      }
    </div>
  `,
})
export class SectionHeaderComponent {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input<string>('');
}
