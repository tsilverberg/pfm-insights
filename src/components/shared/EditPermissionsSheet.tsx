import React, { useState } from 'react';
import BottomSheet from './BottomSheet';
import ToggleRow from './ToggleRow';
import { permissionsData as initialPermissions } from '../../data/mockData';
import type { Permission } from '../../data/types';
import './EditPermissionsSheet.css';

interface EditPermissionsSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const members = [
  { name: 'You', role: 'Owner', avatar: null },
  { name: 'Holly Fan', role: 'Spouse / Partner', avatar: '/assets/icons/avatar-holly.jpg' },
];

const EditPermissionsSheet: React.FC<EditPermissionsSheetProps> = ({ isOpen, onClose }) => {
  const [permissions, setPermissions] = useState<Permission[]>(initialPermissions);

  const handleToggle = (id: string) => {
    setPermissions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
  };

  const handleSubOptionChange = (permId: string, optionLabel: string) => {
    setPermissions((prev) =>
      prev.map((p) =>
        p.id === permId && p.subOptions
          ? { ...p, subOptions: p.subOptions.map((o) => ({ ...o, selected: o.label === optionLabel })) }
          : p
      )
    );
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="edit-permissions__header">
        <div style={{ width: 24 }} />
        <div className="edit-permissions__title">Edit permissions</div>
        <button className="edit-permissions__search-btn" aria-label="Search">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="var(--pfm-text-secondary)" />
          </svg>
        </button>
      </div>

      <div className="edit-permissions__section-label">Members</div>
      {members.map((member) => (
        <div key={member.name} className="edit-permissions__member">
          {member.avatar ? (
            <img src={member.avatar} alt={member.name} className="edit-permissions__member-avatar" />
          ) : (
            <div className="edit-permissions__member-avatar--placeholder">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          )}
          <div>
            <div className="edit-permissions__member-name">{member.name}</div>
            <div className="edit-permissions__member-role">{member.role}</div>
          </div>
        </div>
      ))}

      <button className="edit-permissions__add-btn">+ Add member</button>

      <div className="edit-permissions__divider" />

      {permissions.map((perm) => (
        <ToggleRow
          key={perm.id}
          permission={perm}
          onToggle={handleToggle}
          onSubOptionChange={handleSubOptionChange}
        />
      ))}
    </BottomSheet>
  );
};

export default EditPermissionsSheet;
