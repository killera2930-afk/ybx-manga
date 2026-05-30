"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, PlusSquare, Users, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "All Manga", href: "/admin/manga", icon: BookOpen },
    { label: "Add Manga", href: "/admin/manga/new", icon: PlusSquare },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 fixed top-0 left-0 bottom-0 bg-card border-r border-border py-4 overflow-y-auto z-50">
        <div className="px-4 pb-6 border-b border-border mb-4">
          <Link href="/admin" className="font-display font-black text-xl text-gradient flex items-center gap-2">
            <span className="text-primary">⚡</span> YBX Admin
          </Link>
        </div>
        
        <div className="px-4 flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary flex items-center justify-center font-bold text-primary">A</div>
          <div>
            <div className="font-semibold text-sm">Admin User</div>
            <div className="text-xs text-muted-foreground">Superadmin</div>
          </div>
        </div>

        <nav className="space-y-1 px-2">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-3 mb-2">Menu</div>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        
        <div className="absolute bottom-4 left-0 w-full px-4">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut size={18} />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
