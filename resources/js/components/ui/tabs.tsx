import * as React from "react"
import { cn } from "@/lib/utils"

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}

const TabsContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
} | null>(null);

const Tabs: React.FC<TabsProps> = ({ value, onValueChange, className, children }) => (
  <TabsContext.Provider value={{ value, onValueChange }}>
    <div className={cn("", className)}>
      {children}
    </div>
  </TabsContext.Provider>
)

interface TabsListProps {
  className?: string;
  children: React.ReactNode;
}

const TabsList: React.FC<TabsListProps> = ({ className, children }) => {
  const context = React.useContext(TabsContext);
  
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        className
      )}
    >
      {React.Children.map(children, child => 
        React.isValidElement(child) 
          ? React.cloneElement(child, { ...context } as any)
          : child
      )}
    </div>
  )
}

interface TabsTriggerProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

const TabsTrigger: React.FC<TabsTriggerProps & { 
  value: string; 
  onValueChange?: (value: string) => void; 
}> = ({ 
  value: triggerValue, 
  className, 
  children, 
  onValueChange
}) => {
  const context = React.useContext(TabsContext);
  const currentValue = context?.value;
  const handleChange = context?.onValueChange || onValueChange;
  
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        currentValue === triggerValue 
          ? "bg-background text-foreground shadow-sm" 
          : "",
        className
      )}
      onClick={() => handleChange?.(triggerValue)}
    >
      {children}
    </button>
  )
}

interface TabsContentProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

const TabsContent: React.FC<TabsContentProps> = ({ 
  value: contentValue, 
  className, 
  children
}) => {
  const context = React.useContext(TabsContext);
  const currentValue = context?.value;
  
  if (currentValue !== contentValue) return null;
  
  return (
    <div
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
    >
      {children}
    </div>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
