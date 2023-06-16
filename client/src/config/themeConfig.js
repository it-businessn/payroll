import { theme as proTheme } from "@chakra-ui/pro-theme";
import { theme as baseTheme, extendTheme } from "@chakra-ui/react";
import "@fontsource/inter";

export const theme = extendTheme(
    {
        colors: { ...baseTheme.colors, brand: baseTheme.colors.purple },
        fonts: {
            heading:
                "'Fira CodeVariable', -apple-system, system-ui, sans-serif",
            body: "'Fira CodeVariable', -apple-system, system-ui, sans-serif",
        },
    },
    proTheme
);
