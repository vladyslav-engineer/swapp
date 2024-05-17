import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Character } from 'app/features/characters';

export const useFetchCharacter = (url: string) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const request = useCallback(async () => {
    try {
      const res = await axios.get<Character>(url);

      if (res.status !== 200) {
        setError(true);
        return;
      }

      setError(false);
      setCharacter(res.data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [url]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    void request();
  }, [request]);

  useEffect(() => {
    void request();
  }, [request]);

  return { character, loading, error, refreshing, onRefresh };
};
