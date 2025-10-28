// Project: preply-landing-react-vite-tailwind
// Tech: React (Vite) + TailwindCSS
// File structure (all files included below)
// README.md
// package.json
// index.html
// vite.config.js
// tailwind.config.cjs
// postcss.config.cjs
// src/main.jsx
// src/App.jsx
// src/styles/index.css
// src/components/Header.jsx
// src/components/Hero.jsx
// src/components/TutorsGrid.jsx
// src/components/HowItWorks.jsx
// src/components/CTA.jsx
// src/components/Footer.jsx
// public/screenshot.png  <-- Put your uploaded screenshot here or reference the image path you provided: /mnt/data/preply.com__campaignid=590172518&network=o&adgroupid=1145692800240040&keyword=preply&matchtype=e&creative=&targetid=kwd-71606484355703_loc-90&placement=&loc_physical_ms=116073&device=c&msclkid=8b2972cf62be1dec0f9e1.png


--- README.md ---
# Preply-like Landing (React + Vite + Tailwind)

This is a small React project to mimic the provided landing page screenshot.

Requirements: Node 18+ (or any supported Node for Vite)

Install & Run:

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

Notes:
- Put the screenshot image into `public/screenshot.png` (or update the path in the Hero component if you want to use the exact uploaded asset path).
- Fonts: we load Inter/Roboto in index.html; change if you want exact font.


--- package.json ---
{
  "name": "preply-landing",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.24",
    "tailwindcss": "^3.4.12",
    "vite": "^5.0.0"
  }
}

--- index.html ---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Preply - clone</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap" rel="stylesheet">
  </head>
  <body class="antialiased bg-white text-slate-900">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

--- vite.config.js ---
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})

--- tailwind.config.cjs ---
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        preplyPink: '#ff79a8',
        preplyLightPink: '#ffd7e3',
        preplyGreen: '#2dd4bf'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: [],
}

--- postcss.config.cjs ---
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}

--- src/main.jsx ---
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

--- src/styles/index.css ---
@tailwind base;
@tailwind components;
@tailwind utilities;

/* small custom tweaks to mimic the screenshot */
:root{
  --hero-height: 520px;
}

.hero-image {
  background-position: center;
  background-size: cover;
}

/* large display text responsive sizes */
.h1-display { font-size: clamp(36px, 7vw, 64px); line-height: 1.02; }
.h2-display { font-size: clamp(22px, 2.8vw, 32px); }


--- src/App.jsx ---
import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import TutorsGrid from './components/TutorsGrid'
import HowItWorks from './components/HowItWorks'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <div className="max-w-6xl mx-auto px-6">
          <TutorsGrid />
          <section className="mt-12">
            <h2 className="h2-display font-extrabold tracking-tight text-3xl md:text-4xl text-center">Find the right tutor for you.</h2>
            <p className="text-center text-slate-600 mt-3">With over 100,000 tutors and 1M+ lessons — the knowledge is here to help you learn.</p>
          </section>
          <HowItWorks />
          <CTA />
        </div>
      </main>
      <Footer />
    </div>
  )
}

--- src/components/Header.jsx ---
import React from 'react'

export default function Header(){
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">P</div>
          <span className="font-semibold">Preply</span>
        </div>
        <nav className="flex items-center gap-4 text-sm text-slate-700">
          <a className="hover:underline" href="#">Find a tutor</a>
          <a className="hover:underline" href="#">Become a tutor</a>
          <button className="px-3 py-1 border rounded-md">Log in</button>
        </nav>
      </div>
    </header>
  )
}

--- src/components/Hero.jsx ---
import React from 'react'

export default function Hero(){
  // Use public/screenshot.png or your uploaded asset
  const heroImage = '/screenshot.png' // change if needed

  return (
    <section className="bg-preplyPink text-white">
      <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="h1-display font-extrabold">Learn faster with your best language tutor.</h1>
          <p className="mt-6 text-lg text-white/90">Live lessons, personalised tutors, and flexible scheduling to fit your life.</p>
          <div className="mt-6">
            <a href="#" className="inline-block bg-black text-white px-5 py-3 rounded-md font-semibold">Find your tutor →</a>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 text-black bg-white/90 text-center rounded-md p-4 max-w-md shadow-sm">
            <div>
              <div className="text-sm font-semibold">100,000+</div>
              <div className="text-xs">Experienced tutors</div>
            </div>
            <div>
              <div className="text-sm font-semibold">300,000+</div>
              <div className="text-xs">5 star tutor reviews</div>
            </div>
            <div>
              <div className="text-sm font-semibold">4.8 ★★★★★</div>
              <div className="text-xs">on the App Store</div>
            </div>
          </div>

        </div>

        <div className="relative">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <img src={heroImage} alt="hero screenshot" className="w-full h-80 object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

--- src/components/TutorsGrid.jsx ---
import React from 'react'

const tutors = [
  'English tutors', 'Spanish tutors', 'French tutors', 'German tutors',
  'Italian tutors', 'Chinese tutors', 'Arabic tutors', 'Japanese tutors', 'Portuguese tutors'
]

export default function TutorsGrid(){
  return (
    <section className="mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {tutors.map((t,i)=> (
          <div key={i} className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
            <div>
              <div className="font-semibold">{t}</div>
              <div className="text-sm text-slate-500">{(i+1)*1000}+ tutors</div>
            </div>
            <div className="text-slate-400">›</div>
          </div>
        ))}
      </div>
    </section>
  )
}

--- src/components/HowItWorks.jsx ---
import React from 'react'

export default function HowItWorks(){
  return (
    <section className="mt-12 bg-white rounded-lg p-6 shadow-sm">
      <h3 className="font-bold text-xl">How Preply works:</h3>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 border rounded-lg">
          <div className="text-2xl font-extrabold">1</div>
          <div className="mt-2 font-semibold">Find your tutor.</div>
          <p className="mt-1 text-sm text-slate-600">Search tutors by language, price, availability and experience.</p>
        </div>
        <div className="p-4 border rounded-lg">
          <div className="text-2xl font-extrabold">2</div>
          <div className="mt-2 font-semibold">Start learning.</div>
          <p className="mt-1 text-sm text-slate-600">Book lessons that fit your schedule and learning goals.</p>
        </div>
        <div className="p-4 border rounded-lg">
          <div className="text-2xl font-extrabold">3</div>
          <div className="mt-2 font-semibold">Speak & Write.</div>
          <p className="mt-1 text-sm text-slate-600">Improve speaking, writing and confidence with live practice.</p>
        </div>
      </div>
    </section>
  )
}

--- src/components/CTA.jsx ---
import React from 'react'

export default function CTA(){
  return (
    <section className="mt-12 bg-pink-100 rounded-lg p-8 flex items-center gap-8">
      <div className="flex-1">
        <h3 className="font-extrabold text-3xl">Lessons you'll love. Guaranteed.</h3>
        <p className="mt-2 text-slate-700">Try your first tutor — or get your money back if you are not satisfied.</p>
      </div>
      <div>
        <a className="inline-block bg-preplyPink text-white px-6 py-3 rounded-md font-semibold" href="#">Find a tutor</a>
      </div>
    </section>
  )
}

--- src/components/Footer.jsx ---
import React from 'react'

export default function Footer(){
  return (
    <footer className="bg-slate-900 text-white mt-12">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-5 gap-6">
        <div>
          <h4 className="font-bold">About</h4>
          <ul className="mt-3 text-sm text-slate-300 space-y-2">
            <li>About us</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold">For students</h4>
          <ul className="mt-3 text-sm text-slate-300 space-y-2">
            <li>Find tutors</li>
            <li>Pricing</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold">For tutors</h4>
          <ul className="mt-3 text-sm text-slate-300 space-y-2">
            <li>Become a tutor</li>
            <li>Start teaching</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold">For companies</h4>
          <ul className="mt-3 text-sm text-slate-300 space-y-2">
            <li>Corporate training</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold">Support</h4>
          <ul className="mt-3 text-sm text-slate-300 space-y-2">
            <li>Help center</li>
            <li>Terms</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-6">
        <div className="max-w-6xl mx-auto px-6 text-sm text-slate-400">© {new Date().getFullYear()} Preply clone — built with React + Tailwind</div>
      </div>
    </footer>
  )
}


--- End of files ---

// If you want exact pixel match, I can add custom CSS and more components (carousel, exact spacing, fonts) — tell me which parts need extra fidelity (header spacing, font family, testimonial carousel, or footer columns).
