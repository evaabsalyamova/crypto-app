import { useCallback, useEffect, useMemo, useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  CircularProgress,
  Stack,
  Box,
  IconButton,
  FormControl,
  styled,
  ListItemIcon,
} from "@mui/material";
import SwapVertRoundedIcon from "@mui/icons-material/SwapVertRounded";
import useConversion from "../../hooks/useConversion";
import { IconNames } from "../../resources/icons";
import Icon from "./Icon";

export interface IProps {
  iconName: IconNames;
}

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

  const StyledTextField = styled(TextField)({
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none",
    },
    "& input[type=number]": {
      MozAppearance: "textfield",
    },
  });

  return (
    <Box
      component="section"
      sx={{
        width: 300,
        height: 350,
        border: "1px solid grey",
        borderRadius: 5,
      }}
    >
      <Stack sx={{ gap: 2 }}>
        <FormControl sx={{ m: 1, minWidth: 6, width: "120px" }} size="small">
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={firstFieldCurrency}
            onChange={(e) => {
              setFirstFieldCurrency(e.target.value as Currency);
            }}
          >
            <MenuItem value="bitcoin">
              <ListItemIcon>
                <Icon iconName="btc" />
                BTC
              </ListItemIcon>
            </MenuItem>
            <MenuItem value="ethereum">
              <ListItemIcon>
                <Icon iconName="eth" />
                ETH
              </ListItemIcon>
            </MenuItem>
            <MenuItem value="usd">
              <ListItemIcon>
                <Icon iconName="usdt" />
                USDT
              </ListItemIcon>
            </MenuItem>
          </Select>
        </FormControl>
        <StyledTextField
          type="number"
          value={firstFieldAmount}
          onChange={(e) => {
            // после внесения изменений в поле, необходимо пометить поле как "источник" и записать значение
            setInputField(InputField.FIRST);
            setFirstFieldAmount(Number(e.target.value));
          }}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              border: "1px solid black",
              borderRadius: 5,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "1px solid black",
            },
          }}
        />
      </Stack>
      {isLoading ? (
        <Stack alignItems="center" justifyContent="center" flex={1}>
          <CircularProgress />
        </Stack>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          sx={{
            mt: 1,
          }}
        >
          <IconButton onClick={switchSides}>
            <SwapVertRoundedIcon />
          </IconButton>
        </Box>
      )}
      <Stack sx={{ gap: 2 }}>
        <FormControl sx={{ m: 1, minWidth: 6, width: "120px" }} size="small">
          <Select
            labelId="demo-select-small-label"
            value={secondFieldCurrency}
            id="demo-select-small"
            onChange={(e) => {
              // as Currency тк мы уверены что другого value быть не может
              setSecondFieldCurrency(e.target.value as Currency);
            }}
          >
            <MenuItem value="bitcoin">
              <ListItemIcon>
                <Icon iconName="btc" />
                BTC
              </ListItemIcon>
            </MenuItem>
            <MenuItem value="ethereum">
              <ListItemIcon>
                <Icon iconName="eth" />
                ETH
              </ListItemIcon>
            </MenuItem>
            <MenuItem value="usd">
              <ListItemIcon>
                <Icon iconName="usdt" />
                USDT
              </ListItemIcon>
            </MenuItem>
          </Select>
        </FormControl>
        <StyledTextField
          type="number"
          value={secondFieldAmount}
          onChange={(e) => {
            setInputField(InputField.SECOND);
            setSecondFieldAmount(Number(e.target.value));
          }}
          sx={{
            "& .MuiFilledInput-root": {
              background: "rgb(232, 241, 250)",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "1px solid black",
              borderRadius: 5,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "1px solid black",
            },
          }}
        />
      </Stack>
    </Box>
  );
};

export default CryptoConverter;
