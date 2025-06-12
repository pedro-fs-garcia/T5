import { BrowserRouter } from 'react-router-dom'
import Header from './components/header'
import Footer from './components/footer'
import AppRoutes from './routes/appRoutes'

export default function App() {
    return (
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100 bg-light">
          <Header/>
          <main className="flex-grow-1 container py-4">
            <AppRoutes/>
          </main>
          <Footer/>
        </div>
      </BrowserRouter>
    )
}

