import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { LinkHubPage } from './components/LinkHubPage';
import { AnalyticsPage } from './components/AnalyticsPage';

export type Link = {
  id: string;
  title: string;
  url: string;
  enabled: boolean;
  rules?: {
    timeRange?: { start: string; end: string };
    device?: 'mobile' | 'tablet' | 'desktop' | 'all';
    priority?: number;
  };
};

export type AppView = 'login' | 'dashboard' | 'linkhub' | 'analytics';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [links, setLinks] = useState<Link[]>([
    {
      id: '1',
      title: 'Portfolio Website',
      url: 'https://example.com/portfolio',
      enabled: true,
      rules: { device: 'all', priority: 1 }
    },
    {
      id: '2',
      title: 'Instagram Profile',
      url: 'https://instagram.com/user',
      enabled: true,
      rules: { device: 'mobile', priority: 2 }
    },
    {
      id: '3',
      title: 'LinkedIn',
      url: 'https://linkedin.com/in/user',
      enabled: true,
      rules: { device: 'desktop', priority: 3 }
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalVisitors: 1247,
    clicks: {
      '1': 543,
      '2': 389,
      '3': 215
    }
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('login');
  };

  const addLink = (link: Omit<Link, 'id'>) => {
    const newLink = {
      ...link,
      id: Date.now().toString()
    };
    setLinks([...links, newLink]);
  };

  const updateLink = (id: string, updates: Partial<Link>) => {
    setLinks(links.map(link => link.id === id ? { ...link, ...updates } : link));
  };

  const deleteLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const reorderLinks = (newLinks: Link[]) => {
    setLinks(newLinks);
  };

  if (currentView === 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      {isAuthenticated && (
        <nav className="border-b border-[#1a1a1a] bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex gap-6">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`px-3 py-2 transition-colors ${
                    currentView === 'dashboard'
                      ? 'text-[#00ff00] border-b-2 border-[#00ff00]'
                      : 'text-[#a0a0a0] hover:text-white'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setCurrentView('linkhub')}
                  className={`px-3 py-2 transition-colors ${
                    currentView === 'linkhub'
                      ? 'text-[#00ff00] border-b-2 border-[#00ff00]'
                      : 'text-[#a0a0a0] hover:text-white'
                  }`}
                >
                  Link Hub
                </button>
                <button
                  onClick={() => setCurrentView('analytics')}
                  className={`px-3 py-2 transition-colors ${
                    currentView === 'analytics'
                      ? 'text-[#00ff00] border-b-2 border-[#00ff00]'
                      : 'text-[#a0a0a0] hover:text-white'
                  }`}
                >
                  Analytics
                </button>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-[#a0a0a0] hover:text-white transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* Content */}
      <main>
        {currentView === 'dashboard' && (
          <Dashboard
            links={links}
            onAddLink={addLink}
            onUpdateLink={updateLink}
            onDeleteLink={deleteLink}
            onReorderLinks={reorderLinks}
          />
        )}
        {currentView === 'linkhub' && <LinkHubPage links={links} />}
        {currentView === 'analytics' && <AnalyticsPage links={links} analytics={analytics} />}
      </main>
    </div>
  );
}
