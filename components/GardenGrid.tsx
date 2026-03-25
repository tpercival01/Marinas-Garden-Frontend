import { Plant } from "../types";

interface GardenGridProps {
  plants: Plant[];
  onPlotClick: (plotIndex: number, existingPlant?: Plant) => void;
}

const TOTAL_PLOTS = 15;

const getSprite = (stage: string, type: string) => {
  if (stage === "Sprout") return "/assets/plants/plant_1.png";
  if (stage === "Teen") return "/assets/plants/plant_2.png";
  
  switch (type) {
    case "Monstera": return "/assets/plants/monstera.png";
    case "Spider": return "/assets/plants/spider.png";
    case "Orchid": return "/assets/plants/orchid.png";
    case "Fern": return "/assets/plants/fern.png";
    case "Bonsai": return "/assets/plants/bonsai.png";
    case "Succulent": return "/assets/plants/succulent.png";
    default: return "/assets/plants/plant_2.png";
  }
};

export default function GardenGrid({ plants, onPlotClick }: GardenGridProps) {
  const isPlantParched = (plant: Plant) => {
    if (!plant.last_watered || !plant.ai_care_tips?.water_frequency_days) {
      return false;
    }
    // Force standard timestamp calculation to avoid browser timezone bugs
    const lastWatered = new Date(plant.last_watered).getTime();
    const now = Date.now();
    const daysInMs =
      plant.ai_care_tips.water_frequency_days * 24 * 60 * 60 * 1000;
    return now - lastWatered > daysInMs;
  };

  return (
    <div
      className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-24 
      sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 justify-items-center"
    >
      {Array.from({ length: TOTAL_PLOTS }).map((_, index) => {
        const plotIndex = index + 1;
        const plant = plants.find((p) => p.plot_index === plotIndex);
        const parched = plant ? isPlantParched(plant) : false;

        return (
          <div
            key={plotIndex}
            onClick={() => onPlotClick(plotIndex, plant)}
            className={`relative flex h-[55px] w-[120px] cursor-pointer 
              items-center justify-center rounded-[50%] transition-all duration-300 
              ${
                plant
                  ? 
                    "bg-[#a07154] border-b-[5px] border-[#6b4733] shadow-[0_8px_15px_rgba(160,113,84,0.4)] hover:-translate-y-2"
                  : 
                    "bg-[#e6d8cf] shadow-[inset_0_4px_10px_rgba(0,0,0,0.15)] border-2 border-[#d0bcae] hover:border-[#a07154]"
              }
              ${
                parched
                  ? "ring-4 ring-red-400 shadow-[0_0_20px_rgba(248,113,113,0.6)] animate-pulse"
                  : ""
              }`}
          >
            {!plant && (
              <span className="text-sm font-bold text-[#7a4b2a] drop-shadow-md">
                Dig Plot {plotIndex}
              </span>
            )}

            {plant && (
              <img
                src={getSprite(plant.stage, plant.plant_type)}
                alt={plant.name}
                className={`pointer-events-none absolute left-1/2 -translate-x-1/2 animate-grow object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] 
                ${
                  plant.stage === "Sprout"
                    ? "h-[70px] bottom-[15px]" 
                    : plant.stage === "Teen"
                    ? "h-[100px] bottom-[15px]"
                    : "h-[120px] bottom-[15px] sm:h-[120px]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}