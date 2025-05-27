import SectionHeader from '../components/SectionHeader';
import ThemeModeToggle from '../components/ThemeModeToggle';
import ColorItem from '../ColorItem';

export default function PaletteSection() {
  return (
    <>
      <SectionHeader title="Palette" />

      <ThemeModeToggle />

      <ColorItem name="primary" label="Primary Color" />
      <ColorItem name="secondary" label="Secondary Color" />
      <ColorItem name="error" label="Error Color" />
      <ColorItem name="warning" label="Warning Color" />
      <ColorItem name="info" label="Info Color" />
      <ColorItem name="success" label="Success Color" />
    </>
  );
}
