import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      sm: '480px',
      md: '600px',
      lg: '890px', // 976px
      xl: '1440px',
    },
    colors:{
      primary: {
        DEFAULT: 'var(--primary)',  // Footer background
        light: 'var(--primary-light)',    // Lighter variation #3c9ebff
        dark: 'var(--primary-dark)',     // Darker variation #1C4761
      },
      secondary: {
        DEFAULT: 'var(--secondary)',  // White text FFC300
        light: 'var(--secondary-light)',    // Lighter variation FFEA00
        dark: 'var(--secondary-dark)',     // Darker variation CC9C00
      },
      text: {
        DEFAULT: 'var(--text)',  // Main text color
        light: 'var(--text-light)',
        dark: 'var(--text-dark)', // Secondary text color
      },
      background: {
        DEFAULT: 'var(--background)',  // Default background
        alt: 'var(--background-alt)',  // Default background
        navbar: 'var(--background-navbar)',   
        navbarAlt: 'var(--background-navbar-alt)',    
        footer: 'var(--background-footer)',
      },
      success: 'var(--success)',  // Success color
      warning: 'var(--warning)',  // Warning color
      error: 'var(--error)',  // Error color
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
        // background: "var(--background)",
        // foreground: "var(--foreground)",
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

