import PropTypes from 'prop-types';
import { Button, Card, CardActions, CardHeader, Divider, useMediaQuery } from '@mui/material';
import { PropertyList } from '../../property-list';
import { PropertyListItem } from '../../property-list-item';

export const UserBasicDetails = (props) => {
  const { firstname, lastname, roles, address1, address2, country, email, isVerified, phone, state, ...other } = props;
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const align = mdUp ? 'horizontal' : 'vertical';

  return (
    <Card {...other}>
      <CardHeader title="Basic Details" />
      <Divider />
      <PropertyList>
        <PropertyListItem
          align={align}
          divider
          label="First Name"
          value={firstname}
        />
        <PropertyListItem
          align={align}
          divider
          label="Last Name"
          value={lastname}
        />
        <PropertyListItem
          align={align}
          divider
          label="Email"
          value={email}
        />
        <PropertyListItem
          align={align}
          divider
          label="Phone"
          value={phone}
        />
        <PropertyListItem
          align={align}
          divider
          label="Role"
          value={roles}
        />
      </PropertyList>
      <CardActions
        sx={{
          flexWrap: 'wrap',
          px: 3,
          py: 2,
          m: -1
        }}
      >
        <Button
          sx={{ m: 1 }}
          variant="outlined"
        >
          Reset &amp; Send Password
        </Button>
        {/* <Button sx={{ m: 1 }}>
          Login as Customer
        </Button> */}
      </CardActions>
    </Card>
  );
};

UserBasicDetails.propTypes = {
  address1: PropTypes.string,
  address2: PropTypes.string,
  country: PropTypes.string,
  email: PropTypes.string.isRequired,
  isVerified: PropTypes.bool.isRequired,
  phone: PropTypes.string,
  state: PropTypes.string
};
