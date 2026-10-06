"use client";

import { MotionConfig } from "motion/react";
import { ReactLenis, useLenis } from "lenis/react";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import Cursor from "./Cursor";
import Preloader from "./Preloader";
import WhatsAppModal from "./WhatsAppModal";

// `ready` vira true quando o preloader começa a sair; hero e header animam a partir daí.
const ReadyContext = createContext(false);
export const useReady = () => useContext(ReadyContext);

// Trava o scroll suave enquanto o preloader está na tela (o Lenis intercepta a roda do mouse).
function ScrollGate({ ready }: { ready: boolean }) {
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    if (ready) lenis.start();
    else lenis.stop();
  }, [lenis, ready]);
  return null;
}

export default function Providers({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const handleExit = useCallback(() => setReady(true), []);

  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis root options={{ lerp: 0.085, wheelMultiplier: 0.95, anchors: true }}>
        <ReadyContext.Provider value={ready}>
          <ScrollGate ready={ready} />
          <Preloader onExit={handleExit} />
          <Cursor />
          <WhatsAppModal />
          {children}
        </ReadyContext.Provider>
      </ReactLenis>
    </MotionConfig>
  );
}
