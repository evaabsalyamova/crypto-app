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
  convertedAmount: number;
}

const API_KEY = "CG-vXqMf3GPnCRXSrD2VQUPV1Dt";

/**
 * валидные пары по используемому API
 */
const validPairs = ["bitcoin-ethereum", "bitcoin-usd", "ethereum-usd"];

/**
 * функция которая позволяет перевести пару источник - таргет
 * в валидный для API формат.
 * проверяет валидная ли пара изначально, если нет то переворачивает её
 */
const getValidatedPairIds = (
  sourceCurrency: string,
  targetCurrency: string
): { sourceId: string; targetId: string } => {
  const pair = `${sourceCurrency}-${targetCurrency}`;

  if (validPairs.includes(pair)) {
    return {
      sourceId: sourceCurrency,
      // когда "ethereum" на втором месте его всегда нужно заменять на "eth"
      targetId: targetCurrency === "ethereum" ? "eth" : targetCurrency,
    };
  }

  return {
    sourceId: targetCurrency,
    // когда "ethereum" на втором месте его всегда нужно заменять на "eth"
    targetId: sourceCurrency === "ethereum" ? "eth" : sourceCurrency,
  };
};

/**
 * хук который непосредственно производит конвертацию, принимая: источник,конечную валюту,
 * колличество монет источника,флаг enabled сообщающий о необходимости делать запрос
 * и возращающий колличество монет в конечной валюте. пример -  передаём usd,rub,10,true вернёт 950
 */
const useConversion = ({
  sourceCurrency,
  targetCurrency,
  amount,
  enabled,
}: IParams): IResult => {
  const [convertedAmount, setConvertedAmount] = useState<number>(amount);

  // перевод абревеатуры переданных валют в подходящий для API формат
  const { sourceId, targetId } = getValidatedPairIds(
    sourceCurrency,
    targetCurrency
  );

  /**
   * тк в используемом API у нас ограниченный пул пар для запроса цены, мы можем запросить
   * например, только пару "bitcoin-usd", а обратную не можем ("usd-bitcoin"),
   * нам необходимо понимать когда запрашиваемая пара была "перевёрнута" чтобы сделать верный рассчёт
   */
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
        // получаем цену
        const rate = data[sourceId][targetId];

        // в случае если пара была перевёрнута, то и цену так же переворачиваем
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
    convertedAmount,
  };
};

export default useConversion;
