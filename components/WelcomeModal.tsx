import { useEffect, useState } from "react";

interface WelcomeModalProps {
  onClose: () => void;
}

export default function WelcomeModal({ onClose }: WelcomeModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(1);

  // Fade-in effect on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center 
      bg-black/80 p-4 backdrop-blur-sm transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl 
        border border-yellow-900/30 bg-[#2a2626] p-8 sm:p-10 shadow-2xl"
      >
        {/* Decorative background glow */}
        <div
          className="absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 
          -translate-y-1/2 rounded-full bg-yellow-600/20 blur-3xl"
        ></div>

        {step === 1 ? (
          <div className="text-center animate-in fade-in zoom-in duration-500">
            <h2 className="relative mb-6 font-nunito text-2xl sm:text-3xl font-black tracking-widest text-yellow-500/90">
              A FORGOTTEN PLACE
            </h2>
            <div className="relative mb-8 space-y-4 font-nunito text-md sm:text-lg text-gray-300">
              <p>
                You have stumbled upon a long-lost sanctuary, hidden away from the
                noise of the world. The soil is rich, but the pots have sat empty
                for an eternity.
              </p>
              <p>An inscription on the crumbling stone wall reads:</p>
              <p className="font-bold text-yellow-400 italic">
                "To the one who finds this place, you are now its Goddess. Breathe
                life back into the earth, and it shall grow with you."
              </p>
            </div>
            <button
              onClick={() => setStep(2)}
              className="relative w-full rounded-lg bg-yellow-600/20 p-4 font-bold 
              text-yellow-500 transition-all hover:bg-yellow-600 hover:text-white 
              border border-yellow-600/50 hover:shadow-[0_0_20px_rgba(202,138,4,0.4)]"
            >
              Step Forward ➔
            </button>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <h2 className="relative mb-6 text-center font-nunito text-2xl sm:text-3xl font-black tracking-widest text-yellow-500/90">
              YOUR DUTIES
            </h2>
            <div className="relative mb-8 space-y-5 font-nunito text-gray-300">
              <div className="flex items-start gap-4">
                <span className="text-2xl">🌱</span>
                <div>
                  <h3 className="font-bold text-yellow-400">Sow the Seeds</h3>
                  <p className="text-sm">Tap any empty plot in the grid to plant a new sprout and record its details.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">🤖</span>
                <div>
                  <h3 className="font-bold text-yellow-400">Consult the Oracle</h3>
                  <p className="text-sm">The Botanist AI will automatically calculate exactly how many days each plant needs between waterings.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">💧</span>
                <div>
                  <h3 className="font-bold text-yellow-400">Watch for the Glow</h3>
                  <p className="text-sm">When a plant grows thirsty, the earth beneath it will pulse red. Tap the plant to water it and reset its timer.</p>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="relative w-full rounded-lg bg-green-600/20 p-4 font-bold 
              text-green-500 transition-all hover:bg-green-600 hover:text-white 
              border border-green-600/50 hover:shadow-[0_0_20px_rgba(22,163,74,0.4)]"
            >
              Accept Your Garden 🌱
            </button>
          </div>
        )}
      </div>
    </div>
  );
}