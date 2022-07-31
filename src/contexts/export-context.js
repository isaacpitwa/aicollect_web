import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const initialState = {
    details: null,
    depedancyTabs:null,
  };
  const handlers = {
    DETAILS: (state, action) => {
      const { details } = action.payload;
      console.log("Executing Set Detiails in state function of COntext");
      return {
        ...state,
        details
      };
    },
  
  };
  const reducer = (state, action) => (handlers[action.type]
    ? handlers[action.type](state, action)
    : state);
    
export const ExcelExportContext = createContext({...initialState, setDetails: () => {},})


export const ExcelExportProvider = (props) =>{
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialState);
    const setDetails = (details)=>{
        console.log("Executing Set function in Context");
        if(details != state.details){
            dispatch({
                type: 'DETAILS',
                payload: {
                    details
                }
              });
        }
    }
    return (
        <ExcelExportContext.Provider
          value={{
            ...state,
            setDetails,
          }}
        >
          {children}
        </ExcelExportContext.Provider>
      );
}

ExcelExportProvider.propTypes = {
    children: PropTypes.node.isRequired
  };
  
  export const ExcelExportConsumer = ExcelExportContext.Consumer;