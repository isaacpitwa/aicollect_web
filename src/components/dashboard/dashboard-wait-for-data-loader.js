import { Box, Stack, Skeleton } from "@mui/material";

export const LoadingSkeleton = () => {
  return (
    <Box
      sx={{
        backgroundColor: "neutral.100",
        px: 2,
        py: 0.5,
      }}
    >
      <Stack spacing={1}>
        <Skeleton variant="text" />
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={210} height={118} />
      </Stack>
    </Box>
  );
};
