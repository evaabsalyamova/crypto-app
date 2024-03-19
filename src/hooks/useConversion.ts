import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";


interface IParams {
  sourceCurrency: string;
  targetCurrency: string;
  amount: number;
  enabled: boolean;
}

interface IResult {
  isLoading: boolean;
  error: null | string;
  convertedAmount: string;
}

const API_KEY = "CG-vXqMf3GPnCRXSrD2VQUPV1Dt";

const validPairs = ["bitcoin-ethereum", "bitcoin-usd", "ethereum-usd"];

const getValidatedPairIds = (
  sourceCurrency: string,
  targetCurrency: string
): { sourceId: string; targetId: string } => {
  const pair = `${sourceCurrency}-${targetCurrency}`;

  if (validPairs.includes(pair)) {
    return {
      sourceId: sourceCurrency,
      targetId: targetCurrency === "ethereum" ? "eth" : targetCurrency,
    };
  }

  return {
    sourceId: targetCurrency,
    targetId: sourceCurrency === "ethereum" ? "eth" : sourceCurrency,
  };
};

const useConversion = ({
  sourceCurrency,
  targetCurrency,
  amount,
  enabled,
}: IParams): IResult => {
  const [convertedAmount, setConvertedAmount] = useState<number>(amount);

  const { sourceId, targetId } = getValidatedPairIds(
    sourceCurrency,
    targetCurrency
  );

  const isReversePair = useMemo(
    () => sourceId !== sourceCurrency,
    [sourceCurrency, sourceId]
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFn = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${sourceId}&vs_currencies=${targetId}&x_cg_demo_api_key=${API_KEY}`,
          {
            headers: { x_cg_demo_api_key: "CG-vXqMf3GPnCRXSrD2VQUPV1Dt" },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        const data = await response.json();
        const rate = data[sourceId][targetId];

        const validatedRate = isReversePair ? 1 / rate : rate;

        setConvertedAmount(Number(amount) * validatedRate);
      } catch (err) {
        toast.error("Ошибка при конвертации");
      } finally {
        setIsLoading(false);
      }
    };

    if (enabled) {
      fetchFn();
    }
  }, [amount, enabled, isReversePair, sourceId, targetId]);

  return {
    isLoading,
    error,
    convertedAmount: convertedAmount.toString(),
  };
};

export default useConversion;
