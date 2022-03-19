import {
  Dialog,
  Button,
  DialogContent,
  DialogTitle,
  DialogActions,
  styled,
  Card,
  CardHeader,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  IconButton,
  LinearProgress,
  Stack,
  ListItemIcon,
  colors,
} from '@mui/material';
import NextLink from 'next/link';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Icon } from '@iconify/react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { bytesToSize } from '../../../../utils/bytes-to-size';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const FileDropZone = styled('div')(({ theme }) => ({
  border: `1px dashed ${theme.palette.divider}`,
  padding: theme.spacing(6),
  outline: 'none',
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  alignItems: 'center',
  '&:hover': {
    backgroundColor: colors.grey[50],
    opacity: 0.5,
    cursor: 'pointer'
  }
}));

export default function ExcelDataImport({ open, handleClose, excelFile, setExcelFile, getRootProps, getInputProps, isDragActive, handleCreateUploadFormToDatabase }) {

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth>
      <DialogTitle title='Import Questionaire' />
      <DialogContent>
        <Card>
          <CardHeader title="Upload excel or csv files" />
          <CardContent>
            <Typography variant="caption" mb={8}>
              Please download template to compare with here. 
              <NextLink href="#" passHref download> EXCEL TEMPLATE</NextLink>
            </Typography>
            <FileDropZone {...getRootProps()}>
              <input
                {...getInputProps()}
                required />
              <div>
                <img
                  src="/undraw_add_file_gvbb.jpg"
                  style={{ width: 130 }}
                  alt="Select file" />
              </div>
              {
                isDragActive ? (
                  <Typography variant="body1">Drop Excel files here</Typography>
                ) : (<p>Drag and drop Excel file here or click to browse</p>)
              }
            </FileDropZone>
            {
              excelFile && (
                <>
                  <PerfectScrollbar>
                    <List style={{ maxHeight: 320 }}>
                      <Stack
                        direction="column"
                        spacing={1}>
                        <ListItem>
                          <ListItemIcon>
                            <Icon icon={<AttachFileIcon />} />
                          </ListItemIcon>
                          <ListItemText
                            primary={excelFile.name}
                            primaryTypographyProps={{ variant: 'h5' }}
                            secondary={bytesToSize(excelFile.size)} />
                          <Tooltip title="Delete">
                            <IconButton
                              edge="end"
                              onClick={() => setExcelFile(null)}>
                              <Icon icon={DeleteForeverIcon} />
                            </IconButton>
                          </Tooltip>
                        </ListItem>
                        <LinearProgress
                          variant='determinate'
                          value={100}
                          style={{ marginTop: '5px', backgroundColor: 'red' }}
                          title="Progress" />
                      </Stack>
                    </List>
                  </PerfectScrollbar>
                </>
              )
            }
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={handleCreateUploadFormToDatabase}
        >
          Upload
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}