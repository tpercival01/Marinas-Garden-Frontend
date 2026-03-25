"use client";

import { useEffect, useState } from "react";
import { Plant } from "../types";
import { supabase } from "../utils/supabase";
import Auth from "../components/Auth";
import GardenGrid from "../components/GardenGrid";
import CreateModal from "../components/CreateModal";
import InfoModal from "../components/InfoModal";
import WelcomeModal from "../components/WelcomeModal";

export default function Garden() {
  const [session, setSession] = useState<any>(null);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal Controllers
  const [selectedPlot, setSelectedPlot] = useState<number | null>(null);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);

  // Check auth on mount
  useEffect(() => {
    const hasSeenLore = localStorage.getItem("hasSeenLore");
    if (!hasSeenLore) {
      setShowWelcome(true);
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchPlants(session.user.id);
      } else {
        setIsLoading(false); // Stop loading if no user is found
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        setIsLoading(true);
        fetchPlants(session.user.id);
      } else {
        setIsLoading(false); // Stop loading if they log out
      }
    });

    return () => subscription.unsubscribe();
    }, []);

  const fetchPlants = async (userId: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/plants/${userId}`);
      const json = await res.json();
      if (json.success) setPlants(json.data);
    } catch (error) {
      console.error("Failed to fetch plants:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // If no user is logged in, show the Auth screen
  if (!session && !isLoading) {
    return <Auth onLogin={() => setIsLoading(true)} />;
  }

  const handlePlotClick = (plotIndex: number, existingPlant?: Plant) => {
    if (existingPlant) {
      setSelectedPlant(existingPlant);
    } else {
      setSelectedPlot(plotIndex);
    }
  };

  const handleCreatePlant = async (formData: any) => {
    if (!selectedPlot) return;

    const newPlantPayload = {
      user_id: session.user.id,
      plot_index: selectedPlot,
      name: formData.name,
      plant_type: formData.plant_type,
      stage: formData.stage,
      room: formData.room,
      plant_start: new Date().toISOString().split("T")[0],
      last_watered: new Date().toISOString(),
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/plants`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPlantPayload),
      });
      const json = await res.json();
      if (json.success) {
        setPlants((prev) => [...prev, json.data]);
        setSelectedPlot(null); // Close modal
      }
    } catch (error) {
      console.error("Failed to create plant:", error);
    }
  };

  const handleDeletePlant = async (plantId: string) => {
    if (!confirm("Are you sure you want to uproot this plant to compost?")) {
      return;
    }
    
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/plants/${plantId}`,
        { method: "DELETE" }
      );
      const json = await res.json();
      if (json.success) {
        setPlants((prev) => prev.filter((p) => p.id !== plantId));
        setSelectedPlant(null); // Close modal
      }
    } catch (error) {
      console.error("Failed to delete plant:", error);
    }
  };

  const handleWaterPlant = async (plantId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/plants/${plantId}/water`,
        { method: "PATCH" }
      );
      const json = await res.json();
      if (json.success) {
        setPlants((prev) =>
          prev.map((p) => (p.id === plantId ? json.data : p))
        );
        setSelectedPlant(json.data); // Update modal UI instantly
      }
    } catch (error) {
      console.error("Failed to water plant:", error);
    }
  };

  const handleDismissWelcome = () => {
    localStorage.setItem("hasSeenLore", "true");
    setShowWelcome(false);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#424242]">
        <p className="animate-pulse font-nunito text-xl font-bold text-white tracking-wide">
          Loading Marina's Garden...
        </p>
      </div>
    );
  }

  return (
    <main
      className="relative h-screen w-screen overflow-hidden bg-cover bg-center bg-fixed bg-no-repeat"
      style={{
        backgroundImage: 'url("/assets/backgrounds/background_light.png")',
        imageRendering: "pixelated", 
      }}>
      <div className="absolute left-1/2 top-[5%] z-40 -translate-x-1/2 text-center">
        <button onClick={() => supabase.auth.signOut()} className="text-white underline text-sm">
          Sign Out
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[80vh] w-full overflow-y-auto overflow-x-hidden px-4 pb-24 pt-[100px]">
        <GardenGrid plants={plants} onPlotClick={handlePlotClick} />
      </div>

      {selectedPlot !== null && (
        <CreateModal
          plotIndex={selectedPlot}
          onClose={() => setSelectedPlot(null)}
          onSubmit={handleCreatePlant}
        />
      )}

      {selectedPlant !== null && (
        <InfoModal
          plant={selectedPlant}
          onClose={() => setSelectedPlant(null)}
          onWater={handleWaterPlant}
          onUproot={handleDeletePlant}
        />
      )}

      {showWelcome && <WelcomeModal onClose={handleDismissWelcome} />}
    </main>
  );
}