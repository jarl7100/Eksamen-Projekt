import React from 'react';
import {Box} from '@mui/material';
import homePageImage from '../images/Tech Tech Website in Blue Cyan White Classy Neons Style (2).png'

export default function Home() {
    return (
        <Box
        component="img"
        sx={{
          height: '100%',
          width: '100%',
        }}
        src={homePageImage}
      />
    )
}
