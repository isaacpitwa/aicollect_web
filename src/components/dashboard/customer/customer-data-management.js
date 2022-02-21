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

export const CustomerDataManagement = (props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDeleteUser = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/authService/delete-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
          },
          body: JSON.stringify({ id: props.id }),
        }
      );
      const data = await response.json();
      if (data && data.status === 200) {
        toast.success("Otyooo, user has been deleted", { duration: 9000 });
        router.push('/dashboard/customers');
      }
    } catch (error) {
      toast.error("Arrrgh, could not delete user, please try again", { duration: 9000 });
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Card {...props}>
      <CardHeader title="Data Management" />
      <Divider />
      <CardContent>
        <Button color="error" variant="outlined" onClick={handleDeleteUser} disabled={loading}>
          { loading ? "Deleting" : "Delete" }
        </Button>
        <Box sx={{ mt: 1 }}>
          <Typography color="textSecondary" variant="body2">
            Remove this user&apos;s chart if he requested that, if not please be
            aware that what has been deleted can never brought back
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
