import { v4 as uuidv4 } from 'uuid';

export const compsData = [
    {
        id: uuidv4(),
        required: false,
        label: 'Personal Information',
        type: 'section',
        description: '',
        tooltip: 'Candidate information',
        components: [
            {
                id: uuidv4(),
                required: false,
                type: 'image',
                defaultValue: null,
                label: 'Upload Photo',
                description: 'Add a profile photo for the candidate',
                tooltip: 'Candidate photo',

            },
            {
                id: uuidv4(),
                required: true,
                type: 'text',
                defaultValue: null,
                label: 'First Name',
                description: 'Add first name of candidate here',
                tooltip: 'First name of candidate'
            },
            {
                id: uuidv4(),
                required: true,
                type: 'text',
                defaultValue: null,
                label: 'Last Name',
                description: 'Add last name of candidate here',
                tooltip: 'Last name of candidate'
            },
            {
                id: uuidv4(),
                required: true,
                type: 'email',
                defaultValue: null,
                label: 'Email Address',
                description: 'Official Email address held by candidate',
                tooltip: 'Candidate Email'
            },
            {
                id: uuidv4(),
                required: false,
                type: 'phone-number',
                defaultValue: null,
                label: 'Phone number',
                description: 'Add a reachable phone number of the farmer',
                tooltip: 'Reachable mobile number'
            },
            {
                id: uuidv4(),
                required: true,
                type: 'select',
                defaultValue: null,
                label: "Gender of candidate",
                description: 'Add the gender of the candidate here',
                tooltip: 'Candidate gender',
                values: [
                    {
                        id: uuidv4(),
                        label: 'Male',
                        checked: false
                    },
                    {
                        id: uuidv4(),
                        label: 'Female',
                        checked: false
                    },
                    {
                        id: uuidv4(),
                        label: 'Others',
                        checked: false
                    }
                ]
            },
            {
                id: uuidv4(),
                required: false,
                label: 'Family Information',
                type: 'sub-section',
                description: 'Family information of the candidate, e.g number of wives, number of children',
                tooltip: 'Candidate family information',
                components: [
                    {
                        id: uuidv4(),
                        required: false,
                        type: 'radio',
                        defaultValue: null,
                        label: "Are you married?",
                        description: 'This is to establish where the candidate has a spouse or not',
                        tooltip: 'Marital status',
                        values: [
                            {
                                id: uuidv4(),
                                label: 'Yes',
                                checked: false
                            },
                            {
                                id: uuidv4(),
                                label: 'No',
                                checked: false
                            },
                            {
                                id: uuidv4(),
                                label: 'Not Disclosed',
                                checked: false
                            }
                        ]
                    },
                    {
                        id: uuidv4(),
                        required: false,
                        type: 'number',
                        defaultValue: null,
                        label: 'How many adults in household',
                        description: 'Fill in the number of adults living with the candidate, candidate inclusive',
                        tooltip: 'Number of adults'
                    },
                ]
            },
        ],
    },
    {
        id: uuidv4(),
        required: false,
        label: 'Farm Information',
        type: 'section',
        description: 'Farm Information Description',
        tooltip: '',
        components: [
            {
                id: uuidv4(),
                required: false,
                type: 'location',
                defaultValue: 'Kampala',
                label: 'Add Farm Location',
                description: 'Select location of farm from options given below',
                tooltip: 'Location of the farm',
                values: [
                    {
                        id: uuidv4(),
                        label: 'Kampala',
                        checked: false
                    },
                    {
                        id: uuidv4(),
                        label: 'Kabarole',
                        checked: false
                    },
                    {
                        id: uuidv4(),
                        label: 'Jinja',
                        checked: false
                    }
                ]
            },
            {
                id: uuidv4(),
                required: false,
                type: 'select-box',
                defaultValue: null,
                label: 'Mark the type of livestock the farmer currently owns',
                description: 'This is to know what type of livestock the farm has',
                tooltip: 'Check livestock farmer owns',
                values: [
                    {
                        id: uuidv4(),
                        label: 'Cows',
                        checked: false
                    },
                    {
                        id: uuidv4(),
                        label: 'Goats',
                        checked: false
                    },
                    {
                        id: uuidv4(),
                        label: 'Sheep',
                        checked: false
                    },
                    {
                        id: uuidv4(),
                        label: 'Rabbits',
                        checked: false
                    }
                ]
            },
            {
                id: uuidv4(),
                required: false,
                type: 'text-area',
                defaultValue: null,
                label: 'Summary of farm assets',
                description: 'Write down the farming assets held by the candidate',
                tooltip: 'Farm assets'
            },
            {
                id: uuidv4(),
                required: false,
                type: 'area-mapping',
                defaultValue: null,
                label: 'Map Farm',
                description: 'Do an area mapping of the farm of the candidate',
                tooltip: 'Farm area mapping'
            },
        ]
    }
]
