import { useState } from 'react';
import { Plus } from 'lucide-react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { Link } from '../App';
import { LinkItem } from './LinkItem';
import { AddLinkModal } from './AddLinkModal';

type DashboardProps = {
  links: Link[];
  onAddLink: (link: Omit<Link, 'id'>) => void;
  onUpdateLink: (id: string, updates: Partial<Link>) => void;
  onDeleteLink: (id: string) => void;
  onReorderLinks: (links: Link[]) => void;
};

// Detect touch device
const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

export function Dashboard({ links, onAddLink, onUpdateLink, onDeleteLink, onReorderLinks }: DashboardProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);

  const moveLink = (dragIndex: number, hoverIndex: number) => {
    const newLinks = [...links];
    const draggedLink = newLinks[dragIndex];
    newLinks.splice(dragIndex, 1);
    newLinks.splice(hoverIndex, 0, draggedLink);
    onReorderLinks(newLinks);
  };

  const handleEdit = (link: Link) => {
    setEditingLink(link);
    setIsAddModalOpen(true);
  };

  const handleSaveLink = (linkData: Omit<Link, 'id'>) => {
    if (editingLink) {
      onUpdateLink(editingLink.id, linkData);
      setEditingLink(null);
    } else {
      onAddLink(linkData);
    }
    setIsAddModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingLink(null);
  };

  const backend = isTouchDevice() ? TouchBackend : HTML5Backend;

  return (
    <DndProvider backend={backend}>
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl text-white mb-2">Dashboard</h1>
          <p className="text-[#a0a0a0]">Manage your smart links and rules</p>
        </div>

        {/* Add Link Button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full sm:w-auto bg-[#00ff00] text-black px-6 py-3 rounded-lg hover:bg-[#00cc00] transition-colors flex items-center justify-center gap-2 mb-6"
        >
          <Plus size={20} />
          Add New Link
        </button>

        {/* Links List */}
        <div className="space-y-3">
          {links.length === 0 ? (
            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-12 text-center">
              <p className="text-[#a0a0a0] mb-4">No links yet. Add your first link to get started!</p>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-[#00ff00] text-black px-6 py-2 rounded-lg hover:bg-[#00cc00] transition-colors inline-flex items-center gap-2"
              >
                <Plus size={18} />
                Add Link
              </button>
            </div>
          ) : (
            links.map((link, index) => (
              <LinkItem
                key={link.id}
                link={link}
                index={index}
                moveLink={moveLink}
                onEdit={handleEdit}
                onDelete={onDeleteLink}
                onToggle={(id, enabled) => onUpdateLink(id, { enabled })}
              />
            ))
          )}
        </div>

        {/* Help Text */}
        <div className="mt-8 p-4 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg">
          <p className="text-sm text-[#a0a0a0]">
            💡 <span className="text-white">Tip:</span> Drag and drop links to reorder them. Set rules to control when and where each link appears.
          </p>
        </div>
      </div>

      {/* Add/Edit Link Modal */}
      {isAddModalOpen && (
        <AddLinkModal
          link={editingLink}
          onSave={handleSaveLink}
          onClose={handleCloseModal}
        />
      )}
    </DndProvider>
  );
}
