import { Stack, Grid, Card, Box, Typography } from '@mui/material';

export default function Statistics() {
  return (
    <Stack direction="column" mb={4}>
      <Grid container spacing={3} display="flex" flexDirection="row">
        <Grid item md={6} sm={6} xs={12}>
          <Card elevation={10}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexGrow: 1,
                justifyContent: "start",
                px: 3,
                py: 2,
              }}
            >
              <div>
                <Typography variant="body2">Coffee</Typography>
                <Typography sx={{ mt: 1 }} color="textSecondary" variant="h8">
                  Main Crop
                </Typography>
              </div>
            </Box>
          </Card>
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <Card elevation={10}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "start",
                px: 3,
                py: 2,
                width: 400,
              }}
            >
              <div>
                <Typography variant="body2">2</Typography>
                <Typography sx={{ mt: 1 }} color="textSecondary" variant="h8">
                  No. of Plots
                </Typography>
              </div>
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} display="flex" mt={3} flexDirection="row">
        <Grid item md={6} sm={6} xs={12}>
          <Card elevation={10}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexGrow: 1,
                justifyContent: "start",
                px: 3,
                py: 2,
                width: 800,
              }}
            >
              <div>
                <Typography variant="body2">2 Accres</Typography>
                <Typography sx={{ mt: 1 }} color="textSecondary" variant="h8">
                  Total Crop Area
                </Typography>
              </div>
              {/* <LineChart /> */}
            </Box>
          </Card>
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <Card elevation={10}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "start",
                px: 3,
                py: 2,
                width: 600,
              }}
            >
              <div>
                <Typography variant="body2">100 kg</Typography>
                <Typography sx={{ mt: 1 }} color="textSecondary" variant="h8">
                  Yield Estimation
                </Typography>
              </div>
              {/* <LineChart /> */}
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3} display="flex" mt={3} flexDirection="row">
        <Grid item md={6} sm={6} xs={12}>
          <Card elevation={10}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexGrow: 1,
                justifyContent: "start",
                px: 3,
                py: 2,
                width: 800,
              }}
            >
              <div>
                <Typography variant="body2">4</Typography>
                <Typography sx={{ mt: 1 }} color="textSecondary" variant="h8">
                  No. of Training
                </Typography>
              </div>
              {/* <LineChart /> */}
            </Box>
          </Card>
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <Card elevation={10}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "start",
                px: 3,
                py: 2,
                width: 600,
              }}
            >
              <div>
                <Typography variant="body2">10</Typography>
                <Typography sx={{ mt: 1 }} color="textSecondary" variant="h8">
                  Trainings Pending
                </Typography>
              </div>
              {/* <LineChart /> */}
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3} display="flex" mt={3} flexDirection="row">
        <Grid item md={12} sm={12} xs={12}>
          <Card elevation={10}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexGrow: 1,
                justifyContent: "start",
                px: 3,
                py: 2,
                width: 800,
              }}
            >
              <div>
                <Typography variant="body2">1</Typography>
                <Typography sx={{ mt: 1 }} color="textSecondary" variant="h8">
                  Plot Visited out of 2
                </Typography>
              </div>
              {/* <LineChart /> */}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}
