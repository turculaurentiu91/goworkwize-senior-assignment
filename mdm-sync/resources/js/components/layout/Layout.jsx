import { NavLink, Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function Layout() {
    return (
        <div className="min-h-screen bg-background">
            <nav className="bg-secondary px-8 py-4 flex gap-8 justify-center">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        cn(
                            'text-secondary-foreground font-medium px-4 py-2 rounded transition-colors',
                            isActive
                                ? 'bg-primary text-primary-foreground'
                                : 'hover:bg-secondary-foreground/10'
                        )
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/assets"
                    className={({ isActive }) =>
                        cn(
                            'text-secondary-foreground font-medium px-4 py-2 rounded transition-colors',
                            isActive
                                ? 'bg-primary text-primary-foreground'
                                : 'hover:bg-secondary-foreground/10'
                        )
                    }
                >
                    Assets
                </NavLink>
                <NavLink
                    to="/employees"
                    className={({ isActive }) =>
                        cn(
                            'text-secondary-foreground font-medium px-4 py-2 rounded transition-colors',
                            isActive
                                ? 'bg-primary text-primary-foreground'
                                : 'hover:bg-secondary-foreground/10'
                        )
                    }
                >
                    Employees
                </NavLink>
            </nav>
            <main className="p-8 max-w-6xl mx-auto">
                <Outlet />
            </main>
        </div>
    );
}
