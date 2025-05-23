import { useState } from 'react';
import {
  Paper,
  Typography,
  Stack,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { generateThemeCode } from '../../utils/codeGenerator';
import CodePreview from './CodePreview';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import ResetButton from './ResetButton';
import type { ThemeFormData } from '../../types/theme';

const ExportSection = () => {
  const { watch } = useFormContext<ThemeFormData>();
  const [copySuccess, setCopySuccess] = useState(false);
  const formData = watch();
  const themeCode = generateThemeCode(formData.palette, formData.typography);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(themeCode);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 1500);
    } catch (e) {
      setCopySuccess(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([themeCode], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'theme.ts';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Export Theme
      </Typography>
      <CodePreview code={themeCode} />
      <Stack spacing={1} sx={{ mt: 2 }}>
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
        <ResetButton />
      </Stack>
      <Snackbar
        open={copySuccess}
        autoHideDuration={1500}
        onClose={() => setCopySuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Theme code copied!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default ExportSection;
