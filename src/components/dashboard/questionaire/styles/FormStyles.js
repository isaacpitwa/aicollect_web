import {
    makeStyles
} from '@mui/styles';

const formStyles = makeStyles({
    form: {
        padding: '1%',
    },
    formFields: {
        background: '#448AFF',
        color: 'white',
        padding: '10px',
        width: '100%',
        textAlign: 'center',
        marginTop: '20px'
    },
    section: {
        width: '100%',
        backgroundColor: '#ffffff',
        border: '1px #DDDDDD dotted',
        borderRadius: '8px',
        overflow: 'hidden',
        minHeight: '50px',
        padding: '10px 1%',
        paddingTop: '0px',
        margin: '5px 0px',
        cursor: 'move',
        color: '#5F768A',
        fontSize: '12px',
        '&:hover': {
            border: '1px #5048E5 dotted',
        }
    },
    section2: {
        backgroundColor: '#ffffff',
        border: 'None',
        borderRadius: '8px',
        minHeight: '50px',
        padding: '5px 0px',
        paddingTop: '0px',
        margin: '5px 0px',
        color: '#5F768A',
        fontSize: '12px',
    },
    section3: { 
        width: '100%',
        backgroundColor: '#5048e519',
        border: '1px #5048E5 solid',
        borderRadius: '8px',
        minHeight: '50px',
        padding: '10px 1%',
        paddingTop: '0px',
        margin: '5px 0px',
        cursor: 'move',
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
        margin: '0px -1%',
        width: '102%',
        height: '50px',
        padding: '0px 1%',
        borderBottom: '2px #5048E5 solid',
        marginBottom: '10px',
        color: '#5048E5',
        fontSize: '30px',
        fontWeight: '500'
    },
    subSection: {
        border: '1px #5048e537 solid',
        borderRadius: '5px',
        overflow: 'hidden',
        minHeight: '50px',
        margin: '5px 0px',
        padding: '10px 1%',
        paddingTop: '0px',
        cursor: 'move',
        '&:hover': {
            backgroundColor: '#5048e519',
        }
    },
    subSection2: {
        width: '100%',
        border: '1px #5048e537 solid',
        borderRadius: '5px',
        overflow: 'hidden',
        minHeight: '50px',
        margin: '5px 0px',
        padding: '10px 1%',
        paddingTop: '0px',
        cursor: 'cursor',
    },
    subSection3: {
        width: '100%',
        backgroundColor: '#5048e519',
        border: '1px #5048E5 solid',
        borderRadius: '5px',
        overflow: 'hidden',
        minHeight: '50px',
        margin: '5px 0px',
        padding: '10px 1%',
        paddingTop: '0px',
        cursor: 'move',
    },
    subSectionLabel: {
        margin: '0px -1% 0px -1.5%',
        width: '102.5%',
        padding: '0px 1%',
        color: '#5048E5',
        backgroundColor: '#5048e537',
        borderBottom: '2px #5048E5 solid',
        marginBottom: '5px',
        paddingTop: '5px',
        fontSize: '22px',
        fontWeight: '500',
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
    sectionBtns: {
        float: 'right',
        paddingTop: '5px',
    },
    fieldBtns: {
        width: '100%',
        paddingTop: '5px',
    },
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

export const dialogStyles = makeStyles({
    title: {
        backgroundColor: '#5048E5',
        color: 'white',
        padding: '20px 40px',
    },
    cancelBtn: {
        float: 'right',
        cursor: 'pointer'
    },
    content: {
        padding: '20px'
    }
});

export default formStyles
