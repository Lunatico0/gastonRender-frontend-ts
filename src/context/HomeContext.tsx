import { createContext, useState, useEffect, ReactNode } from "react";
import api from "../api/api";

interface ContactInfo {
  email: string;
  phone: string;
  socialMedia: { name: string; url: string }[];
}

interface HomeConfigType {
  title: string;
  description: string;
  backgroundImage: string;
  contactInfo: ContactInfo;
  updateHome: (data: Partial<HomeConfigType>) => Promise<void>;
}

const HomeContext = createContext<HomeConfigType | null>(null);

export const HomeProvider = ({ children }: { children: ReactNode }) => {
  const [homeConfig, setHomeConfig] = useState<HomeConfigType | null>(null);

  useEffect(() => {
    fetchHomeConfig();
  }, []);

  const fetchHomeConfig = async () => {
    try {
      const { data } = await api.get("/home");
      setHomeConfig(data);
    } catch (error) {
      console.error("Error obteniendo configuración del Home:", error);
    }
  };

  const updateHome = async (data: Partial<HomeConfigType>) => {
    try {
      const response = await api.put("/home", data);
      setHomeConfig(response.data.config);
    } catch (error) {
      console.error("Error actualizando Home:", error);
    }
  };

  return (
    <HomeContext.Provider value={{ ...homeConfig!, updateHome }}>
      {children}
    </HomeContext.Provider>
  );
};

export default HomeContext;
