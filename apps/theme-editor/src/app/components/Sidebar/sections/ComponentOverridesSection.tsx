import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import SectionHeader from '../components/SectionHeader';
import ComponentOverrideItem from '../ComponentOverrideItem';
import ComponentOverrideDialog from '../ComponentOverrideDialog';
import { useComponentOverrides } from '../hooks/useComponentOverrides';

export default function ComponentOverridesSection() {
  const {
    fields,
    overrideDialogOpen,
    editingOverride,
    handleOpenOverrideDialog,
    handleEditOverride,
    handleSaveOverride,
    handleDeleteOverride,
    handleCloseOverrideDialog,
  } = useComponentOverrides();

  return (
    <>
      <SectionHeader
        title="Component Overrides"
        subtitle="Customize default props and styles for specific MUI components. These settings will apply globally to all instances of the selected components."
        actions={
          <Button
            variant="outlined"
            size="small"
            startIcon={<AddIcon />}
            onClick={handleOpenOverrideDialog}
          >
            Add Override
          </Button>
        }
      />

      {fields.length === 0 ? (
        <Box
          sx={{
            border: '2px dashed',
            borderColor: 'divider',
            borderRadius: 1,
            p: 3,
            textAlign: 'center',
            bgcolor: 'background.default',
          }}
        >
          <SettingsIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
          <Box
            component="span"
            sx={{ typography: 'body2', color: 'text.secondary' }}
          >
            No component overrides yet. Add your first override to customize
            component defaults.
          </Box>
        </Box>
      ) : (
        <Box sx={{ maxHeight: 200, overflow: 'auto', mb: 2 }}>
          {fields.map((field) => (
            <ComponentOverrideItem
              key={field.id}
              override={field}
              onEdit={handleEditOverride}
              onDelete={handleDeleteOverride}
            />
          ))}
        </Box>
      )}

      <ComponentOverrideDialog
        open={overrideDialogOpen}
        onClose={handleCloseOverrideDialog}
        onSave={handleSaveOverride}
        editingOverride={editingOverride}
      />
    </>
  );
}
