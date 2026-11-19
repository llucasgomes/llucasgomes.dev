import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { mergeClasses } from '@/shared/utils/merge-classes';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:scale-[0.98] transition-transform',
        destructive: 'bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90',
        outline: 'border border-border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-6 text-base',
        icon: 'h-9 w-9 p-0',
        iconSm: 'h-8 w-8 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

@Component({
  selector: 'z-button, button[z-button], a[z-button]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content></ng-content>`,
  host: {
    '[class]': 'classes()',
    '[attr.disabled]': 'disabled() ? true : null',
  },
})
export class ZardButtonComponent {
  readonly variant = input<ButtonVariantProps['variant']>('default');
  readonly size = input<ButtonVariantProps['size']>('default');
  readonly class = input<string>('');
  readonly disabled = input<boolean>(false);

  protected readonly classes = computed(() =>
    mergeClasses(buttonVariants({ variant: this.variant(), size: this.size() }), this.class())
  );
}
