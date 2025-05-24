import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Tabs,
  Tab,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Stack,
  Switch,
  FormControlLabel,
  Divider,
  IconButton,
  Paper,
  Card,
  AppBar,
  Drawer,
  Chip,
  Avatar,
  Alert,
  Checkbox,
  Radio,
  Slider,
  Fab,
  Tooltip,
  Snackbar,
  Accordion,
} from '@mui/material';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {
  MUI_COMPONENTS,
  COMPONENT_PROPS,
  ComponentOverride,
} from '../../types/theme';

interface ComponentOverrideDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (override: ComponentOverride) => void;
  editingOverride?: ComponentOverride | null;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`override-tabpanel-${index}`}
      aria-labelledby={`override-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
}

function ComponentPreview({
  component,
  defaultProps,
  styleOverrides,
}: {
  component: string;
  defaultProps: Record<string, any>;
  styleOverrides: Record<string, any>;
}) {
  if (!component) {
    return (
      <Typography variant="body2" color="text.secondary">
        Select a component to see preview
      </Typography>
    );
  }

  // Combine style overrides into sx prop
  const combinedStyles = Object.keys(styleOverrides).reduce((acc, key) => {
    const styles = styleOverrides[key];
    if (typeof styles === 'object' && styles !== null) {
      return { ...acc, ...styles };
    }
    return acc;
  }, {});

  const previewProps = {
    ...defaultProps,
    sx: Object.keys(combinedStyles).length > 0 ? combinedStyles : undefined,
  };

  // Sample content for different components
  const getComponentWithContent = () => {
    switch (component) {
      case 'Button':
        return <Button {...previewProps}>Sample Button</Button>;

      case 'TextField':
        return <TextField {...previewProps} placeholder="Sample text field" />;

      case 'Paper':
        return (
          <Paper {...previewProps}>
            <Box sx={{ p: 2 }}>
              <Typography>Paper content</Typography>
            </Box>
          </Paper>
        );

      case 'Card':
        return (
          <Card {...previewProps}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6">Card Title</Typography>
              <Typography variant="body2" color="text.secondary">
                Card content goes here
              </Typography>
            </Box>
          </Card>
        );

      case 'Typography':
        return (
          <Typography {...previewProps}>Sample Typography Text</Typography>
        );

      case 'Chip':
        return <Chip {...previewProps} label="Sample Chip" />;

      case 'Avatar':
        return <Avatar {...previewProps}>A</Avatar>;

      case 'Alert':
        return <Alert {...previewProps}>This is a sample alert message</Alert>;

      case 'Switch':
        return (
          <FormControlLabel
            control={<Switch {...previewProps} />}
            label="Sample Switch"
          />
        );

      case 'Checkbox':
        return (
          <FormControlLabel
            control={<Checkbox {...previewProps} />}
            label="Sample Checkbox"
          />
        );

      case 'Radio':
        return (
          <FormControlLabel
            control={<Radio {...previewProps} />}
            label="Sample Radio"
          />
        );

      case 'Slider':
        return (
          <Box sx={{ width: 200 }}>
            <Typography gutterBottom>Sample Slider</Typography>
            <Slider {...previewProps} defaultValue={50} />
          </Box>
        );

      case 'Fab':
        return <Fab {...previewProps}>+</Fab>;

      case 'IconButton':
        return <IconButton {...previewProps}>⚙️</IconButton>;

      case 'Tooltip':
        return (
          <Tooltip {...previewProps} title="Sample tooltip">
            <Button>Hover me</Button>
          </Tooltip>
        );

      default:
        return (
          <Box
            {...previewProps}
            sx={{
              p: 2,
              border: '1px dashed',
              borderColor: 'divider',
              borderRadius: 1,
              ...combinedStyles,
            }}
          >
            <Typography>{component} Preview</Typography>
            <Typography variant="caption" color="text.secondary">
              Generic preview for {component}
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        bgcolor: 'background.default',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 120,
      }}
    >
      {getComponentWithContent()}
    </Box>
  );
}

export default function ComponentOverrideDialog({
  open,
  onClose,
  onSave,
  editingOverride,
}: ComponentOverrideDialogProps) {
  const [tabValue, setTabValue] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState(
    editingOverride?.component || ''
  );
  const [defaultProps, setDefaultProps] = useState<Record<string, any>>(
    editingOverride?.defaultProps || {}
  );
  const [styleOverrides, setStyleOverrides] = useState<Record<string, any>>(
    editingOverride?.styleOverrides || {}
  );

  // Update state when editingOverride changes or dialog opens
  useEffect(() => {
    if (open) {
      if (editingOverride) {
        setSelectedComponent(editingOverride.component);
        setDefaultProps(editingOverride.defaultProps || {});
        setStyleOverrides(editingOverride.styleOverrides || {});
      } else {
        setSelectedComponent('');
        setDefaultProps({});
        setStyleOverrides({});
      }
      setTabValue(0);
    }
  }, [editingOverride, open]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleComponentChange = (component: string) => {
    setSelectedComponent(component);
    setDefaultProps({});
    setStyleOverrides({});
  };

  const handleDefaultPropChange = (propName: string, value: any) => {
    setDefaultProps((prev) => ({
      ...prev,
      [propName]: value,
    }));
  };

  const handleRemoveDefaultProp = (propName: string) => {
    setDefaultProps((prev) => {
      const { [propName]: removed, ...rest } = prev;
      return rest;
    });
  };

  const handleAddStyleOverride = () => {
    const newKey = `newStyle${Object.keys(styleOverrides).length + 1}`;
    setStyleOverrides((prev) => ({
      ...prev,
      [newKey]: {},
    }));
  };

  const handleStyleOverrideKeyChange = (oldKey: string, newKey: string) => {
    if (oldKey === newKey) return;
    setStyleOverrides((prev) => {
      const { [oldKey]: value, ...rest } = prev;
      return {
        ...rest,
        [newKey]: value,
      };
    });
  };

  const handleStyleOverrideValueChange = (key: string, value: string) => {
    try {
      const parsedValue = JSON.parse(value || '{}');
      setStyleOverrides((prev) => ({
        ...prev,
        [key]: parsedValue,
      }));
    } catch (error) {
      // Keep the raw string value if JSON parsing fails
      setStyleOverrides((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  const handleRemoveStyleOverride = (key: string) => {
    setStyleOverrides((prev) => {
      const { [key]: removed, ...rest } = prev;
      return rest;
    });
  };

  const handleSave = () => {
    if (!selectedComponent) return;

    const override: ComponentOverride = {
      id: editingOverride?.id || `${selectedComponent}-${Date.now()}`,
      component: selectedComponent,
      defaultProps:
        Object.keys(defaultProps).length > 0 ? defaultProps : undefined,
      styleOverrides:
        Object.keys(styleOverrides).length > 0 ? styleOverrides : undefined,
    };

    onSave(override);
    handleClose();
  };

  const handleClose = () => {
    // Reset form state
    setTabValue(0);
    if (!editingOverride) {
      setSelectedComponent('');
      setDefaultProps({});
      setStyleOverrides({});
    }
    onClose();
  };

  const componentProps = selectedComponent
    ? COMPONENT_PROPS[selectedComponent] || {}
    : {};

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {editingOverride ? 'Edit Component Override' : 'Add Component Override'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <TextField
            select
            label="Component"
            fullWidth
            value={selectedComponent}
            onChange={(e) => handleComponentChange(e.target.value)}
            margin="normal"
          >
            {MUI_COMPONENTS.map((component) => (
              <MenuItem key={component} value={component}>
                {component}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {/* Live Preview Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Live Preview
          </Typography>
          <ComponentPreview
            component={selectedComponent}
            defaultProps={defaultProps}
            styleOverrides={styleOverrides}
          />
          {selectedComponent &&
            (Object.keys(defaultProps).length > 0 ||
              Object.keys(styleOverrides).length > 0) && (
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: 'background.default',
                  borderRadius: 1,
                }}
              >
                <Typography variant="subtitle2" gutterBottom>
                  Applied Overrides:
                </Typography>
                {Object.keys(defaultProps).length > 0 && (
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      <strong>Default Props:</strong>{' '}
                      {Object.entries(defaultProps)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(', ')}
                    </Typography>
                  </Box>
                )}
                {Object.keys(styleOverrides).length > 0 && (
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      <strong>Style Overrides:</strong>{' '}
                      {Object.keys(styleOverrides).join(', ')}
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Default Props" id="override-tab-0" />
            <Tab label="Style Overrides" id="override-tab-1" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom>
            Default Props
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Set default props that will be applied to all instances of this
            component.
          </Typography>

          {!selectedComponent ? (
            <Typography variant="body2" color="text.secondary">
              Select a component to see available props.
            </Typography>
          ) : (
            <Stack spacing={2}>
              {Object.entries(componentProps).map(
                ([propName, possibleValues]) => (
                  <Box key={propName}>
                    <FormControl fullWidth size="small">
                      <InputLabel>{propName}</InputLabel>
                      <Select
                        value={defaultProps[propName] || ''}
                        label={propName}
                        onChange={(e) =>
                          handleDefaultPropChange(propName, e.target.value)
                        }
                      >
                        <MenuItem value="">
                          <em>Not set</em>
                        </MenuItem>
                        {Array.isArray(possibleValues) &&
                          possibleValues.map((value) => (
                            <MenuItem key={String(value)} value={value}>
                              {String(value)}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                    {defaultProps[propName] !== undefined && (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          mt: 0.5,
                        }}
                      >
                        <Button
                          size="small"
                          onClick={() => handleRemoveDefaultProp(propName)}
                          startIcon={<DeleteIcon />}
                        >
                          Remove
                        </Button>
                      </Box>
                    )}
                  </Box>
                )
              )}
            </Stack>
          )}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Box>
              <Typography variant="h6">Style Overrides</Typography>
              <Typography variant="body2" color="text.secondary">
                Customize CSS styles for component parts.
              </Typography>
            </Box>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleAddStyleOverride}
              disabled={!selectedComponent}
            >
              Add Override
            </Button>
          </Box>

          {!selectedComponent ? (
            <Typography variant="body2" color="text.secondary">
              Select a component to add style overrides.
            </Typography>
          ) : (
            <Stack spacing={2}>
              {Object.entries(styleOverrides).map(([key, value]) => (
                <Box
                  key={key}
                  sx={{
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                    p: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 1,
                      mb: 2,
                      alignItems: 'center',
                    }}
                  >
                    <TextField
                      label="Style Key (e.g., root, paper)"
                      value={key}
                      onChange={(e) =>
                        handleStyleOverrideKeyChange(key, e.target.value)
                      }
                      size="small"
                      sx={{ flex: 1 }}
                    />
                    <IconButton
                      onClick={() => handleRemoveStyleOverride(key)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <TextField
                    label="CSS Styles (JSON format)"
                    multiline
                    rows={3}
                    fullWidth
                    value={
                      typeof value === 'string'
                        ? value
                        : JSON.stringify(value, null, 2)
                    }
                    onChange={(e) =>
                      handleStyleOverrideValueChange(key, e.target.value)
                    }
                    placeholder='{"backgroundColor": "#f5f5f5", "padding": "16px"}'
                    helperText="Enter valid JSON with CSS properties"
                  />
                </Box>
              ))}
            </Stack>
          )}
        </TabPanel>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!selectedComponent}
        >
          {editingOverride ? 'Update Override' : 'Add Override'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
