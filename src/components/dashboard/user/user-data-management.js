import { useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import { useRouter } from 'next/router';
import toast from "react-hot-toast";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { userApi } from '../../../api/users-api';


export const UserDataManagement = (props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const customer = props.customer;

  const deleteUser = async() => {
    setLoading(true);
    try {
      // NOTE: Make API request
      // await wait(500);
      const data = await userApi.deleteUser(customer.id);
      if (data.status === 200) {
        setOpen(false)
        toast.success('User  has been deleted!');
        router.back();
      }
      
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
      setOpen(false)
      
    }
    setLoading(false);
  }

  // const handleDeleteUser = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/authService/delete-user`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "Application/json",
  //           "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
  //         },
  //         body: JSON.stringify({ id: props.id }),
  //       }
  //     );
  //     const data = await response.json();
  //     if (data && data.status === 200) {
  //       toast.success("Otyooo, user has been deleted", { duration: 9000 });
  //       router.push('/dashboard/users');
  //     }
  //   } catch (error) {
  //     toast.error("Arrrgh, could not delete user, please try again", { duration: 9000 });
  //     console.log(error);
  //   }
  //   setLoading(false);
  // };

  return (
    <Card {...props}>
      <CardHeader title="Data Management" />
      <Divider />
      <CardContent>
        <Button color="error" variant="outlined" onClick={deleteUser} disabled={loading}>
          { loading ? "Deleting" : "Delete" }
        </Button>
        <Box sx={{ mt: 1 }}>
          <Typography color="textSecondary" variant="body2">
            Remove this user&apos;s chart if he requested that, if not please be
            aware that what has been deleted can never brought back
          </Typography>
        </Box>
      </CardContent>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete User?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete user:  {customer.firstname + ' '+ customer.lastname} <br/> WARNING: Account setting for the user will be deleted!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Disagree</Button>
          <Button onClick={deleteUser} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};
