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
        <Skeleton variant="rectangular" animation="pulse" width={1600} height={40} />
        <Skeleton variant="rectangular" animation="pulse" width={1600} height={40} />
        <Skeleton variant="rectangular" animation="pulse" width={1600}  height={40} />
      </Stack>
    </Box>
  );
};
