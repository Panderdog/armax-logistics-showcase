import { createContext, useContext, useState, ReactNode } from "react";
import ApplicationModal from "@/components/ApplicationModal";

interface ApplicationModalContextType {
  openApplicationModal: () => void;
  closeApplicationModal: () => void;
  isOpen: boolean;
}

const ApplicationModalContext = createContext<ApplicationModalContextType | undefined>(undefined);

export const useApplicationModal = () => {
  const context = useContext(ApplicationModalContext);
  if (!context) {
    throw new Error("useApplicationModal must be used within ApplicationModalProvider");
  }
  return context;
};

interface ApplicationModalProviderProps {
  children: ReactNode;
}

export const ApplicationModalProvider = ({ children }: ApplicationModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openApplicationModal = () => setIsOpen(true);
  const closeApplicationModal = () => setIsOpen(false);

  return (
    <ApplicationModalContext.Provider value={{ openApplicationModal, closeApplicationModal, isOpen }}>
      {children}
      <ApplicationModal isOpen={isOpen} onClose={closeApplicationModal} />
    </ApplicationModalContext.Provider>
  );
};

