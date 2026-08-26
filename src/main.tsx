import { createRoot } from 'react-dom/client'
import InnovixLanding from './InnovixLanding'
import CustomCursor from './premium/CustomCursor'
import './index.css'
import './premium/premium.css'

createRoot(document.getElementById('root')!).render(
  <div className="font-sans antialiased text-gray-100 bg-black min-h-screen relative">
    <InnovixLanding />
    <CustomCursor />
  </div>
)