import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function Animations() {
  return (
      <Skeleton animation="wave" style={{ height: '60px', width: '150%', margin: '-10px 5px' }}/>
  );
}