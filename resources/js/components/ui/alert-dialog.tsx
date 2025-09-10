import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface AlertDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

interface AlertDialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AlertDialogContext = React.createContext<AlertDialogContextValue | null>(null);

const AlertDialog: React.FC<AlertDialogProps> = ({ open = false, onOpenChange, children }) => {
  const [internalOpen, setInternalOpen] = React.useState(open);
  
  const handleOpenChange = React.useCallback((newOpen: boolean) => {
    setInternalOpen(newOpen);
    onOpenChange?.(newOpen);
  }, [onOpenChange]);

  React.useEffect(() => {
    setInternalOpen(open);
  }, [open]);

  return (
    <AlertDialogContext.Provider value={{ open: internalOpen, onOpenChange: handleOpenChange }}>
      {children}
    </AlertDialogContext.Provider>
  );
};

const AlertDialogTrigger: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const context = React.useContext(AlertDialogContext);
  
  return (
    <div onClick={() => context?.onOpenChange(true)}>
      {children}
    </div>
  );
};

const AlertDialogContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const context = React.useContext(AlertDialogContext);
  
  if (!context?.open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/80" 
        onClick={() => context?.onOpenChange(false)}
      />
      <div className={cn(
        "relative bg-background p-6 shadow-lg border rounded-lg w-full max-w-lg mx-4",
        className
      )}>
        {children}
      </div>
    </div>
  );
};

const AlertDialogHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}>
    {children}
  </div>
);

const AlertDialogTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <h2 className={cn("text-lg font-semibold", className)}>
    {children}
  </h2>
);

const AlertDialogDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <p className={cn("text-sm text-muted-foreground", className)}>
    {children}
  </p>
);

const AlertDialogFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4", className)}>
    {children}
  </div>
);

const AlertDialogAction: React.FC<{ children: React.ReactNode; onClick?: () => void; className?: string }> = ({ children, onClick, className }) => {
  const context = React.useContext(AlertDialogContext);
  
  return (
    <Button 
      onClick={() => {
        onClick?.();
        context?.onOpenChange(false);
      }}
      className={className}
    >
      {children}
    </Button>
  );
};

const AlertDialogCancel: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const context = React.useContext(AlertDialogContext);
  
  return (
    <Button 
      variant="outline"
      onClick={() => context?.onOpenChange(false)}
      className={cn("mt-2 sm:mt-0", className)}
    >
      {children}
    </Button>
  );
};

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
