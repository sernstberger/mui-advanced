import { Box, Button, Stack } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import SectionHeader from '../components/SectionHeader';
import { useThemeExport } from '../hooks/useThemeExport';

export default function ExportSection() {
  const { themeCode, copySuccess, handleCopy, handleDownload, handleReset } =
    useThemeExport();

  return (
    <>
      <SectionHeader title="Export Theme" showDivider={false} />

      <Box
        sx={{
          bgcolor: 'background.paper',
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
          p: 1,
          mb: 1,
          fontFamily: 'monospace',
          fontSize: 12,
          maxHeight: 180,
          overflow: 'auto',
          whiteSpace: 'pre',
        }}
        component="pre"
      >
        {themeCode}
      </Box>

      <Stack spacing={1}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<ContentCopyIcon />}
          onClick={handleCopy}
        >
          {copySuccess ? 'Copied!' : 'Copy Theme Code'}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
        >
          Download theme.ts
        </Button>
        <Button
          variant="text"
          color="secondary"
          fullWidth
          onClick={handleReset}
        >
          Reset to Defaults
        </Button>
      </Stack>
    </>
  );
}
