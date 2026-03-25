import { useState } from "react";

interface CreateModalProps {
  plotIndex: number;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}

const PLANT_TYPES = ["Monstera", "Spider", "Orchid", "Fern", "Bonsai", "Succulent"];
const PLANT_STAGES = ["Sprout", "Teen", "Mature"];

export default function CreateModal({
  plotIndex,
  onClose,
  onSubmit,
}: CreateModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    plant_type: PLANT_TYPES[0],
    stage: PLANT_STAGES[0],
    room: "Living Room",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center 
      bg-black/70 p-4 backdrop-blur-md"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 font-nunito">
            Plant Seed in Plot {plotIndex}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 text-xl font-bold hover:text-gray-900"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm font-bold text-gray-700">
              Plant Name
            </label>
            <input
              required
              type="text"
              placeholder="e.g. Esmerelda"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full rounded-lg border-2 border-gray-300 p-3 
              text-gray-900 focus:border-green-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-bold text-gray-700">
                Species
              </label>
              <select
                value={formData.plant_type}
                onChange={(e) =>
                  setFormData({ ...formData, plant_type: e.target.value })
                }
                className="w-full rounded-lg border-2 border-gray-300 p-3 
                text-gray-900 focus:border-green-500 focus:outline-none"
              >
                {PLANT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold text-gray-700">
                Stage
              </label>
              <select
                value={formData.stage}
                onChange={(e) =>
                  setFormData({ ...formData, stage: e.target.value })
                }
                className="w-full rounded-lg border-2 border-gray-300 p-3 
                text-gray-900 focus:border-green-500 focus:outline-none"
              >
                {PLANT_STAGES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-4 w-full rounded-lg p-4 font-bold text-white transition-colors ${
              isSubmitting ? "cursor-not-allowed bg-gray-400" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isSubmitting ? "Communing with the Goddess..." : "Plant Seed 🌱"}
          </button>
        </form>
      </div>
    </div>
  );
}