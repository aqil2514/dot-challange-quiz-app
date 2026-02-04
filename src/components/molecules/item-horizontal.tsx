import type { LabelValue } from "@/@types/general";

export function ItemHorizontal({ label, value }: LabelValue) {
  return (
    <div className="flex justify-between">
      <p className="font font-semibold">{label}</p>
      <p>{value}</p>
    </div>
  );
}
