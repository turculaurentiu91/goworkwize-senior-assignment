import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <div className="app">
            <nav className="nav">
                <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    Home
                </NavLink>
                <NavLink to="/assets" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    Assets
                </NavLink>
                <NavLink to="/employees" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    Employees
                </NavLink>
            </nav>
            <main className="main">
                <Outlet />
            </main>
        </div>
    );
}
