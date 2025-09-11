import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { router } from '@inertiajs/react';

interface SyncContextType {
  triggerApSync: () => void;
  triggerDashboardSync: () => void;
  isApPageActive: boolean;
  isDashboardPageActive: boolean;
  setIsApPageActive: (active: boolean) => void;
  setIsDashboardPageActive: (active: boolean) => void;
}

const SyncContext = createContext<SyncContextType | undefined>(undefined);

export function SyncProvider({ children }: { children: ReactNode }) {
  const [isApPageActive, setIsApPageActive] = useState(false);
  const [isDashboardPageActive, setIsDashboardPageActive] = useState(false);
  const [lastApUpdate, setLastApUpdate] = useState<number>(Date.now());

  // Función para disparar sincronización desde la página de APs
  const triggerApSync = () => {
    setLastApUpdate(Date.now());
    
    // Si el dashboard está activo, actualizar sus datos
    if (isDashboardPageActive) {
      router.get('/dashboard', {}, {
        only: ['connectivity', 'stats', 'problematic_aps'],
        preserveState: true,
        preserveScroll: true,
      });
    }
  };

  // Función para disparar sincronización del dashboard
  const triggerDashboardSync = () => {
    router.get('/dashboard', {}, {
      only: ['connectivity', 'stats', 'problematic_aps'],
      preserveState: true,
      preserveScroll: true,
    });
  };

  // Auto-sync cada 30 segundos si ambas páginas están activas
  useEffect(() => {
    if (isApPageActive && isDashboardPageActive) {
      const interval = setInterval(() => {
        triggerDashboardSync();
      }, 30000); // 30 segundos

      return () => clearInterval(interval);
    }
  }, [isApPageActive, isDashboardPageActive]);

  const value = {
    triggerApSync,
    triggerDashboardSync,
    isApPageActive,
    isDashboardPageActive,
    setIsApPageActive,
    setIsDashboardPageActive,
  };

  return (
    <SyncContext.Provider value={value}>
      {children}
    </SyncContext.Provider>
  );
}

export function useSync() {
  const context = useContext(SyncContext);
  if (context === undefined) {
    throw new Error('useSync must be used within a SyncProvider');
  }
  return context;
}
