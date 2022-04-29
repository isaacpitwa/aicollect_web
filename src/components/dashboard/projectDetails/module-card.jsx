import NextLink from 'next/link';
import { Grid, Card, Box, IconButton, Typography } from '@mui/material';
import { GroupAddRounded, FactCheck } from '@mui/icons-material';

export const ModuleCard = ({ projectId, module }) => {
  return (
    <Grid item md={3} sm={6} xs={12} style={{ cursor: 'pointer' }}>
      <NextLink href={`/dashboard/projects/${projectId}/questionaire/?module=${module.name}`} passHref>
        <Card elevation={8}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "start",
              px: 3,
              py: 2
            }}
          >
            <IconButton size="large" style={{ borderRadius: "50%", backgroundColor: "orange", marginRight: '8px', color: 'white' }}>
              {module.type === 'registration' ? <GroupAddRounded /> : <FactCheck />}
            </IconButton>
            <div>
              <Typography variant="body2">0</Typography>
              <Typography
                sx={{ mt: 1 }}
                color="textSecondary"
                variant="h8"
              >
                {module.name}
              </Typography>
            </div>
            {/* <LineChart /> */}
          </Box>
        </Card>
      </NextLink>
    </Grid>
  )
};
