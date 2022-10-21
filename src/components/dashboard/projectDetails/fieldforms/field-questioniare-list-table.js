import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import moment from 'moment';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { PencilAlt as PencilAltIcon } from '../../../../icons/pencil-alt';
import { Scrollbar } from '../../../scrollbar';

export const FieldFormListTable = (props) => {
  const {
    questionaires,
    questionairesCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const [selectedQuestionaires, setSelectedQuestionaires] = useState([]);
  const router = useRouter();

  // Reset selected customers when customers change
  useEffect(() => {
      if (selectedQuestionaires.length) {
        setSelectedQuestionaires([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [questionaires]);

  const handleSelectAllQuestionaires = (event) => {
    setSelectedQuestionaires(event.target.checked
      ? questionaires.map((customer) => customer.id)
      : []);
  };

  const handleSelectOneQuestionaire = (event, questioanireId) => {
    if (!selectedQuestionaires.includes(questioanireId)) {
      setSelectedQuestionaires((prevSelected) => [...prevSelected, questioanireId]);
    } else {
      setSelectedQuestionaires((prevSelected) => prevSelected.filter((id) => id !== questioanireId));
    }
  };

  const enableBulkActions = selectedQuestionaires.length > 0;
  const selectedSomeQuestionaires = selectedQuestionaires.length > 0
    && selectedQuestionaires.length < questionaires.length;
  const selectedAllQuestionaires = selectedQuestionaires.length === questionaires.length;

  return (
    <div {...other}>
      <Box
        sx={{
          backgroundColor: 'neutral.100',
          display: !enableBulkActions && 'none',
          px: 2,
          py: 0.5
        }}
      >
        <Checkbox
          checked={selectedAllQuestionaires}
          indeterminate={selectedSomeQuestionaires}
          onChange={handleSelectAllQuestionaires}
        />
        <Button
          size="small"
          sx={{ ml: 2 }}
        >
          Delete
        </Button>
        <Button
          size="small"
          sx={{ ml: 2 }}
        >
          Edit
        </Button>
      </Box>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead sx={{ visibility: enableBulkActions ? 'collapse' : 'visible' }}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAllQuestionaires}
                  indeterminate={selectedSomeQuestionaires}
                  onChange={handleSelectAllQuestionaires}
                />
              </TableCell>
              <TableCell>
                Form name
              </TableCell>
              <TableCell>
                Created
              </TableCell>
              <TableCell>
                Modified
              </TableCell>
              <TableCell>
                Version
              </TableCell>
              <TableCell>
                Status
              </TableCell>
              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questionaires.map((questionaire) => {
              const isQuestionaireSelected = selectedQuestionaires.includes(questionaire.id);

              return (
                <TableRow
                  hover
                  key={questionaire.id}
                  selected={isQuestionaireSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isQuestionaireSelected}
                      onChange={(event) => handleSelectOneQuestionaire(event, questionaire.id)}
                      value={isQuestionaireSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Box sx={{ ml: 1 }}>
                        <NextLink
                          href={`/dashboard/projects/${router.query.projectId}/form-fields/${questionaire._id}`}
                          passHref
                        >
                          <Link
                            color="inherit"
                            variant="subtitle2"
                          >
                            {questionaire.name}
                          </Link>
                        </NextLink>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {moment(questionaire.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    {moment(questionaire.updatedAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="success.main"
                      variant="subtitle2"
                    >
                      {`v${questionaire.version}`}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="success.main"
                      variant="subtitle2"
                    >
                      {questionaire.status ? 'Active' : 'Not Active'}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <NextLink
                      href={`/dashboard/projects/${router.query.projectId}/form-fields/${questionaire._id}/form`}
                      passHref
                    >
                      <IconButton component="a">
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                    <NextLink
                      href={`/dashboard/projects/${router.query.projectId}/form-fields/${questionaire._id}`}
                      passHref
                    >
                      <IconButton component="a">
                        <RemoveRedEyeIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                    <NextLink
                      href={`/dashboard/projects/${router.query.projectId}/form-fields/${questionaire._id}`}
                      passHref
                    >
                      <IconButton component="a">
                        <SavedSearchIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                    <NextLink
                      href={`/dashboard/projects/${router.query.projectId}/form-fields/${questionaire._id}`}
                      passHref
                    >
                      <IconButton component="a">
                        <DeleteSweepIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={questionairesCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

FieldFormListTable.propTypes = {
  questionaires: PropTypes.array.isRequired,
  questionairesCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};