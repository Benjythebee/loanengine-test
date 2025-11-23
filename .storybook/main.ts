import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: [
    // "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../app/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    "@storybook/addon-themes",
    // "@storybook/addon-queryparams"
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  features:{
    experimentalRSC: true
  },
  staticDirs: ["../public"],
  viteFinal: (viteConfig) => {
    // Ensure PostCSS is properly configured for Tailwind CSS v4
    if (viteConfig.css) {
      viteConfig.css.postcss = {
        plugins: [require("@tailwindcss/postcss")],
      };
    }

    return viteConfig;
  },
};

export default config;
