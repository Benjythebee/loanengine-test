import type { Preview } from "@storybook/nextjs-vite";
import "./preview.css";
import { withNextThemes } from "./decorators/with-next-themes";

const preview: Preview = {
  parameters: {
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
  ],
};

export default preview;
