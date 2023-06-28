import { theme as proTheme } from "@chakra-ui/pro-theme";
import { extendTheme } from "@chakra-ui/react";
import "@fontsource/inter";

export const theme = extendTheme(
    {
        colors: {
            brand: {
                300: "#c3dd98",
                500: "#78ab4a",
                600: "#172c44",
            },
        },
        fonts: {
            heading:
                "'Fira CodeVariable', -apple-system, system-ui, sans-serif",
            body: "'Fira CodeVariable', -apple-system, system-ui, sans-serif",
        },
    },
    // {
    //     styles: {
    //         global: {
    //             body: {
    //                 color: "#172c44",
    //             },
    //             a: {
    //                 _hover: {
    //                     textDecoration: "underline",
    //                 },
    //             },
    //         },
    //     },
    // },
    proTheme
);
