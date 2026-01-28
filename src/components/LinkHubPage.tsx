import { ExternalLink, User } from 'lucide-react';
import { Link } from '../App';

type LinkHubPageProps = {
  links: Link[];
};

export function LinkHubPage({ links }: LinkHubPageProps) {
  // Filter enabled links
  const enabledLinks = links.filter(link => link.enabled);

  // Simulate device detection (in real app, this would detect actual device)
  const currentDevice = 'desktop'; // Could be 'mobile', 'tablet', or 'desktop'

  // Filter links based on device rules
  const visibleLinks = enabledLinks.filter(link => {
    if (link.rules?.device && link.rules.device !== 'all') {
      return link.rules.device === currentDevice;
    }
    return true;
  });

  // Sort by priority if available
  const sortedLinks = [...visibleLinks].sort((a, b) => {
    const priorityA = a.rules?.priority || 999;
    const priorityB = b.rules?.priority || 999;
    return priorityA - priorityB;
  });

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-2xl mx-auto px-4 py-12 sm:px-6">
        {/* Profile Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-[#00ff00] rounded-full mb-6">
            <User size={48} className="text-black" />
          </div>
          <h1 className="text-3xl md:text-4xl text-white mb-3">Your Name</h1>
          <p className="text-[#a0a0a0] max-w-md mx-auto">
            Welcome to my link hub! Connect with me on all platforms.
          </p>
        </div>

        {/* Links Grid */}
        <div className="space-y-4">
          {sortedLinks.length === 0 ? (
            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-12 text-center">
              <p className="text-[#a0a0a0]">No links available at the moment.</p>
            </div>
          ) : (
            sortedLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-5 hover:border-[#00ff00] hover:bg-[#0f0f0f] transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-white text-lg group-hover:text-[#00ff00] transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-sm text-[#a0a0a0] mt-1 truncate">{link.url}</p>
                  </div>
                  <ExternalLink 
                    size={20} 
                    className="text-[#a0a0a0] group-hover:text-[#00ff00] transition-colors flex-shrink-0 ml-4" 
                  />
                </div>
              </a>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-[#1a1a1a]">
          <p className="text-sm text-[#666]">
            Powered by <span className="text-[#00ff00]">SmartLinks</span>
          </p>
        </div>
      </div>
    </div>
  );
}
