import {
    makeStyles
} from '@mui/styles';

const formStyles = makeStyles({
    form: {
        padding: '1%',
    },
    sectionLabel: {
        width: '100%',
        color: '#5048E5',
        fontWeight: '400',
        height: '35px',
        borderBottom: '2px #5048E5 solid',
        marginBottom: '5px',
    },
    section: {
        width: '100%',
        border: '1px #DDDDDD dotted',
        minHeight: '50px',
        padding: '10px 1%',
        paddingTop: '5px',
        margin: '5px 0px',
        cursor: 'move',
        color: '#5F768A',
        fontSize: '12px',
        '&:hover': {
            border: '1px #5048E5 dotted',
        },
        '&:focus': {
            border: '1px #8BC34A dotted',
        }
    },
    section2: {
        border: 'None',
        minHeight: '50px',
        padding: '5px 0px',
        paddingTop: '20px',
        margin: '5px 0px',
        color: '#5F768A',
        fontSize: '12px',
    },
    sectionFields: {
        width: '100%',
        border: '1px #DDDDDD dotted',
        paddingTop: '20px',
        margin: '5px 0px',
        cursor: 'move',
        color: '#5F768A',
        fontSize: '12px',
    },
    sectionLabel: {
        width: '100%',
        color: '#5048E5',
        fontWeight: '400',
        height: '45px',
        borderBottom: '2px #5048E5 solid',
        marginBottom: '5px'
    },
    subSection: {
        border: '1px #5048e537 solid',
        minHeight: '50px',
        margin: '5px 0px',
        cursor: 'move',
    },
    subSectionLabel: {
        width: '100%',
        color: '#5048E5',
        backgroundColor: '#5048e537',
        fontWeight: '400',
        borderBottom: '2px #5048E5 solid',
        marginBottom: '5px',
        padding: '0px 10px',
    }
});

export const subSectionStyles = makeStyles({
    subSection: {
        border: '1px #5048E5 solid',
        minHeight: '50px',
        padding: '10px 1%',
        margin: '5px 0px',
        cursor: 'move',
    },
    subSectionLabel: {
        color: '#5048E5',
        backgroundColor: '#aaa',
    }
});

export const smallBtns = makeStyles({
    editBtn: {
        color: 'blue',
        width: '20px',
        height: '20px',
        margin: '2px 5px',
        cursor: 'pointer',
        borderRadius: '5px',
        padding: '1px',
        boxShadow: '0px 0px 5px #5048E5',
        '&:hover': {
            opacity: '0.6',
        }
    },
    deleteBtn: {
        color: 'red',
        width: '20px',
        height: '20px',
        margin: '2px 5px',
        cursor: 'pointer',
        borderRadius: '5px',
        padding: '1px',
        boxShadow: '0px 0px 5px #5048E5',
        '&:hover': {
            opacity: '0.6',
        }
    }
});

export default formStyles
