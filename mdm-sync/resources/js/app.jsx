import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/query-client';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import Assets from '@/pages/Assets';
import Employees from '@/pages/Employees';
import '../css/app.css';

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="assets" element={<Assets />} />
                        <Route path="employees" element={<Employees />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            <Toaster />
        </QueryClientProvider>
    );
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
