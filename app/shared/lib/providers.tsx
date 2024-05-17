import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import { FavoriteItemsCollections } from 'app/shared/lib';

type FavoriteItems = {
  items: Record<FavoriteItemsCollections, string[]>;
  toggleItem: (key: FavoriteItemsCollections, value: string) => void;
  resetCollection: (key: FavoriteItemsCollections) => void;
  checkIsFavorite: (key: FavoriteItemsCollections, value: string) => boolean;
};

const FavoriteItemsContext = createContext<FavoriteItems | null>(null);

export const FavoriteItemsProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<
    Record<FavoriteItemsCollections, string[]>
  >({ characters: [] });

  const toggleItem = useCallback(
    (key: FavoriteItemsCollections, value: string) => {
      setItems((prev) => {
        const index = prev[key].indexOf(value);

        if (index === -1) {
          return { ...prev, [key]: [...prev[key], value] };
        } else {
          return {
            ...prev,
            [key]: prev[key].filter((item) => item !== value),
          };
        }
      });
    },
    [],
  );

  const resetCollection = useCallback((key: FavoriteItemsCollections) => {
    setItems((prev) => ({ ...prev, [key]: [] }));
  }, []);

  const checkIsFavorite = useCallback(
    (key: FavoriteItemsCollections, value: string) =>
      items[key].includes(value),
    [items],
  );

  const value = {
    items,
    toggleItem,
    resetCollection,
    checkIsFavorite,
  };

  return (
    <FavoriteItemsContext.Provider value={value}>
      {children}
    </FavoriteItemsContext.Provider>
  );
};

export const useFavoriteItemsContext = () => {
  const context = useContext(FavoriteItemsContext);

  if (!context) {
    throw new Error(
      'useFavoriteItems must be used within a FavoriteItemsProvider',
    );
  }

  return context;
};
