import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Link } from '../App';

type AddLinkModalProps = {
  link: Link | null;
  onSave: (link: Omit<Link, 'id'>) => void;
  onClose: () => void;
};

export function AddLinkModal({ link, onSave, onClose }: AddLinkModalProps) {
  const [title, setTitle] = useState(link?.title || '');
  const [url, setUrl] = useState(link?.url || '');
  const [enabled, setEnabled] = useState(link?.enabled ?? true);
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop' | 'all'>(
    link?.rules?.device || 'all'
  );
  const [useTimeRange, setUseTimeRange] = useState(!!link?.rules?.timeRange);
  const [startTime, setStartTime] = useState(link?.rules?.timeRange?.start || '09:00');
  const [endTime, setEndTime] = useState(link?.rules?.timeRange?.end || '18:00');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const linkData: Omit<Link, 'id'> = {
      title,
      url,
      enabled,
      rules: {
        device,
        ...(useTimeRange && {
          timeRange: {
            start: startTime,
            end: endTime,
          },
        }),
      },
    };

    onSave(linkData);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1a1a1a]">
          <h2 className="text-2xl text-white">
            {link ? 'Edit Link' : 'Add New Link'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-[#a0a0a0] hover:text-white hover:bg-[#1a1a1a] rounded transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm text-[#a0a0a0] mb-2">
              Link Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-black border border-[#1a1a1a] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#00ff00] transition-colors"
              placeholder="My Portfolio"
              required
            />
          </div>

          {/* URL */}
          <div>
            <label htmlFor="url" className="block text-sm text-[#a0a0a0] mb-2">
              URL *
            </label>
            <input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-3 bg-black border border-[#1a1a1a] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#00ff00] transition-colors"
              placeholder="https://example.com"
              required
            />
          </div>

          {/* Device Rule */}
          <div>
            <label htmlFor="device" className="block text-sm text-[#a0a0a0] mb-2">
              Show on Device
            </label>
            <select
              id="device"
              value={device}
              onChange={(e) => setDevice(e.target.value as any)}
              className="w-full px-4 py-3 bg-black border border-[#1a1a1a] rounded-lg text-white focus:outline-none focus:border-[#00ff00] transition-colors"
            >
              <option value="all">All Devices</option>
              <option value="mobile">Mobile Only</option>
              <option value="tablet">Tablet Only</option>
              <option value="desktop">Desktop Only</option>
            </select>
          </div>

          {/* Time Range Toggle */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={useTimeRange}
                onChange={(e) => setUseTimeRange(e.target.checked)}
                className="w-4 h-4 accent-[#00ff00]"
              />
              <span className="text-sm text-[#a0a0a0]">Set time range</span>
            </label>
          </div>

          {/* Time Range */}
          {useTimeRange && (
            <div className="grid grid-cols-2 gap-4 pl-6">
              <div>
                <label htmlFor="startTime" className="block text-sm text-[#a0a0a0] mb-2">
                  Start Time
                </label>
                <input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-4 py-3 bg-black border border-[#1a1a1a] rounded-lg text-white focus:outline-none focus:border-[#00ff00] transition-colors"
                />
              </div>
              <div>
                <label htmlFor="endTime" className="block text-sm text-[#a0a0a0] mb-2">
                  End Time
                </label>
                <input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-4 py-3 bg-black border border-[#1a1a1a] rounded-lg text-white focus:outline-none focus:border-[#00ff00] transition-colors"
                />
              </div>
            </div>
          )}

          {/* Enabled Toggle */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm text-[#a0a0a0]">Link enabled</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#1a1a1a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00ff00]"></div>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-[#1a1a1a] text-[#a0a0a0] rounded-lg hover:bg-[#1a1a1a] hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#00ff00] text-black rounded-lg hover:bg-[#00cc00] transition-colors"
            >
              {link ? 'Update' : 'Add Link'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
