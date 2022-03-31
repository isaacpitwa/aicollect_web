import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

const variants = ['h1', 'h3', 'body1', 'caption'];

function TypographyDemo(props) {
  const { loading = false } = props;

  return (
    <div>
      {variants.map((variant) => (
        <Typography
          component="div"
          key={variant}
          variant={variant}
        >
          {loading ? <Skeleton animation="wave" /> : variant}
        </Typography>
      ))}
    </div>
  );
}

TypographyDemo.propTypes = {
  loading: PropTypes.bool,
};

export default function FormLoader() {
  return (
    <Grid
      item
      xs={12}
      style={{ padding: '2%' }}
    >
        <TypographyDemo loading />
    </Grid>
  );
}