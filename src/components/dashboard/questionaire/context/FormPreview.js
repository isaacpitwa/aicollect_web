import React, { useState, useEffect, createContext, useCallback } from "react";

export const FormPreviewContext = createContext();

const FormPreviewProvider = () => {

    const [fieldsValues, setFieldsValues] = useState([]);

    return (
        <FormPreviewContext.Provider
        >
            {props.children}
        </FormPreviewContext.Provider>
    )
}

export default FormPreviewProvider
