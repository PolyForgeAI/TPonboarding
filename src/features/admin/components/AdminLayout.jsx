import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, FileText, Settings, LogOut, Palette, Database } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/shared/lib/utils';

const SIDEBAR_ITEMS = [
    { icon: LayoutDashboard, label: 'Mission Control', href: '/AdminDashboard' },
    { icon: Users, label: 'Leads & Dossiers', href: '/AdminLeads' }, // Placeholder route
    { icon: Palette, label: 'Material Library', href: '/MaterialLibrary' },
    { icon: Database, label: 'Data Schema', href: '/DatabaseSchema' },
    { icon: Settings, label: 'Settings', href: '/AdminSettings' }, // Placeholder route
];

export default function AdminLayout({ children }) {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-background text-foreground flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 bg-card/50 backdrop-blur-xl flex flex-col fixed h-full z-50">
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center shadow-lg shadow-primary/20">
                            <span className="text-primary-foreground font-serif font-bold text-lg">T</span>
                        </div>
                        <h1 className="text-lg font-serif font-bold tracking-tight text-foreground">
                            Timeless <span className="text-primary">Admin</span>
                        </h1>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {SIDEBAR_ITEMS.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                                    isActive
                                        ? "bg-primary/10 text-primary border border-primary/20"
                                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                )}
                            >
                                <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
