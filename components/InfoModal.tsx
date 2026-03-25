import { Plant } from "../types";

interface InfoModalProps {
  plant: Plant;
  onClose: () => void;
  onWater: (id: string) => void;
  onUproot: (id: string) => void;
}

export default function InfoModal({
  plant,
  onClose,
  onWater,
  onUproot,
}: InfoModalProps) {
  const getMood = () => {
    if (!plant.last_watered || !plant.ai_care_tips?.water_frequency_days) {
      return "Happy & Hydrated 🌿";
    }
    const lastWatered = new Date(plant.last_watered).getTime();
    const now = Date.now();
    const daysInMs =
      plant.ai_care_tips.water_frequency_days * 24 * 60 * 60 * 1000;
    const ratio = (now - lastWatered) / daysInMs;

    if (ratio > 1) return "Desperately parched! 🥀";
    if (ratio > 0.7) return "Looking a bit dry 🍂";
    return "Happy & Hydrated 🌿";
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center 
      bg-black/70 p-4 backdrop-blur-md"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="font-nunito text-3xl font-black text-gray-900">
              {plant.name}
            </h2>
            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-green-600">
              {plant.plant_type} • {plant.stage}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 text-xl font-bold hover:text-gray-900"
          >
            ✕
          </button>
        </div>

        <div className="mb-4 text-center rounded-lg bg-gray-50 py-3 border border-gray-200">
          <p className="text-xs font-bold uppercase text-gray-500">Current Mood</p>
          <p className="text-lg font-bold text-gray-800">{getMood()}</p>
        </div>

        <div className="mb-6 rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
          <p className="mb-3 border-b border-blue-200 pb-2 text-sm font-bold text-blue-900">
            🤖 Botanist AI Tips
          </p>
          <ul className="mb-4 space-y-2 text-sm text-blue-900">
            <li>
              <span className="font-bold">Watering:</span> Every{" "}
              {plant.ai_care_tips?.water_frequency_days || 7} days
            </li>
            <li>
              <span className="font-bold">Sunlight:</span>{" "}
              {plant.ai_care_tips?.sunlight_needs || "Unknown"}
            </li>
          </ul>
          <div className="rounded-lg border border-blue-200 bg-blue-100 p-3 text-xs italic text-blue-900">
            "{plant.ai_care_tips?.fun_fact || "No fun facts available."}"
          </div>
        </div>

        <div className="mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Last Watered
          </p>
          <p className="text-lg font-bold text-gray-800">
            {formatDate(plant.last_watered)}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => onWater(plant.id)}
            className="w-full rounded-lg bg-blue-500 p-4 font-bold text-white 
            shadow-md transition-colors hover:bg-blue-600"
          >
            Water Plant 💧
          </button>
          <button
            onClick={() => onUproot(plant.id)}
            className="w-full rounded-lg border-2 border-red-500 p-3 font-bold 
            text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            Uproot to Compost 🗑️
          </button>
        </div>
      </div>
    </div>
  );
}