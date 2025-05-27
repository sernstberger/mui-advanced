import { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { ThemeFormData, ComponentOverride } from '../../../types/theme';

export function useComponentOverrides() {
  const { control } = useFormContext<ThemeFormData>();
  const [overrideDialogOpen, setOverrideDialogOpen] = useState(false);
  const [editingOverride, setEditingOverride] =
    useState<ComponentOverride | null>(null);

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'components',
  });

  const handleOpenOverrideDialog = () => {
    setEditingOverride(null);
    setOverrideDialogOpen(true);
  };

  const handleEditOverride = (override: ComponentOverride) => {
    setEditingOverride(override);
    setOverrideDialogOpen(true);
  };

  const handleSaveOverride = (override: ComponentOverride) => {
    if (editingOverride) {
      const index = fields.findIndex((field) => field.id === override.id);
      if (index !== -1) {
        update(index, override);
      }
    } else {
      append(override);
    }
  };

  const handleDeleteOverride = (id: string) => {
    const index = fields.findIndex((field) => field.id === id);
    if (index !== -1) {
      remove(index);
    }
  };

  const handleCloseOverrideDialog = () => {
    setOverrideDialogOpen(false);
  };

  return {
    fields,
    overrideDialogOpen,
    editingOverride,
    handleOpenOverrideDialog,
    handleEditOverride,
    handleSaveOverride,
    handleDeleteOverride,
    handleCloseOverrideDialog,
  };
}
