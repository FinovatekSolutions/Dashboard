// In your font.js or similar file
import { Inter, BioRhyme } from 'next/font/google';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const bioRhyme = BioRhyme({
  subsets: ['latin'],
  display: 'swap',
});

// Export the font for use in your components
export { inter, bioRhyme };
