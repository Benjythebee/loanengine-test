# Storybook for shadcn/ui Components

This guide will help you create and maintain Storybook stories for your shadcn/ui components.

## 📁 Story Structure

Stories are organized in the `/components/primitives/` directory alongside components:

```
components/
  primitives/
    button/
      button.tsx
      button.stories.tsx  ← Story file
    card/
      card.tsx
      card.stories.tsx    ← Story file
    ...
```

## 🎨 Story Template

Here's a basic template for creating new stories:

```tsx
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { YourComponent } from './your-component';

const meta: Meta<typeof YourComponent> = {
  title: 'Primitives/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'centered', // or 'fullscreen', 'padded'
  },
  tags: ['autodocs'],
  argTypes: {
    // Define controls for component props
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline'],
    },
    size: {
      control: 'select', 
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic story
export const Default: Story = {
  args: {
    children: 'Your Component',
  },
};

// Complex story with custom render
export const WithCustomRender: Story = {
  render: () => (
    <YourComponent>
      Custom content
    </YourComponent>
  ),
};
```

## 🛠 Best Practices

### 1. **Comprehensive Coverage**
- Cover all variants and sizes
- Include different states (disabled, loading, error)
- Show combinations with other components
- Demonstrate real-world usage

### 2. **Meaningful Story Names**
- Use descriptive names: `WithIcon`, `Loading`, `AllVariants`
- Group related stories: `Primary`, `Secondary`, `Destructive`

### 3. **Proper Controls**
- Add `argTypes` for interactive props
- Use appropriate control types (`select`, `boolean`, `text`, `number`)
- Make stories interactive for better testing

### 4. **Documentation**
- Use `tags: ['autodocs']` for automatic documentation
- Add descriptions to complex stories
- Include code examples in story descriptions

## 📝 Examples Created

### ✅ Button Stories
- All variants (default, destructive, outline, secondary, ghost, link)
- All sizes (sm, default, lg, icon variants)
- With icons and loading states
- Interactive controls for all props

### ✅ Card Stories  
- Basic card structure
- Cards with actions and badges
- Real-world examples (project card, stats card)
- Component composition examples

### ✅ Badge Stories
- All variants with status examples
- With icons and numbers
- Status badge patterns

### ✅ Input Stories
- All input types (text, email, password, etc.)
- With labels and icons
- Form examples and different states
- Password visibility toggle example

## 🎯 Next Steps

### Create Stories for Remaining Components:

1. **Avatar** (`avatar.tsx`)
```bash
# Create avatar.stories.tsx with:
# - Different sizes
# - With/without image
# - Fallback states
# - Group avatars
```

2. **Select** (`select.tsx`)
```bash
# Create select.stories.tsx with:
# - Single/multiple selection
# - With labels and descriptions
# - Disabled states
# - Custom trigger content
```

3. **Table** (`table.tsx`)
```bash
# Create table.stories.tsx with:
# - Basic data table
# - With sorting and pagination
# - Different row states
# - Responsive examples
```

4. **Alert** (`alert.tsx`)
```bash
# Create alert.stories.tsx with:
# - Different variants (info, warning, error, success)
# - With/without icons
# - Dismissible alerts
```

## 🚀 Running Storybook

```bash
# Start Storybook development server
pnpm run storybook

# Build Storybook for production
pnpm run build-storybook
```

## 🎨 Theming

Your Storybook is already configured with:
- ✅ Next.js themes support (light/dark/system)
- ✅ Tailwind CSS v4 support
- ✅ Your custom theme provider
- ✅ Automatic theme switching in stories

## 📚 Advanced Features

### Custom Decorators
Located in `.storybook/decorators/`, you can create custom decorators for:
- Layout wrappers
- Data providers
- Authentication contexts
- Form providers

### Global Parameters
Configure in `.storybook/preview.ts`:
- Default themes
- Layout options
- Control defaults
- Accessibility testing

### Addon Integration
Currently enabled addons:
- `@storybook/addon-docs` - Automatic documentation
- `@storybook/addon-themes` - Theme switching
- `@storybook/addon-a11y` - Accessibility testing
- `@storybook/addon-vitest` - Component testing

## 🧪 Testing with Storybook

Each story can be used as a test case. With the Vitest addon, you can:
- Test component behavior
- Visual regression testing  
- Accessibility testing
- Interaction testing

Example test setup in `.storybook/vitest.setup.ts` is already configured.

## 💡 Tips

1. **Use Real Data**: Import mock data from your `mock/` directory
2. **Component Composition**: Show how components work together
3. **Responsive Design**: Test components at different screen sizes
4. **Accessibility**: Use the a11y addon to catch accessibility issues
5. **Performance**: Monitor story render times for complex components

## 📖 Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Next.js Storybook Integration](https://storybook.js.org/docs/nextjs)
- [Tailwind CSS in Storybook](https://storybook.js.org/docs/styling-and-css/tailwind-css)