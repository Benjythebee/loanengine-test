# PowerShell script to reorganize shadcn components into folder structure
# Usage: .\scripts\organize-component.ps1 <component-name>

param(
    [Parameter(Mandatory=$true)]
    [string]$ComponentName
)

$PrimitivesDir = ".\components\primitives"
$ComponentFile = "$PrimitivesDir\$ComponentName.tsx"

# Check if component file exists
if (-not (Test-Path $ComponentFile)) {
    Write-Error "Component file $ComponentFile not found"
    exit 1
}

# Create component directory
$ComponentDir = "$PrimitivesDir\$ComponentName"
New-Item -ItemType Directory -Force -Path $ComponentDir | Out-Null

# Move component file
Move-Item $ComponentFile "$ComponentDir\$ComponentName.tsx"

# Create index file
"export * from './$ComponentName';" | Out-File -FilePath "$ComponentDir\index.ts" -Encoding UTF8

# Capitalize component name for class/type names
$ComponentNameCapitalized = (Get-Culture).TextInfo.ToTitleCase($ComponentName.ToLower())

# Create basic story file
$StoryContent = @"
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { $ComponentNameCapitalized } from './$ComponentName';

const meta: Meta<typeof $ComponentNameCapitalized> = {
  title: 'Primitives/$ComponentNameCapitalized',
  component: $ComponentNameCapitalized,
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
"@

$StoryContent | Out-File -FilePath "$ComponentDir\$ComponentName.stories.tsx" -Encoding UTF8

Write-Host "✅ Successfully organized $ComponentName component" -ForegroundColor Green
Write-Host "📁 Files created:" -ForegroundColor Blue
Write-Host "   $ComponentDir\$ComponentName.tsx"
Write-Host "   $ComponentDir\index.ts"
Write-Host "   $ComponentDir\$ComponentName.stories.tsx"
Write-Host ""
Write-Host "🔧 Next steps:" -ForegroundColor Yellow
Write-Host "1. Update the story file with proper examples"
Write-Host "2. Test the component in Storybook"
Write-Host "3. Update any import statements in your app"