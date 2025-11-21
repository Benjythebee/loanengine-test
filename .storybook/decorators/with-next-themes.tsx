import { DecoratorHelpers } from "@storybook/addon-themes";
import type { ReactRenderer } from "@storybook/nextjs-vite";
import { ThemeProvider, type ThemeProviderProps, useTheme } from "next-themes";
import React from "react";
import type { DecoratorFunction } from "storybook/internal/types";

type ThemeSwitcherProps = {
  theme: string;
};

const ThemeSwitcher = (props: React.PropsWithChildren<ThemeSwitcherProps>) => {
  const { theme, children } = props;

  const { setTheme } = useTheme();

  // biome-ignore lint/correctness/useExhaustiveDependencies: that's how it works
  React.useEffect(() => setTheme(theme), [theme]);

  return children;
};

type NextThemesDecorator = Omit<
  ThemeProviderProps,
  "defaultTheme" | "themes"
> & {
  themes: Record<string, string>;
  defaultTheme: string;
};

const { initializeThemeState, pluckThemeFromContext } = DecoratorHelpers;

export const withNextThemes = (
  props: NextThemesDecorator
): DecoratorFunction<ReactRenderer> => {
  const { themes, defaultTheme, ...rest } = props;

  initializeThemeState(Object.keys(themes), defaultTheme);

  return (Story, context) => {
    const selectedTheme = pluckThemeFromContext(context);

    const { themeOverride } = context.parameters.themes ?? {};

    const selected = themeOverride ?? selectedTheme ?? defaultTheme;

    return (
      <ThemeProvider defaultTheme={defaultTheme} {...rest}>
        <ThemeSwitcher theme={selected}>
          <Story />
        </ThemeSwitcher>
      </ThemeProvider>
    );
  };
};
