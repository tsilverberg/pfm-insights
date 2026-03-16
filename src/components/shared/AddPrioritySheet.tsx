import React, { useState, useEffect, useMemo } from 'react';
import { IonModal } from '@ionic/react';
import type { Pocket } from '../../data/types';
import { formatEuroShort } from '../../data/formatters';
import './AddPrioritySheet.css';

interface AddPrioritySheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (priority: Pocket) => void;
  onDelete?: () => void;
  editingPriority?: Pocket | null;
}

const PRESETS: {
  name: string;
  icon: string;
  materialIcon: string;
  iconBg: string;
  progressColor: string;
  category: 'essential' | 'milestone' | 'lifestyle';
  defaultTarget: number;
  defaultDate: string;
}[] = [
  {
    name: 'Buy a house',
    icon: 'home',
    materialIcon: 'home',
    iconBg: 'var(--pfm-palette-blue-extra-soft)',
    progressColor: 'var(--pfm-action-primary-bg)',
    category: 'milestone',
    defaultTarget: 50000,
    defaultDate: 'Dec 2029',
  },
  {
    name: 'Buy a car',
    icon: 'car',
    materialIcon: 'directions_car',
    iconBg: 'var(--pfm-palette-red-extra-soft)',
    progressColor: 'var(--pfm-palette-red-strong)',
    category: 'milestone',
    defaultTarget: 25000,
    defaultDate: 'Jun 2027',
  },
  {
    name: 'Family holiday',
    icon: 'travel',
    materialIcon: 'flight_takeoff',
    iconBg: 'var(--pfm-palette-purple-extra-soft)',
    progressColor: 'var(--pfm-palette-purple-strong)',
    category: 'lifestyle',
    defaultTarget: 5000,
    defaultDate: 'Aug 2027',
  },
  {
    name: 'Emergency fund',
    icon: 'savings',
    materialIcon: 'savings',
    iconBg: 'var(--pfm-palette-green-extra-soft)',
    progressColor: 'var(--pfm-status-success)',
    category: 'essential',
    defaultTarget: 10000,
    defaultDate: 'Dec 2027',
  },
  {
    name: 'Retirement',
    icon: 'retirement',
    materialIcon: 'elderly',
    iconBg: 'var(--pfm-palette-green-extra-soft)',
    progressColor: 'var(--pfm-green-strong)',
    category: 'milestone',
    defaultTarget: 100000,
    defaultDate: 'Dec 2045',
  },
  {
    name: 'Education',
    icon: 'education',
    materialIcon: 'school',
    iconBg: 'var(--pfm-palette-blue-extra-soft)',
    progressColor: 'var(--pfm-palette-blue-strong)',
    category: 'milestone',
    defaultTarget: 20000,
    defaultDate: 'Sep 2030',
  },
];

const CATEGORIES: { id: 'essential' | 'milestone' | 'lifestyle'; label: string }[] = [
  { id: 'essential', label: 'Essential' },
  { id: 'milestone', label: 'Milestone' },
  { id: 'lifestyle', label: 'Lifestyle' },
];

function monthsUntil(dateStr: string): number {
  const parts = dateStr.split(' ');
  if (parts.length !== 2) return 12;
  const monthNames: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };
  const month = monthNames[parts[0]] ?? 0;
  const year = parseInt(parts[1], 10);
  if (isNaN(year)) return 12;
  const target = new Date(year, month, 1);
  const now = new Date();
  const diff = (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth());
  return Math.max(diff, 1);
}

const AddPrioritySheet: React.FC<AddPrioritySheetProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  editingPriority,
}) => {
  const isEditing = !!editingPriority;

  const [name, setName] = useState('');
  const [icon, setIcon] = useState('savings');
  const [iconBg, setIconBg] = useState('var(--pfm-palette-green-extra-soft)');
  const [progressColor, setProgressColor] = useState('var(--pfm-status-success)');
  const [targetAmount, setTargetAmount] = useState<number>(10000);
  const [currentAmount, setCurrentAmount] = useState<number>(0);
  const [targetDate, setTargetDate] = useState('Dec 2027');
  const [category, setCategory] = useState<'essential' | 'milestone' | 'lifestyle'>('milestone');
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

  // Reset form when opening
  useEffect(() => {
    if (isOpen) {
      if (editingPriority) {
        setName(editingPriority.name);
        setIcon(editingPriority.icon);
        setIconBg(editingPriority.iconBg);
        setProgressColor(editingPriority.progressColor);
        setTargetAmount(editingPriority.targetAmount);
        setCurrentAmount(editingPriority.currentAmount);
        setTargetDate(editingPriority.targetDate);
        setCategory(editingPriority.category ?? 'milestone');
        setSelectedPreset(null);
      } else {
        setName('');
        setIcon('savings');
        setIconBg('var(--pfm-palette-green-extra-soft)');
        setProgressColor('var(--pfm-status-success)');
        setTargetAmount(10000);
        setCurrentAmount(0);
        setTargetDate('Dec 2027');
        setCategory('milestone');
        setSelectedPreset(null);
      }
    }
  }, [isOpen, editingPriority]);

  const handlePresetSelect = (index: number) => {
    const preset = PRESETS[index];
    setSelectedPreset(index);
    setName(preset.name);
    setIcon(preset.icon);
    setIconBg(preset.iconBg);
    setProgressColor(preset.progressColor);
    setCategory(preset.category);
    setTargetAmount(preset.defaultTarget);
    setTargetDate(preset.defaultDate);
  };

  const monthlyContribution = useMemo(() => {
    const months = monthsUntil(targetDate);
    const remaining = targetAmount - currentAmount;
    return Math.max(Math.ceil(remaining / months), 0);
  }, [targetAmount, currentAmount, targetDate]);

  const handleSave = () => {
    const priority: Pocket = {
      id: editingPriority?.id ?? 'priority-' + Date.now(),
      name,
      icon,
      iconBg,
      progressColor,
      currentAmount,
      targetAmount,
      targetDate,
      category,
      monthlyContribution,
      priority: editingPriority?.priority,
    };
    onSave(priority);
    onClose();
  };

  const canSave = name.trim().length > 0 && targetAmount > 0;

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      className="add-priority-modal"
      initialBreakpoint={0.85}
      breakpoints={[0, 0.85]}
    >
      <div className="add-priority">
        <div className="add-priority__header">
          <h3 className="add-priority__title typo-callout-semibold">
            {isEditing ? 'Edit priority' : 'Add a priority'}
          </h3>
          <button className="add-priority__close" onClick={onClose} aria-label="Close">
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>

        <div className="add-priority__body">
          {/* Preset picker — only when adding */}
          {!isEditing && (
            <div className="add-priority__section">
              <label className="add-priority__label typo-footnote color-secondary">
                Choose a preset
              </label>
              <div className="add-priority__presets">
                {PRESETS.map((preset, i) => (
                  <button
                    key={preset.name}
                    className={`add-priority__preset${selectedPreset === i ? ' add-priority__preset--selected' : ''}`}
                    onClick={() => handlePresetSelect(i)}
                  >
                    <div
                      className="add-priority__preset-icon"
                      style={{ background: preset.iconBg }}
                    >
                      <span className="material-symbols-rounded">{preset.materialIcon}</span>
                    </div>
                    <span className="add-priority__preset-label typo-footnote">
                      {preset.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Name input */}
          <div className="add-priority__section">
            <label className="add-priority__label typo-footnote color-secondary">Name</label>
            <input
              className="add-priority__input typo-body-regular"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. New kitchen"
            />
          </div>

          {/* Target amount */}
          <div className="add-priority__section">
            <label className="add-priority__label typo-footnote color-secondary">
              Target amount
            </label>
            <div className="add-priority__input-wrapper">
              <span className="add-priority__input-prefix typo-body-regular">€</span>
              <input
                className="add-priority__input add-priority__input--has-prefix typo-body-regular"
                type="number"
                inputMode="numeric"
                value={targetAmount || ''}
                onChange={(e) => setTargetAmount(Number(e.target.value) || 0)}
                placeholder="0"
              />
            </div>
          </div>

          {/* Target date */}
          <div className="add-priority__section">
            <label className="add-priority__label typo-footnote color-secondary">
              Target date
            </label>
            <input
              className="add-priority__input typo-body-regular"
              type="text"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              placeholder="Dec 2027"
            />
          </div>

          {/* Monthly contribution — read-only */}
          <div className="add-priority__contribution">
            <span className="material-symbols-rounded add-priority__contribution-icon">
              calendar_month
            </span>
            <span className="typo-callout-regular color-secondary">
              {formatEuroShort(monthlyContribution)}/month to reach your target
            </span>
          </div>

          {/* Category selector */}
          <div className="add-priority__section">
            <label className="add-priority__label typo-footnote color-secondary">Category</label>
            <div className="add-priority__categories">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  className={`add-priority__category-pill typo-footnote${category === cat.id ? ' add-priority__category-pill--selected' : ''}`}
                  onClick={() => setCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Save button */}
          <button
            className="btn-raised add-priority__save"
            onClick={handleSave}
            disabled={!canSave}
            style={{
              background: 'var(--pfm-action-primary-bg)',
              color: 'var(--pfm-action-primary-text)',
              borderColor: 'var(--pfm-action-primary-bg)',
            }}
          >
            {isEditing ? 'Save changes' : 'Add priority'}
          </button>

          {/* Delete button — only when editing */}
          {isEditing && onDelete && (
            <button className="add-priority__delete typo-callout-regular" onClick={onDelete}>
              Delete priority
            </button>
          )}
        </div>
      </div>
    </IonModal>
  );
};

export default AddPrioritySheet;
