export default function HorizonCanvas({
  value,
  onChange,
}: {
  value: string;
  onChange: (newMask: string) => void;
}) {
  // Placeholder for the actual canvas implementation
  return (
    <div>
      <p>Horizon Mask Canvas Placeholder</p>
      <h3>value</h3>
      <textarea value={value} onChange={e => onChange(e.target.value)} />
    </div>
  );
}
