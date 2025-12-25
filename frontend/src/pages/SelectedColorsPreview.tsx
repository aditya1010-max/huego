interface SelectedProps {
  colors: string[];
  onRemove: (color: string) => void;
}

const SelectedColorsPreview: React.FC<SelectedProps> = ({
  colors,
  onRemove,
}) => {
  return (
    <div className="selectedPreview">
      {colors.map((c) => (
        <div
          key={c}
          className="selectedColor"
          style={{ backgroundColor: c }}
          onClick={() => onRemove(c)}
          title="Click to remove"
        />
      ))}
    </div>
  );
};

export default SelectedColorsPreview;
