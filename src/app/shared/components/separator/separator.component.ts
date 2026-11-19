import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { mergeClasses } from '@/shared/utils/merge-classes';

@Component({
  selector: 'z-separator, hr[z-separator]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ``,
  host: {
    role: 'separator',
    '[attr.aria-orientation]': 'orientation()',
    '[class]': 'classes()',
  },
})
export class ZardSeparatorComponent {
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  readonly class = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses(
      'shrink-0 bg-border',
      this.orientation() === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
      this.class()
    )
  );
}
