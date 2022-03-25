import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Stepper,
  StepButton,
  Step,
} from "@mui/material";
import TaskInformationForm from "./project-task-information-form";
import ProjectTaskUploader from "./project-task-uploader";
import TaskChooseQuestionaire from "./project-task-choose-questionaire";
import { TaskProvider } from '../../../../contexts/task-creation-context';
import { useTask } from "../../../../hooks/task-upload";


const ProjectTaskManager = ({ open, handleClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const { taskType } = useTask();

  const stepperMenu = () => {
    const steps = [];
    
    if (taskType === "Registration") {
      steps.push("Task Information");
      steps.push("Add Team Members");
      steps.push("Assign Questionaire");
    } else {
      steps.push("Task Information");
      steps.push("Upload Schedule");
      steps.push("Assign Questionaire");
    }
    return steps;
  }
  const steps = stepperMenu();
  console.log(taskType)
  
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  return (
    <TaskProvider>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>Add Project Task</DialogTitle>
        <Card>
          <CardContent>
            <DialogContent>
              <Box sx={{ width: "100%" }}>
                <Stepper nonLinear activeStep={activeStep}>
                  {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                      <StepButton color="inherit" onClick={handleStep(index)}>
                        {label}
                      </StepButton>
                    </Step>
                  ))}
                </Stepper>
                <div>
                  {allStepsCompleted() ? (
                    <>
                      <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                      </Typography>
                      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button onClick={handleReset}>Reset</Button>
                      </Box>
                    </>
                  ) : (
                    <>
                      {
                        activeStep === 0 && <TaskInformationForm />
                      }
                      {
                        activeStep === 1 && <ProjectTaskUploader />
                      }
                      {
                        activeStep === 2 && <TaskChooseQuestionaire />
                      }
                      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Button
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Back
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button onClick={handleNext} sx={{ mr: 1 }}>
                          Next
                        </Button>
                        {activeStep !== steps.length &&
                          (completed[activeStep] ? (
                            <Typography
                              variant="caption"
                              sx={{ display: "inline-block" }}
                            >
                              Step {activeStep + 1} already completed
                            </Typography>
                          ) : (
                            <Button onClick={handleComplete}>
                              {completedSteps() === totalSteps() - 1
                                ? "Finish"
                                : "Complete Step"}
                            </Button>
                          ))}
                      </Box>
                    </>
                  )}
                </div>
              </Box>
            </DialogContent>
          </CardContent>
        </Card>
      </Dialog>
    </TaskProvider>
  );
};

export default ProjectTaskManager;
