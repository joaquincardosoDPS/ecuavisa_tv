import { createRoot } from 'react-dom/client'
import { init } from '@noriginmedia/norigin-spatial-navigation';
import './index.css'
import App from './App.tsx'

init({
  debug: false,
  visualDebug: false,
  throttle: 0,
});

createRoot(document.getElementById('root')!).render(
  <App />,
)
