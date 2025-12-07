import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const APP_VERSION = Date.now(); // Change this when you publish updates

export default function VersionChecker() {
  const [needsUpdate, setNeedsUpdate] = useState(false);

  useEffect(() => {
    // Check version on mount
    const storedVersion = localStorage.getItem('app_version');
    
    if (storedVersion && parseInt(storedVersion) !== APP_VERSION) {
      setNeedsUpdate(true);
    } else {
      localStorage.setItem('app_version', APP_VERSION.toString());
    }

    // Check for updates every 5 minutes
    const interval = setInterval(() => {
      const currentStored = localStorage.getItem('app_version');
      if (currentStored && parseInt(currentStored) !== APP_VERSION) {
        setNeedsUpdate(true);
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    localStorage.setItem('app_version', APP_VERSION.toString());
    window.location.reload();
  };

  if (!needsUpdate) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-blue-900 text-white rounded-lg shadow-lg p-4 max-w-sm animate-in slide-in-from-bottom">
      <div className="flex items-start gap-3">
        <RefreshCw className="w-5 h-5 mt-0.5 shrink-0" />
        <div className="flex-1">
          <p className="font-medium mb-2">Nueva versión disponible</p>
          <p className="text-sm text-blue-100 mb-3">
            Actualiza la página para ver las últimas mejoras
          </p>
          <Button
            onClick={handleRefresh}
            size="sm"
            className="bg-white text-blue-900 hover:bg-blue-50 w-full"
          >
            Actualizar ahora
          </Button>
        </div>
      </div>
    </div>
  );
}