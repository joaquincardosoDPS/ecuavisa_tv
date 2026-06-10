import { createRoot } from 'react-dom/client'
import { init } from '@noriginmedia/norigin-spatial-navigation';
import cssVars from 'css-vars-ponyfill';
import './index.css'
import App from './App.tsx'
import { prefetchMainViews } from '@/router/config';

// Polyfill para CSS Custom Properties (Chrome <49 / webOS 3.x)
cssVars({
  watch: true,       // re-aplica cuando cambian las variables vía JS
  silent: true,
});

init({
  debug: false,
  visualDebug: false,
  throttle: 100,     // 100ms entre movimientos — evita cascada de re-renders en TVs lentas
});

createRoot(document.getElementById('root')!).render(
  <App />,
)

// Precargar chunks de vistas principales en background
prefetchMainViews();
