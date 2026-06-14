/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--color-canvas)',
        primary: 'var(--color-primary)',
        'on-primary': 'var(--color-on-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        'primary-focus': 'var(--color-primary-focus)',
        ink: 'var(--color-ink)',
        'ink-muted': 'var(--color-ink-muted)',
        'ink-subtle': 'var(--color-ink-subtle)',
        'surface-1': 'var(--color-surface-1)',
        'surface-2': 'var(--color-surface-2)',
        hairline: 'var(--color-hairline)',
        'hairline-strong': 'var(--color-hairline-strong)',
      },
      fontFamily: {
        display: ['Inter', 'SF Pro Display', '-apple-system', 'system-ui', 'Segoe UI', 'sans-serif'],
        body: ['Inter', '-apple-system', 'system-ui', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SF Mono', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};
