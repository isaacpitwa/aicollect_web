import { useState, useMemo } from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    TextField,
    Typography,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Select,
    MenuItem,
    InputLabel,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { UserCircle as UserCircleIcon } from "../../../icons/user-circle";
import countryList from 'react-select-country-list'


export const OrganisationGeneralSettings = (props) => {
    const { user } = props;
    const [expanded, setExpanded] = useState(false);
    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])

    const languages = [{
        label: 'English',
        value: 'en'
    }]

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box sx={{ mt: 4 }} {...props}>
            <Card>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item md={8} xs={12}>
                            <Box
                                sx={{
                                    alignItems: "center",
                                    display: "flex",
                                }}
                            >
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    mt: 3,
                                    alignItems: "center",
                                }}
                            >
                                <TextField
                                    defaultValue={user.Profile?.companyName}
                                    label="Name"
                                    size="small"
                                    sx={{
                                        flexGrow: 1,
                                        mr: 3,
                                    }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    mt: 3,
                                    alignItems: "center",
                                }}
                            >
                                <TextField
                                    defaultValue={''}
                                    label="Description"
                                    multiline
                                    rows={4}
                                    size="small"
                                    sx={{
                                        flexGrow: 1,
                                        mr: 3,
                                    }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    mt: 3,
                                    alignItems: "center",
                                }}
                            >
                                <TextField
                                    defaultValue={''}
                                    label="Address"
                                    size="small"
                                    sx={{
                                        flexGrow: 1,
                                        mr: 3,
                                    }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    mt: 3,
                                    alignItems: "flex-start",
                                    flexDirection: "column",
                                }}
                            >
                                 <InputLabel id="country-label" sx={{ mb: 1,}}>Country</InputLabel>
                                <Select
                                    labelId="country-label"
                                    id="demo-simple-select"
                                    value={'Uganda'}
                                    label="Age"
                                    onChange={handleChange}
                                    style={{ width: "96%" }}
                                >
                                    {options.map((country) => (<MenuItem value={country.label} key={country.label}>{country.label}</MenuItem>))}
                                </Select>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    mt: 3,
                                   
                                    alignItems: "flex-start",
                                    flexDirection: "column",
                                }}
                            >  <InputLabel id="demo-simple-select-label" sx={{ mb: 1,}}>Default Language</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={'English'}
                                    label="Age"
                                    onChange={handleChange}
                                    style={{ width: "96%" }}
                                >
                                    {languages.map((language) => (<MenuItem value={language.label} key={language.label}>{language.label}</MenuItem>))}
                                </Select>
                            </Box>
                            <Button variant="contained" style={styles.saveBtn}>SAVE CHANGES</Button>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <Typography variant="h9" >Organisation Logo</Typography>
                            <Box style={{display:'flex', justifyContent:'center'}}>
                                <Avatar
                                    src={user.Profile?.profileImage ? user.Profile.profileImage : "N/A"}
                                    sx={{
                                        height: 180,
                                        mr: 2,
                                        width: 180,
                                        mt: '20px',
                                    }}
                                >
                                    <UserCircleIcon fontSize="small" />
                                </Avatar>
                            </Box>
                            <Button variant="contained" style={styles.uploadBtn}>Change Logo</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

const styles = {
    uploadBtn: {
        width: "100%",
        marginTop: "21px",
    },
    saveBtn: {
        width: "96%",
        marginTop: "21px",
    }
}