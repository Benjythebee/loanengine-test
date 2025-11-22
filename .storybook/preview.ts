import type { Preview } from "@storybook/nextjs-vite";
import { createNavigation } from '@storybook/nextjs/navigation.mock';
import { withNextThemes } from "./decorators/with-next-themes";
import { withQueryProvider } from "./decorators/with-query-provider";
import "./preview.css";

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
      router:createNavigation({})
    },
    backgrounds: {
      disable: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
  decorators: [
    withNextThemes({
      themes: {
        light: "light",
        dark: "dark",
        system: "system",
      },
      defaultTheme: "system",
      enableSystem: true,
      disableTransitionOnChange: true,
      attribute: "class",
    }),
    withQueryProvider
  ],
};

export default preview;
