import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { GripVertical, Edit, Trash2, Clock, Smartphone, Monitor, Tablet } from 'lucide-react';
import { Link } from '../App';

type LinkItemProps = {
  link: Link;
  index: number;
  moveLink: (dragIndex: number, hoverIndex: number) => void;
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string, enabled: boolean) => void;
};

const ITEM_TYPE = 'LINK';

export function LinkItem({ link, index, moveLink, onEdit, onDelete, onToggle }: LinkItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ITEM_TYPE,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: { index: number }, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveLink(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: ITEM_TYPE,
    item: () => {
      return { id: link.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const getDeviceIcon = (device?: string) => {
    switch (device) {
      case 'mobile':
        return <Smartphone size={16} className="text-[#00ff00]" />;
      case 'tablet':
        return <Tablet size={16} className="text-[#00ff00]" />;
      case 'desktop':
        return <Monitor size={16} className="text-[#00ff00]" />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={preview}
      data-handler-id={handlerId}
      className={`bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-4 transition-all ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } ${!link.enabled ? 'opacity-60' : ''}`}
    >
      <div className="flex items-center gap-3">
        {/* Drag Handle */}
        <div ref={ref} className="cursor-move touch-none">
          <GripVertical size={20} className="text-[#a0a0a0] hover:text-[#00ff00] transition-colors" />
        </div>

        {/* Link Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-white truncate mb-1">{link.title}</h3>
          <p className="text-sm text-[#a0a0a0] truncate">{link.url}</p>
          
          {/* Rules Display */}
          {link.rules && (
            <div className="flex flex-wrap gap-2 mt-2">
              {link.rules.timeRange && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-black border border-[#1a1a1a] rounded text-xs text-[#a0a0a0]">
                  <Clock size={14} />
                  {link.rules.timeRange.start} - {link.rules.timeRange.end}
                </span>
              )}
              {link.rules.device && link.rules.device !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-black border border-[#1a1a1a] rounded text-xs text-[#a0a0a0]">
                  {getDeviceIcon(link.rules.device)}
                  {link.rules.device}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Toggle Switch */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={link.enabled}
            onChange={(e) => onToggle(link.id, e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-[#1a1a1a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00ff00]"></div>
        </label>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(link)}
            className="p-2 text-[#a0a0a0] hover:text-[#00ff00] hover:bg-[#1a1a1a] rounded transition-colors"
            aria-label="Edit link"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDelete(link.id)}
            className="p-2 text-[#a0a0a0] hover:text-red-500 hover:bg-[#1a1a1a] rounded transition-colors"
            aria-label="Delete link"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
