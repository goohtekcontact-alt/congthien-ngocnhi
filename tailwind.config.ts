import type { Config } from "tailwindcss";

// Generate custom spacing scale for Tailwind to support arbitrary numeric values (0.25 to 500)
const spacing: Record<string, string> = {};
for (let i = 0; i <= 500; i += 0.25) {
  spacing[i.toString()] = `${i * 0.25}rem`;
}

const lineHeight: Record<string, string> = {};
for (let i = 0; i <= 200; i += 0.25) {
  lineHeight[i.toString()] = `${i * 0.25}rem`;
}

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B2635',
        primaryDark: '#6B1D28',
        primaryLight: '#A63D4D',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      spacing: {
        ...spacing,
      },
      lineHeight: {
        ...lineHeight,
      },
      borderWidth: {
        5: '5px',
      },
    },
  },
  plugins: [],
};
export default config;
