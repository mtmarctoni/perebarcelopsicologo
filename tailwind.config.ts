import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '480px',
      lg: '890px', // 976px
      xl: '1440px',
    },
    colors:{
      primary: {
        DEFAULT: '#B9D8EB',  // Footer background
        light: '#3c9ebff',    // Lighter variation
        dark: '#1C4761',     // Darker variation
      },
      secondary: {
        DEFAULT: '#FFC300',  // White text
        light: '#FFEA00',    // Lighter variation
        dark: '#CC9C00',     // Darker variation
      },
      text: {
        DEFAULT: '#333333',  // Main text color
        light: '#666666',
        dark: '#000000', // Secondary text color
      },
      bg: {
        DEFAULT: '#F0F0F0',  // Default background
        navbar1: '#1E2761',   
        navbar2: '#375E97',    
        footer: '#122F41',
      },
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'white': '#ffffff',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
} satisfies Config;

