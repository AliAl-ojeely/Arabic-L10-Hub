import { Routes, Route } from 'react-router-dom'

function App() {
    return (
        <main style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
            <Routes>
                <Route path="/" element={<h1>الصفحة الرئيسية - يتم بناؤها الآن...</h1>} />
                <Route path="/about" element={<h1>عني</h1>} />
                <Route path="/translations" element={<h1>التعريبات</h1>} />
                <Route path="/contact" element={<h1>تواصل معي</h1>} />
            </Routes>
        </main>
    )
}

export default App