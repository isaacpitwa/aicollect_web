import React, { useState, useEffect, createContext, useCallback } from "react";
import { FieldFormsApi } from "../../../../api/fieldform-api";

import { FormsApi } from '../../../../api/forms-api'
import {
    getFieldsValues,
    allFormFields,
    getSectionsSubSections,
} from '../utils';

// Initialization of the Form Context
export const FormContext = createContext();

/**
 * @function FormProvider
 * @desc This is the Form Context Provider component that manages the overall state of the form being built.
 * @arg {Object} props - The properties passed to the form provider.
 * @arg {String} props.questionaireId - The form Id, passed through props.
 * @returns {Component} The Form Provider component.
 * @author Atama Zack <atama.zack@gmail.com>
 * @version 1.0.0
 */
const FormProvider = (props) => {

    const { questionaireId, isFormField } = props;

    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [selectSection, setSelectSection] = useState(false);
    const [sectionId, setSectionId] = useState(null);
    const [subSectionId, setSubSectionId] = useState(null);
    const [componentsData, setComponentsData] = useState([]);
    const [fieldResponses, setFieldResponses] = useState([]);
    const [formData, setFormData] = useState({});
    const [sectionCreated, setSectionCreated] = useState(false);
    const [formPreview, setFormPreview] = useState(false);
    const [editStatus, setEditStatus] = useState(true);
    const [dependantId, setDependantId] = useState("");
    const [dependecyValue, setDependecyValue] = useState("");
    const [conditionalId, setConditionalId] = useState("");
    const [conditionalValue, setConditionalValue] = useState("");
    const [formFieldValues, setFormFieldValues] = useState([]);
    const [formQuestions, setFormQuestions] = useState([]);

    /**
     * @function getFormData
     * @desc This method gets a particular form's data using the form API.
     * @returns {Void} Nothing is returned.
     * @author Atama Zack <atama.zack@gmail.com>
     * @version 1.0.0
     */
    const getFormData = async () => {
        setIsLoaded(false)
        try {
            console.log(`Is form Field Form: ${isFormField} \n field Form ID : ${questionaireId} `, );
            let data = isFormField ? await FieldFormsApi.getFieldFormDetails(questionaireId):  await FormsApi.getFormDetails(questionaireId);
            if (data) {
                getFormDetails(data);
            }
        } catch (error) {
            console.log('DEBUG error --> \n', error);
        }
        setIsLoaded(true)
    };

    useEffect(() => {
        getFormData();
    }, []);

    /**
     * @function getFormDetails
     * @desc This method gets form data from the API response and updates the form builder state.
     * @arg {Object} data - The data of a form containing all form details.
     * @returns {Void} Nothing is returned.
     * @author Atama Zack <atama.zack@gmail.com>
     * @version 1.0.0
     */
    const getFormDetails = (data) => {
        setComponentsData(data.formFields);
        setFormData(data);
        setSectionCreated(data.formFields[0]&&data.formFields[0].type === 'section' ? true : false);
        setFormFieldValues(getFieldsValues(data.formFields));
        setFieldResponses(allFormFields(data.formFields).map(item => { return { id: item.id, value: item.value }}));
    }


        /**
     * @function getFormQuestions
     * @desc This method gets a particular form's data using the form API.
     * @returns {Void} Nothing is returned.
     * @author Isaac Pitwa <isaacpitwa256@gmail.com>
     * @version 1.0.0
     */

    const getFormQuestions =  (data) => {
            // Loop through sections
    for (let i = 0; i < data.formFields.length; i++) {
        // Loop through  Form fields and subsections
        for (let j = 0; j < data.formFields[i].components.length; j++) {
          if (data.formFields[i].components[j].type === 'sub-section') {
            for (
              let k = 0;
              k < data.formFields[i].components[j].components.length;
              k++
            ) {
              /*
              update the formfield with corresponding form Value
            */
              data.formFields[i].components[j].components[k] = this.updateInput(
                data.formFields[i].components[j].components[k],
                '',
                true,
              );
            }
          } else {
            /*
              update the formfield with corresponding form Value
            */
              data.formFields[i].components[j] = this.updateInput(
                data.formFields[i].components[j],
              '',
              true,
            );
          }
        }
      }
    
    };

    /**
     * @function addDependency
     * @desc This method adds a dependency between the field using it (Dependee) and the field (Dependant) whose display depends on the value of the Dependee.
     * @arg {Object} fieldData - A field Object containing all field properties.
     * @returns {Boolean} A Boolean value, True if successfully linked dependency and False if not
     * @author Atama Zack <atama.zack@gmail.com>
     * @version 1.0.0
     */
    const addDependency = (fieldData) => {
        let newComponentsData = componentsData;
        let dependantField = getSectionsSubSections(fieldData, componentsData).find(field=>field.id===fieldData.dependency);
        let dependantFieldIndex = "";
        dependantField.display = "hidden";
        dependantField.dependency = fieldData.id
        if(dependantField.type==="section") {
            dependantFieldIndex = newComponentsData.findIndex(section=>section.id===fieldData.dependency);
            newComponentsData[dependantFieldIndex] = dependantField;
        } else {
            let section = newComponentsData.find(section=>section.id===fieldData.parentId);
            let sectionIndex = newComponentsData.findIndex(section=>section.id===fieldData.parentId);
            dependantFieldIndex = section.components.findIndex(field=>field.id===dependantField.id)
            section.components[dependantFieldIndex] = dependantField
            newComponentsData[sectionIndex] = section;
        }
        setComponentsData(newComponentsData)
    }

    /**
     * @function conditionalDisplay
     * @desc This method checks if a specific field has a conditional dependency.
     * @arg {Object} fieldData - A field Object containing all field properties.
     * @returns {Boolean} A Boolean value, True if a field has a conditional dependency and False if not
     * @author Atama Zack <atama.zack@gmail.com>
     * @version 1.0.0
     */
    const conditionalDisplay = (fieldData) => {
        let dependee = fieldData.conditional?formFieldValues.find(field=>field.id===fieldData.conditional.when):null;
        if(dependee) {
            if(dependee.type==='select-box') {
                let values = []
                dependee.values.map(item=>{ if(item.checked) values.push(item.label.toLowerCase()) })
                return values.includes(fieldData.conditional.value);
            } else {
                return fieldData.conditional.when===dependee.id&&fieldData.conditional.value===dependee.value&&!editStatus?true:false;
            }
        } else {
            return false;
        }
    };

    /**
     * @function addComponentToSection
     * @desc This method adds a field to the form being built.
     * @arg {Object} field - A field Object containing all field properties.
     * @returns {Void} Nothing is returned.
     * @author Atama Zack <atama.zack@gmail.com>
     * @version 1.0.0
     */
    const addComponentToSection = (field) => {
        
        let newComponentsData = componentsData;
        let newSection = newComponentsData.find(section=>section.id===field.parentId);
        let sectionIndex = newComponentsData.findIndex(section => section.id === field.parentId);
        let newSubSection = field.subParentId?newSection.components.find(subSec => subSec.id === field.subParentId):null;
        let subSectionIndex = field.subParentId?newSection.components.findIndex(subSec => subSec.id === field.subParentId):null;

        if(field.subParentId&&field.subParentId!==null) {
            newSubSection.components.push(field);
            newSection.components[subSectionIndex] = newSubSection;
            newComponentsData[sectionIndex] = newSection;
        } else {
            newSection.components.push(field);
            newComponentsData[sectionIndex] = newSection;
        }

        setComponentsData(newComponentsData)
        setFormFieldValues(getFieldsValues(newComponentsData))
    }




    /**
     * @function updateFieldInSection
     * @desc This method edits a particular field that exists in the form being built.
     * @arg {Object} fieldData - A field Object containing all field properties.
     * @returns {Void} Nothing is returned.
     * @author Atama Zack <atama.zack@gmail.com>
     * @version 1.0.0
     */
    const updateFieldInSection = (fieldData) => {

        let newFormFields = componentsData;
        let section = componentsData.find(section => section.id === fieldData.parentId);
        let sectionIndex = componentsData.findIndex(section => section.id === fieldData.parentId);

        if(fieldData.subParentId) {
            let subSection = section.components.find(subSection => subSection.id === fieldData.subParentId);
            let subSectionIndex = section.components.findIndex(subSection => subSection.id === fieldData.subParentId);
            let fieldIndex = subSection.components.findIndex(field => field.id === fieldData.id);
            section.components[subSectionIndex].components[fieldIndex] = fieldData;
        } else {
            let fieldIndex = section.components.findIndex(field => field.id === fieldData.id);
            section.components[fieldIndex] = fieldData;
        }

        newFormFields[sectionIndex] = section;
        setComponentsData(newFormFields);
        if(fieldData.type==="number"&&fieldData.dependency) addDependency(fieldData);
        updateFormData()
    };

    /**
     * @function updateFormData
     * @desc This method updates a particular form's data using the form API.
     * @returns {Void} Nothing is returned.
     * @author Atama Zack <atama.zack@gmail.com>
     * @version 1.0.0
     */
    const updateFormData = async () => {
        let newForm = formData
        newForm.formFields = componentsData
        setFormData(newForm)
        const updatedForm = isFormField ? await FieldFormsApi.addFieldsToNewForm({ formId: newForm._id, ...newForm }) : await FormsApi.addFieldsToNewForm({ formId: newForm._id, ...newForm });
        getFormData(updatedForm.formId);
    }


        /**
     * @function updateRegionsData
     * @desc This method updates a particular form's Region  data using the Context.
     * @returns {Void} Nothing is returned.
     * @author Isaac Pitwa <isaacpitwa256@gmail.com>
     * @version 1.0.0
     */
         const updateRegionFormData = async (regions) => {
            formData.regions = regions
        }

    /**
     * @function deleteFieldData
     * @desc This method is used to delete any form fields expect a section.
     * @arg {Object} fieldData - The field to be deleted.
     * @returns {Void} Nothing is returned.
     * @author Atama Zack <atama.zack@gmail.com>.
     * @version 1.0.0
     */
    const deleteFieldData = (fieldData) => {
        let newFields = componentsData;
        let section = newFields.find(field=>field.id===fieldData.parentId);
        let sectionIndex = newFields.findIndex(field=>field.id===fieldData.parentId);
        
        if(fieldData.subParentId&&fieldData.subParentId!==null) {
            let subSection = section.components.find(field=>field.id===fieldData.subParentId);
            let subSectionIndex = section.components.findIndex(field=>field.id===fieldData.subParentId);
            subSection.components = subSection.components.filter(field=>field.id!==fieldData.id);
            section.components[subSectionIndex] = subSection;
            newFields[sectionIndex] = section;
        } else {
            section.components = section.components.filter(field=>field.id!==fieldData.id);
            newFields[sectionIndex] = section;
        }
        setComponentsData(newFields);
        setFormFieldValues(getFieldsValues(newFields));
    }

    /**
     * @function handleFormPreview
     * @desc This method helps to view the form in preview mode.
     * @returns {Void} Nothing is returned.
     * @author Atama Zack <atama.zack@gmail.com>
     * @version 1.0.0
     */
    const handleFormPreview = () => {
        setFormPreview(!formPreview)
        setEditStatus(!editStatus)
        setSelectSection(false)
        setSectionId(null)
        setSubSectionId(null)
    }

    return (
        <FormContext.Provider
            value={{
                isLoaded,
                setIsLoaded,
                getFormData,
                componentsData,
                setComponentsData,
                error,
                setError,
                selectSection,
                setSelectSection,
                sectionId,
                subSectionId,
                setSectionCreated,
                setSectionId,
                setSubSectionId,
                sectionCreated,
                formData,
                setFormData,
                fieldResponses,
                setFieldResponses,
                addComponentToSection,
                updateFieldInSection,
                addDependency,
                updateFormData,
                formPreview,
                editStatus,
                handleFormPreview,
                dependantId,
                setDependantId,
                dependecyValue,
                setDependecyValue,
                conditionalId,
                setConditionalId,
                conditionalValue,
                setConditionalValue,
                conditionalDisplay,
                formFieldValues,
                setFormFieldValues,
                deleteFieldData,
                updateRegionFormData,
            }}
        >
            {props.children}
        </FormContext.Provider>
    )
}

export default FormProvider
