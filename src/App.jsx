import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Translations from './pages/Translations/Translations'
import GameDetails from './pages/GameDetails/GameDetails'

function App() {
    return (
        <>
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<h1 style={{ padding: '2rem', textAlign: 'center' }}>صفحة عني (قيد الإنشاء)</h1>} />

                    <Route path="/translations" element={<Translations />} />
                    <Route path="/translations/:folderName" element={<GameDetails />} />

                    <Route path="/contact" element={<h1 style={{ padding: '2rem', textAlign: 'center' }}>صفحة تواصل معي (قيد الإنشاء)</h1>} />
                </Routes>
            </main>
        </>
    )
}

export default App