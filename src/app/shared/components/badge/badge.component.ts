import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { mergeClasses } from '@/shared/utils/merge-classes';

export const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground shadow-xs',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground shadow-xs',
        outline: 'border-border text-foreground bg-background/50',
        emerald: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
        amber: 'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;

@Component({
  selector: 'z-badge, span[z-badge]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content></ng-content>`,
  host: {
    '[class]': 'classes()',
  },
})
export class ZardBadgeComponent {
  readonly variant = input<BadgeVariantProps['variant']>('default');
  readonly class = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses(badgeVariants({ variant: this.variant() }), this.class())
  );
}
