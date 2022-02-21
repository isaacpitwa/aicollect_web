import { useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Box, Divider, Typography, Grid } from "@mui/material";

import { GuestGuard } from "../../components/authentication/guest-guard";
import { JWTLogin } from "../../components/authentication/jwt-login";
import { useAuth } from "../../hooks/use-auth";
import { gtm } from "../../lib/gtm";
import { CompleteUserProfile } from "../../components/authentication/complete-profile";

const CompleteProfile = () => {
  const router = useRouter();
  const { platform } = useAuth();
  const { disableGuard } = router.query;

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Complete Profile | AI Collect</title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Grid container>
          <Grid
            item
            md={6}
            sm={12}
            style={{ backgroundImage: 'url("/login.jpg")' }}
          ></Grid>
          <Grid
            item
            md={6}
            sm={12}
            sx={{ p: 30 }}
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <NextLink
                href="/"
                passHref>
                <a>
                  <img
                    src="/logo.png"
                    alt="aicollect"
                    width={40}
                    height={40} />
                </a>
              </NextLink>
              <Typography variant="h4">Complete Profile</Typography>
              {/* <Typography
                color="textSecondary"
                sx={{ mt: 2 }}
                variant="body2">
                Don&#39;t have an Account? Register Here.
              </Typography> */}
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3,
              }}
            >
              <CompleteUserProfile />
            </Box>

            <Divider sx={{ my: 3 }} />

            

          </Grid>
        </Grid>
      </Box>
    </>
  );
};

CompleteProfile.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default CompleteProfile;
