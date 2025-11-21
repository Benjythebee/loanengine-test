# Storybook Configuration with Tailwind CSS v4

This Storybook configuration is set up to work with Tailwind CSS v4 and includes:

## Features

- ✅ Tailwind CSS v4 support with PostCSS
- ✅ Theme switching (light/dark mode)
- ✅ Accessibility testing
- ✅ Vitest integration
- ✅ Next.js compatibility

## Configuration Files

### `main.ts`
- Configures Storybook with Next.js Vite
- Sets up PostCSS for Tailwind CSS v4 processing
- Includes necessary addons for themes, accessibility, and testing

### `preview.ts`
- Imports the main CSS file with Tailwind CSS v4
- Configures theme switching with next-themes
- Sets up global parameters for controls and accessibility

### `preview.css`
- Imports Tailwind CSS v4 and project styles
- Includes all necessary CSS layers and utilities
- Provides Storybook-specific styling

## Usage

1. Start Storybook:
   ```bash
   npm run storybook
   ```

2. View the "Tailwind CSS v4 Test" story to verify that:
   - All Tailwind classes are working
   - Theme switching works properly
   - Responsive design is functional
   - Interactive elements are styled correctly

## Testing Tailwind CSS v4

The `stories/TailwindTest.stories.tsx` file contains examples of:
- Background colors (primary, secondary, muted)
- Text colors (foreground, muted-foreground, primary)
- Spacing and layout utilities
- Responsive design classes
- Interactive elements (buttons, inputs)
- Dark mode compatibility

## Troubleshooting

If Tailwind classes aren't working:

1. Check that `@tailwindcss/postcss` is properly configured in `postcss.config.mjs`
2. Verify that the CSS imports in `preview.css` are correct
3. Ensure the Vite configuration in `main.ts` includes PostCSS setup
4. Restart Storybook after making configuration changes
