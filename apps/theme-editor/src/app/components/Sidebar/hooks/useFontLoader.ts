import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { ThemeFormData } from '../../../types/theme';
import { loadFont } from '../../../utils/loadFont';

export function useFontLoader() {
  const { watch } = useFormContext<ThemeFormData>();
  const watchedValues = watch();

  // Load font when font family changes
  useEffect(() => {
    if (watchedValues.typography?.fontFamily) {
      loadFont(watchedValues.typography.fontFamily);
    }
  }, [watchedValues.typography?.fontFamily]);
}
