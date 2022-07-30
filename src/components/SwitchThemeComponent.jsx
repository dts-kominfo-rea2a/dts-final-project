import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useDispatch } from 'react-redux';
import { asyncToggleTheme } from '../redux/themes/themeSlice';

const SwitchThemeComponent = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  return (
    <Box>
      <IconButton onClick={() => dispatch(asyncToggleTheme())}>
        {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  )
}

export default SwitchThemeComponent;