import {
  FormControl,
  Grid,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const TaskChooseQuestionaire = ({ open, handleClose }) => {
  return (
    <form action="">
      <Grid container spacing={3} mt={2}>
        <Grid item md={12} xs={12}>
          <FormControl marginTop={3} fullWidth>
            <FormLabel>Choose Questionaire</FormLabel>
            <RadioGroup defaultValue="inspector">
              <FormControlLabel
                value="inspector"
                control={<Radio />}
                label="Questionaire 1"
              />
              {/* <Typography variant="caption" mb={4}>
                Does project Inspection
              </Typography> */}
              <FormControlLabel
                value="manager"
                control={<Radio />}
                label="Questionaire 2"
              />
              {/* <Typography variant="caption">
                Manages Project Activities
              </Typography> */}
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
};

export default TaskChooseQuestionaire;



