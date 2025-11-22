#!/bin/bash

# Script to reorganize shadcn components into folder structure
# Usage: ./scripts/organize-component.sh <component-name>

COMPONENT_NAME="$1"
PRIMITIVES_DIR="./components/primitives"

if [ -z "$COMPONENT_NAME" ]; then
    echo "Usage: $0 <component-name>"
    echo "Example: $0 button"
    exit 1
fi

# Check if component file exists
COMPONENT_FILE="$PRIMITIVES_DIR/$COMPONENT_NAME.tsx"

if [ ! -f "$COMPONENT_FILE" ]; then
    echo "Error: Component file $COMPONENT_FILE not found"
    exit 1
fi

# Create component directory
COMPONENT_DIR="$PRIMITIVES_DIR/$COMPONENT_NAME"
mkdir -p "$COMPONENT_DIR"

# Move component file
mv "$COMPONENT_FILE" "$COMPONENT_DIR/$COMPONENT_NAME.tsx"

# Create index file
echo "export * from './$COMPONENT_NAME';" > "$COMPONENT_DIR/index.ts"

# Create basic story file
cat > "$COMPONENT_DIR/$COMPONENT_NAME.stories.tsx" << EOF
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ${COMPONENT_NAME^} } from './${COMPONENT_NAME}';

const meta: Meta<typeof ${COMPONENT_NAME^}> = {
  title: 'Primitives/${COMPONENT_NAME^}',
  component: ${COMPONENT_NAME^},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Add component-specific controls here
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Add default props here
  },
};
EOF

echo "✅ Successfully organized $COMPONENT_NAME component"
echo "📁 Files created:"
echo "   $COMPONENT_DIR/$COMPONENT_NAME.tsx"
echo "   $COMPONENT_DIR/index.ts"
echo "   $COMPONENT_DIR/$COMPONENT_NAME.stories.tsx"
echo ""
echo "🔧 Next steps:"
echo "1. Update the story file with proper examples"
echo "2. Test the component in Storybook"
echo "3. Update any import statements in your app"