import { useCallback, useEffect, useMemo, useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  CircularProgress,
  Stack,
  Box,
  IconButton,
} from "@mui/material";
import SwapVertRoundedIcon from "@mui/icons-material/SwapVertRounded";
import useConversion from "../../hooks/useConversion";

enum InputField {
  FIRST,
  SECOND,
}

/**
 * Доступные типы валют
 */
type Currency = "ethereum" | "bitcoin" | "usd";

const CryptoConverter = () => {
  // наименование валюты первого поля
  const [firstFieldCurrency, setFirstFieldCurrency] =
    useState<Currency>("ethereum");
  // число вписанное в первое поле
  const [firstFieldAmount, setFirstFieldAmount] = useState<number>(0);
  const [secondFieldCurrency, setSecondFieldCurrency] =
    useState<Currency>("bitcoin");
  const [secondFieldAmount, setSecondFieldAmount] = useState<number>(0);

  // поле выбранное как "источник" для конвертации
  const [inputField, setInputField] = useState<InputField>(InputField.FIRST);

  // флаг определящий необходимо ли делать запрос (валюта полей совпадает - не нужно)
  const enabledToRequest = useMemo(
    () => firstFieldCurrency !== secondFieldCurrency,
    [firstFieldCurrency, secondFieldCurrency]
  );

  const { isLoading, error, convertedAmount } = useConversion({
    sourceCurrency: firstFieldCurrency,
    targetCurrency: secondFieldCurrency,
    amount:
      inputField === InputField.FIRST ? firstFieldAmount : secondFieldAmount,
    enabled: enabledToRequest,
  });

  // эффект в котором следим за результатом конвертации приходящем из хука "useConversion"
  // определяем какое поле являлось "источником", чтобы вписать результат в противоположное
  useEffect(() => {
    if (!isLoading && convertedAmount) {
      // если источником было второе поле, то результат вписываем в первое поле
      if (inputField === InputField.SECOND) {
        setFirstFieldAmount(
          enabledToRequest ? convertedAmount : secondFieldAmount
        );
        return;
      }

      setSecondFieldAmount(
        enabledToRequest ? convertedAmount : firstFieldAmount
      );
    }
  }, [
    firstFieldAmount,
    secondFieldAmount,
    convertedAmount,
    inputField,
    isLoading,
    firstFieldCurrency,
    secondFieldCurrency,
    enabledToRequest,
  ]);

  // функция "меняющая" поля и их значения местами
  const switchSides = useCallback(() => {
    setFirstFieldAmount(secondFieldAmount);
    setSecondFieldAmount(firstFieldAmount);
    setFirstFieldCurrency(secondFieldCurrency);
    setSecondFieldCurrency(firstFieldCurrency);
  }, [
    firstFieldAmount,
    secondFieldAmount,
    firstFieldCurrency,
    secondFieldCurrency,
  ]);

  if (error) {
    return <>{error}</>;
  }

  return (
    <Box
      component="section"
      sx={{
        width: 300,
        height: 400,
        m: "auto",
        mt: 10,
        border: "1px solid grey",
        borderRadius: 5,
      }}
    >
      <Stack sx={{ gap: 2 }}>
        <Select
          value={firstFieldCurrency}
          onChange={(e) => {
            setFirstFieldCurrency(e.target.value as Currency);
          }}
        >
          <MenuItem value="bitcoin">BTC</MenuItem>
          <MenuItem value="ethereum">ETH</MenuItem>
          <MenuItem value="usd">USDT</MenuItem>
        </Select>
        <TextField
          type="number"
          value={firstFieldAmount}
          onChange={(e) => {
            // после внесения изменений в поле, необходимо пометить поле как "источник" и записать значение
            setInputField(InputField.FIRST);
            setFirstFieldAmount(Number(e.target.value));
          }}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              border: "1px solid grey",
              borderRadius: 5,
            },
          }}
        />
      </Stack>
      {isLoading ? (
        <Stack alignItems="center" justifyContent="center" flex={1}>
          <CircularProgress />
        </Stack>
      ) : (
        <IconButton onClick={switchSides}>
          <SwapVertRoundedIcon />
        </IconButton>
      )}

      <Stack sx={{ gap: 2 }}>
        <Select
          value={secondFieldCurrency}
          onChange={(e) => {
            // as Currency тк мы уверены что другого value быть не может
            setSecondFieldCurrency(e.target.value as Currency);
          }}
        >
          <MenuItem value="bitcoin">BTC</MenuItem>
          <MenuItem value="ethereum">ETH</MenuItem>
          <MenuItem value="usd">USDT</MenuItem>
        </Select>
        <TextField
          type="number"
          variant="outlined"
          value={secondFieldAmount}
          onChange={(e) => {
            setInputField(InputField.SECOND);
            setSecondFieldAmount(Number(e.target.value));
          }}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              border: "1px solid grey",
              borderRadius: 5,
            },
          }}
        />
      </Stack>
    </Box>
  );
};

export default CryptoConverter;
