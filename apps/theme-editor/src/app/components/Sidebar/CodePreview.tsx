import { Box } from '@mui/material';

interface CodePreviewProps {
  code: string;
}

const CodePreview = ({ code }: CodePreviewProps) => {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        p: 1,
        fontFamily: 'monospace',
        fontSize: 12,
        maxHeight: 180,
        overflow: 'auto',
        whiteSpace: 'pre',
      }}
      component="pre"
    >
      {code}
    </Box>
  );
};

export default CodePreview;
