import { useState, useEffect } from 'react';

// 環境変数 (.env) からGASのAPI URLを取得します。
// 設定されていない場合はエラーを防ぐためにフォールバックを持たせます。
const GAS_API_URL = import.meta.env.VITE_GAS_API_URL || 'https://script.google.com/macros/s/YOUR_URL/exec';

export function useApiData<T>(type: string, initialData: T | null = null) {
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    
    // 実際のGAS APIへリクエストを送信
    fetch(`${GAS_API_URL}?type=${type}`)
      .then(res => {
        if (!res.ok) throw new Error('ネットワークエラーが発生しました');
        return res.json();
      })
      .then(resData => {
        if (mounted) {
          // GASがエラーを返した場合（{error: "..."}）のクラッシュ対策
          if (resData && resData.error) {
            setError(`GAS側のエラー: ${resData.error}`);
            setData(null);
          } else {
            setData(resData as T);
            setError(null);
          }
        }
      })
      .catch(err => {
        if (mounted) setError(err.message);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, [type]);

  return { data, loading, error };
}

export const useSignals = () => useApiData('summary');
export const useBubble = () => useApiData('bubble', []);
export const useNetwork = () => useApiData('network', { nodes: [], links: [] });
export const useOpportunities = () => useApiData('opportunities', []);
export const useProposals = () => useApiData('proposals', []);
