import { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios, { AxiosRequestConfig } from 'axios';
import { Screens } from 'app/shared/lib';
import {
  PaginatedResponse,
  ScreenNavigationProp,
  ScreenRouteProp,
} from './types';

type UseInfiniteScrollParams = {
  url: string;
  config?: AxiosRequestConfig;
};

export const useInfiniteScroll = <T>({
  url,
  config,
}: UseInfiniteScrollParams) => {
  const [data, setData] = useState<PaginatedResponse<T> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const request = useCallback(
    async (internalUrl?: string) => {
      try {
        const res = await axios.get<PaginatedResponse<T>>(
          internalUrl || url,
          config,
        );

        if (res.status !== 200) {
          setError(true);
          return;
        }

        if (!res.data.previous) {
          setData(res.data);
        } else {
          setData((prev) => ({
            ...res.data,
            results: [...(prev?.results || []), ...res.data.results],
          }));
        }

        setError(false);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [url, config],
  );

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    void request(url);
  }, [request, url]);

  const handleEndReached = useCallback(() => {
    if (data?.next) {
      void request(data.next);
    }
  }, [request, data?.next]);

  useEffect(() => {
    void request();
  }, [request]);

  return {
    data: data?.results || [],
    handleRefresh,
    handleEndReached,
    loading,
    error,
    refreshing,
  };
};

export const useAppNavigation = <T extends Screens>() => {
  return useNavigation() as ScreenNavigationProp<T>;
};

export const useAppRoute = <T extends Screens>() => {
  return useRoute() as ScreenRouteProp<T>;
};
