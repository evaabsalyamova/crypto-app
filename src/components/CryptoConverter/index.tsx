import {
  Box,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import SwapVertRoundedIcon from "@mui/icons-material/SwapVertRounded";

const CryptoConverter = () => {
  const [sourceCurrency, setSourceCurrency] = useState("bitcoin");
  const [targetCurrency, setTargetCurrency] = useState("eth");
  const [amount, setAmount] = useState("0");
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
          value={sourceCurrency}
          onChange={(e) => setSourceCurrency(e.target.value)}
        >
          <MenuItem value="bitcoin">BTC</MenuItem>
          <MenuItem value="eth">ETH</MenuItem>
          <MenuItem value="usd">USDT</MenuItem>
        </Select>
        <TextField
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              border: "1px solid grey",
              borderRadius: 5,
            },
          }}
        />
      </Stack>
      <IconButton>
        <SwapVertRoundedIcon />
      </IconButton>
      <Stack sx={{ gap: 2 }}>
        <Select
          value={targetCurrency}
          onChange={(e) => setTargetCurrency(e.target.value)}
        >
          <MenuItem value="bitcoin">BTC</MenuItem>
          <MenuItem value="eth">ETH</MenuItem>
          <MenuItem value="usd">USDT</MenuItem>
        </Select>
        <TextField
          type="number"
          variant="outlined"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
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
