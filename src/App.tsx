import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
    Navigate,
    useLocation,
} from "react-router-dom"
import { Faq } from "./components/faq"
import { Footer } from "./components/footer"
import { Header } from "./components/header"
import { Tracking } from "./components/tracking"

function Layout() {
    const location = useLocation()
    const hideFaqRoutes = ["/redirect-email"]
    const showFaq = !hideFaqRoutes.includes(location.pathname)

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className={`flex-grow ${showFaq ? "" : "pb-1"}`}>
                <Outlet />
            </main>
            {showFaq && <Faq />}
            <Footer />
        </div>
    )
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Tracking />} />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App
