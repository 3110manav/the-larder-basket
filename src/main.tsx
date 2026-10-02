import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { makeStore } from '@/app/store'
import { loadBasket } from '@/features/basket/persistence'
import App from './App'
import './index.css'

const savedBasket = loadBasket()
const store = makeStore({
  preloadedState: savedBasket && { basket: savedBasket },
  persist: true,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
