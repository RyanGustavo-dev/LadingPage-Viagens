import Header from './components/Header'
import Hero from './components/Hero'
import Highlights from './components/Highlights'
import About from './components/About'
import Services from './components/Services'
import Destinations from './components/Destinations'
import Reviews from './components/Reviews'
import Location from './components/Location'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Highlights />
        <About />
        <Services />
        <Destinations />
        <Reviews />
        <Location />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}

export default App
