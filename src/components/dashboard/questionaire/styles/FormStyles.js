import {
    makeStyles
} from '@mui/styles';

const formStyles = makeStyles({
    form: {
        backgroundColor: 'white',
        border: "#5048E5 1px solid",
        borderRadius: "5px",
    },
    formHeaderPanel: {
        padding: '15px 1.2vw',
        paddingTop: '30px',
        width: '85.3vw',
        backgroundColor: '#f1f1fb',
        boxShadow: '0 5px 6px -4px #5048E5',
        paddingBottom: '20px',
    },
    formHeader: {
        width: '100%',
        fontSize: '1.3rem',
        paddingBottom: '10px',
    },
    formField: {
        backgroundColor: 'white',
        borderRadius: '8px',
    },
    formButtons: {
        
    },
    formButton: {
        paddingTop: '6px',
        paddingBottom: '7px',
        marginLeft: '15px',
    },
    formButtonIcon: {
        fontSize: '25px',
        marginRight: '5px',
    },
    formRender: {
        padding: '1%',
    },
    alertContainer: {
        width: '70%',
        margin: '30px 0px',
    },
    alertTitle: {
        fontSize: '25px',
    },
    alertHeader1: {
        fontSize: '20px',
    },
    alertBody: {
        fontSize: '16px',
    },
    formFields: {
        background: '#448AFF',
        marginTop: '3%',
        width: '100%',
        height: '50px',
        padding: '12px',
        color: 'white',
        textAlign: 'center',
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
    },
    form: {
        padding: '20px',
        border: '1px #5048E5 solid',
        borderRadius: '0px 8px 8px 8px',
        marginTop: '-1px',
    },
    gridTextField: {
        padding: '8px',
        border: '1px #5048E5 solid',
    }
});

export const modeBtnStyles = makeStyles({
    startBtn: {
        borderRadius: '8px 0px 0px 0px'
    },
    endBtn: {
        borderRadius: '0px 8px 0px 0px'
    }
});
export default formStyles
