import { Box, Typography, Divider } from '@mui/material';
import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export default function SectionHeader({
  title,
  subtitle,
  actions,
}: SectionHeaderProps) {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: subtitle ? 1 : 2 }}>
        <Typography
          variant="subtitle2"
          sx={{ flexGrow: 1 }}
          gutterBottom={!subtitle}
        >
          {title}
        </Typography>
        {actions}
      </Box>
      {subtitle && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {subtitle}
        </Typography>
      )}
    </>
  );
}
