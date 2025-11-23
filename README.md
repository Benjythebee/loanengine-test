# Loan Engine Test

A demo ui for a ui test.

See [Getting Started](https://github.com/Benjythebee/loanengine-test?tab=readme-ov-file#getting-started)

Dev server will start on port 3000.

Example page for this test can be found at [/loan-accounts/[id]](http://localhost:3000/loan-accounts/019ab239-9b7a-76de-ba9c-7e1085438642)

Known issues can be found [here](https://github.com/Benjythebee/loanengine-test/issues)


##  Features

- **Loan Account Management** - View and manage loan accounts with detailed information
- **Real-time Updates** - WebSocket integration for live data updates
- **Modern UI Components** - Built with shadcn/ui and Radix UI primitives
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Component Documentation** - Comprehensive Storybook integration
- **Type Safety** - Full TypeScript support
- **Testing Ready** - Vitest configuration for component testing

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) with App Router and Turbopack
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Development**: [Storybook](https://storybook.js.org/) + [Vitest](https://vitest.dev/)

## Project Structure

```
├── app/                      # Next.js App Router
│   ├── (home)/              # Dashboard home page
│   ├── loan-accounts/       # Loan management pages
│   │   └── [id]/           # Individual loan account pages
│   └── layout.tsx          # Root layout
├── components/             # Reusable components
│   ├── primitives/         # shadcn/ui components with Storybook
│   ├── ui/                 # Business logic components
│   ├── layout/             # Layout components (header, sidebar)
│   └── theme/              # Theme switching components
├── context/                # React context providers
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
├── mock/                   # Mock data and WebSocket
├── styles/                 # Global styles
└── types.ts               # Global type definitions
```

##  Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Benjythebee/loanengine-test.git
   cd loanengine-test
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

##  Available Scripts

### Development
```bash
pnpm dev          # Start Next.js development server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server on port 8080
```

### Component Development
```bash
pnpm storybook         # Start Storybook development server
pnpm test    # Run Storybook tests with Vitest
```

##  Configuration

### Theme Configuration
The project uses a custom theme system with support for:
- Light/dark/system themes
- CSS custom properties for colors
- Tailwind CSS v4 configuration

### TypeScript
Strict TypeScript configuration with:
- Path mapping (`@/` for root imports)
- React 19 support
- Next.js type definitions

### Development Environment
- **Hot Reload** - Fast refresh with Turbopack
- **Code Splitting** - Automatic code splitting by Next.js
- **Image Optimization** - Next.js Image component with remote patterns

## Testing

The project is configured for comprehensive testing:

- **Component Testing** - Vitest with browser testing capabilities
- **Storybook Testing** - Visual regression and interaction testing
- **Accessibility Testing** - Built-in a11y addon for Storybook

## 📝 Development Guidelines

### Adding New Components
1. Create component in appropriate directory (`components/primitives/` or `components/ui/`)
2. Add TypeScript interfaces for props
3. Create Storybook stories for documentation
4. Export from index file if applicable

### Code Style
- Use TypeScript for all new files
- Follow existing naming conventions
- Utilize Tailwind CSS for styling
- Implement responsive design patterns

### Component Organization
- **Primitives**: Basic, reusable UI components
- **UI**: Business-specific components
- **Layout**: Page structure components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add/update tests and stories
5. Submit a pull request

## 📄 License

This project is private and proprietary.

---

For more detailed component documentation, visit the Storybook at `http://localhost:6006` when running the development server.