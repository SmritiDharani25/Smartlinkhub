import { TrendingUp, Users, MousePointerClick, Award, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from '../App';

type AnalyticsPageProps = {
  links: Link[];
  analytics: {
    totalVisitors: number;
    clicks: Record<string, number>;
  };
};

export function AnalyticsPage({ links, analytics }: AnalyticsPageProps) {
  // Calculate total clicks
  const totalClicks = Object.values(analytics.clicks).reduce((sum, count) => sum + count, 0);

  // Find top and least performing links
  const linkClicks = links.map(link => ({
    ...link,
    clicks: analytics.clicks[link.id] || 0,
  }));

  const sortedByClicks = [...linkClicks].sort((a, b) => b.clicks - a.clicks);
  const topLink = sortedByClicks[0];
  const leastLink = sortedByClicks[sortedByClicks.length - 1];

  // Prepare chart data
  const chartData = linkClicks.map(link => ({
    name: link.title.length > 15 ? link.title.substring(0, 15) + '...' : link.title,
    clicks: link.clicks,
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl text-white mb-2">Analytics</h1>
        <p className="text-[#a0a0a0]">Track your link performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Visitors */}
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-[#00ff00]/10 rounded-lg">
              <Users size={24} className="text-[#00ff00]" />
            </div>
            <h3 className="text-sm text-[#a0a0a0]">Total Visitors</h3>
          </div>
          <p className="text-3xl text-white">{analytics.totalVisitors.toLocaleString()}</p>
        </div>

        {/* Total Clicks */}
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-[#00ff00]/10 rounded-lg">
              <MousePointerClick size={24} className="text-[#00ff00]" />
            </div>
            <h3 className="text-sm text-[#a0a0a0]">Total Clicks</h3>
          </div>
          <p className="text-3xl text-white">{totalClicks.toLocaleString()}</p>
        </div>

        {/* Top Link */}
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-[#00ff00]/10 rounded-lg">
              <Award size={24} className="text-[#00ff00]" />
            </div>
            <h3 className="text-sm text-[#a0a0a0]">Top Link</h3>
          </div>
          <p className="text-lg text-white truncate">{topLink?.title || 'N/A'}</p>
          <p className="text-sm text-[#a0a0a0] mt-1">{topLink?.clicks || 0} clicks</p>
        </div>

        {/* Click Rate */}
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-[#00ff00]/10 rounded-lg">
              <TrendingUp size={24} className="text-[#00ff00]" />
            </div>
            <h3 className="text-sm text-[#a0a0a0]">Click Rate</h3>
          </div>
          <p className="text-3xl text-white">
            {analytics.totalVisitors > 0 
              ? ((totalClicks / analytics.totalVisitors) * 100).toFixed(1)
              : '0'}%
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6 mb-8">
        <h2 className="text-xl text-white mb-6">Clicks per Link</h2>
        <div className="w-full" style={{ height: '320px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
              <XAxis 
                dataKey="name" 
                stroke="#a0a0a0" 
                tick={{ fill: '#a0a0a0' }}
              />
              <YAxis 
                stroke="#a0a0a0" 
                tick={{ fill: '#a0a0a0' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0a0a0a', 
                  border: '1px solid #1a1a1a',
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
                cursor={{ fill: '#1a1a1a' }}
              />
              <Bar dataKey="clicks" fill="#00ff00" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Link Performance Table */}
      <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg overflow-hidden">
        <div className="p-6 border-b border-[#1a1a1a]">
          <h2 className="text-xl text-white">Link Performance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1a1a1a]">
                <th className="text-left p-4 text-sm text-[#a0a0a0]">Rank</th>
                <th className="text-left p-4 text-sm text-[#a0a0a0]">Link Title</th>
                <th className="text-left p-4 text-sm text-[#a0a0a0]">Clicks</th>
                <th className="text-left p-4 text-sm text-[#a0a0a0]">Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedByClicks.map((link, index) => (
                <tr key={link.id} className="border-b border-[#1a1a1a] last:border-b-0 hover:bg-[#0f0f0f] transition-colors">
                  <td className="p-4">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                      index === 0 ? 'bg-[#00ff00] text-black' : 'bg-[#1a1a1a] text-[#a0a0a0]'
                    }`}>
                      {index + 1}
                    </span>
                  </td>
                  <td className="p-4 text-white">{link.title}</td>
                  <td className="p-4 text-white">{link.clicks}</td>
                  <td className="p-4">
                    {index === 0 ? (
                      <span className="inline-flex items-center gap-1 text-[#00ff00] text-sm">
                        <TrendingUp size={16} />
                        Top
                      </span>
                    ) : index === sortedByClicks.length - 1 ? (
                      <span className="inline-flex items-center gap-1 text-[#a0a0a0] text-sm">
                        <TrendingDown size={16} />
                        Lowest
                      </span>
                    ) : (
                      <span className="text-[#a0a0a0] text-sm">Active</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6">
          <h3 className="text-white mb-2 flex items-center gap-2">
            <Award size={20} className="text-[#00ff00]" />
            Best Performer
          </h3>
          <p className="text-sm text-[#a0a0a0] mb-2">
            <span className="text-white">{topLink?.title}</span> is your most clicked link
          </p>
          <p className="text-2xl text-[#00ff00]">{topLink?.clicks} clicks</p>
        </div>

        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6">
          <h3 className="text-white mb-2 flex items-center gap-2">
            <TrendingDown size={20} className="text-[#a0a0a0]" />
            Needs Attention
          </h3>
          <p className="text-sm text-[#a0a0a0] mb-2">
            <span className="text-white">{leastLink?.title}</span> has the fewest clicks
          </p>
          <p className="text-2xl text-white">{leastLink?.clicks} clicks</p>
        </div>
      </div>
    </div>
  );
}
