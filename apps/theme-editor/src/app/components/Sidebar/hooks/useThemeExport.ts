import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ThemeFormData, defaultThemeValues } from '../../../types/theme';
import { generateThemeCode } from '../../../utils/themeCodeGenerator';

export function useThemeExport() {
  const { watch, reset } = useFormContext<ThemeFormData>();
  const [copySuccess, setCopySuccess] = useState(false);
  const [resetMessage, setResetMessage] = useState(false);

  const watchedValues = watch();
  const themeCode = generateThemeCode(watchedValues);

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

  const handleReset = () => {
    reset(defaultThemeValues);
    setResetMessage(true);
    setTimeout(() => setResetMessage(false), 2000);
  };

  return {
    themeCode,
    copySuccess,
    resetMessage,
    handleCopy,
    handleDownload,
    handleReset,
  };
}
