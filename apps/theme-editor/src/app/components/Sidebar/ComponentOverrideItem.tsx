import { Box, Typography, IconButton, Chip, Stack, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ComponentOverride } from '../../types/theme';

interface ComponentOverrideItemProps {
  override: ComponentOverride;
  onEdit: (override: ComponentOverride) => void;
  onDelete: (id: string) => void;
}

export default function ComponentOverrideItem({
  override,
  onEdit,
  onDelete,
}: ComponentOverrideItemProps) {
  const hasDefaultProps =
    override.defaultProps && Object.keys(override.defaultProps).length > 0;
  const hasStyleOverrides =
    override.styleOverrides && Object.keys(override.styleOverrides).length > 0;

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        mb: 1,
        '&:hover': {
          bgcolor: 'action.hover',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mb: 1,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {override.component}
        </Typography>
        <Box>
          <IconButton
            size="small"
            onClick={() => onEdit(override)}
            sx={{ mr: 0.5 }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onDelete(override.id)}
            color="error"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {hasDefaultProps && (
          <Chip
            label={`${Object.keys(override.defaultProps!).length} props`}
            size="small"
            color="primary"
            variant="outlined"
          />
        )}
        {hasStyleOverrides && (
          <Chip
            label={`${Object.keys(override.styleOverrides!).length} styles`}
            size="small"
            color="secondary"
            variant="outlined"
          />
        )}
      </Stack>

      {hasDefaultProps && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="caption" color="text.secondary" display="block">
            Props: {Object.keys(override.defaultProps!).join(', ')}
          </Typography>
        </Box>
      )}

      {hasStyleOverrides && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="caption" color="text.secondary" display="block">
            Styles: {Object.keys(override.styleOverrides!).join(', ')}
          </Typography>
        </Box>
      )}
    </Paper>
  );
}
