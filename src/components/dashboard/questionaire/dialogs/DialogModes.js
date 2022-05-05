import {
    Button,
    ButtonGroup,
} from '@mui/material';


const DialogModes = (props) => {

    const {
        mode,
        displayMode,
        conditionalMode,
        dependencyMode,
    } = props

    return (
        <ButtonGroup
            variant="outlined"
            size='small'
            aria-label="outlined button group"
        >
            <Button
                variant={mode==="display"?"contained":"outlined"}
                onClick={displayMode}
                style={{ borderRadius: '8px 0px 0px 0px' }}
            >Display</Button>
            <Button
                disabled={conditionalMode?false:true}
                variant={mode==="conditional"?"contained":"outlined"}
                onClick={conditionalMode?conditionalMode:''}
            >Conditional</Button>
            <Button
                disabled={dependencyMode?false:true}
                variant={mode==="logic"?"contained":"outlined"}
                onClick={dependencyMode?dependencyMode:''}
                style={{ borderRadius: '0px 8px 0px 0px' }}
            >Dependency</Button>
        </ButtonGroup>            
    )
};

export default DialogModes;
