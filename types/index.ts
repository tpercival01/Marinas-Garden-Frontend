
export interface CareTips {
  water_frequency_days: number;
  sunlight_needs: string;
  fun_fact: string;
}

export interface Plant {
  id: string;
  user_id: string;
  plot_index: number;
  name: string;
  plant_type: string;
  stage: string;
  room?: string;
  plant_start: string;
  last_watered: string;
  ai_care_tips: CareTips;
}