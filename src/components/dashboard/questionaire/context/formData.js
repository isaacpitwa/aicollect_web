import { v4 as uuidv4 } from 'uuid';

export const compsData = [
    {
        id: 11,
        parentId: false,
        subParentId: false,
        required: false,
        label: 'Personal Information',
        type: 'section',
        description: '',
        tooltip: 'Candidate information',
        components: [
            {
                id: 111,
                parentId: 11,
                subParentId: false,
                required: false,
                type: 'image',
                defaultValue: false,
                label: 'Upload Photo',
                description: 'Add a profile photo for the candidate',
                tooltip: 'Candidate photo',

            },
            {
                id: 112,
                parentId: 11,
                subParentId: false,
                required: true,
                type: 'text',
                defaultValue: false,
                label: 'First Name',
                description: 'Add first name of candidate here',
                tooltip: 'First name of candidate'
            },
            {
                id: 113,
                parentId: 11,
                subParentId: false,
                required: true,
                type: 'text',
                defaultValue: false,
                label: 'Last Name',
                description: 'Add last name of candidate here',
                tooltip: 'Last name of candidate'
            },
            {
                id: 114,
                parentId: 11,
                subParentId: false,
                required: true,
                type: 'email',
                defaultValue: false,
                label: 'Email Address',
                description: 'Official Email address held by candidate',
                tooltip: 'Candidate Email'
            },
            {
                id: 115,
                parentId: 11,
                subParentId: false,
                required: false,
                type: 'phone-number',
                defaultValue: false,
                label: 'Phone number',
                description: 'Add a reachable phone number of the farmer',
                tooltip: 'Reachable mobile number'
            },
            {
                id: 116,
                parentId: 11,
                subParentId: false,
                required: true,
                type: 'select',
                defaultValue: false,
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
                id: 117,
                parentId: 11,
                subParentId: false,
                required: false,
                label: 'Family Information',
                type: 'sub-section',
                description: 'Family information of the candidate, e.g number of wives, number of children',
                tooltip: 'Candidate family information',
                components: [
                    {
                        id: 1171,
                        parentId: 11,
                        subParentId: 117,
                        required: false,
                        type: 'radio',
                        defaultValue: false,
                        label: "Are you married?",
                        description: 'This is to establish where the candidate has a spouse or not',
                        tooltip: 'Marital status',
                        values: [
                            {
                                id: 11711,
                                label: 'Yes',
                                checked: false
                            },
                            {
                                id: 11712,
                                label: 'No',
                                checked: false
                            },
                            {
                                id: 11713,
                                label: 'Not Disclosed',
                                checked: false
                            }
                        ]
                    },
                    {
                        id: 1172,
                        parentId: 11,
                        subParentId: 117,
                        required: false,
                        type: 'number',
                        defaultValue: false,
                        label: 'How many adults in household',
                        description: 'Fill in the number of adults living with the candidate, candidate inclusive',
                        tooltip: 'Number of adults'
                    },
                ]
            },
        ],
    },
    {
        id: 12,
        parentId: false,
        subParentId: false,
        required: false,
        label: 'Farm Information',
        type: 'section',
        description: 'Farm Information Description',
        tooltip: '',
        components: [
            {
                id: 121,
                parentId: 12,
                subParentId: false,
                required: false,
                type: 'location',
                defaultValue: 'Kampala',
                label: 'Add Farm Location',
                description: 'Select location of farm from options given below',
                tooltip: 'Location of the farm',
                values: [
                    {
                        id: 1211,
                        label: 'Kampala',
                        checked: false
                    },
                    {
                        id: 1212,
                        label: 'Kabarole',
                        checked: false
                    },
                    {
                        id: 1213,
                        label: 'Jinja',
                        checked: false
                    }
                ]
            },
            {
                id: 122,
                parentId: 12,
                subParentId: false,
                required: false,
                type: 'select-box',
                defaultValue: false,
                label: 'Mark the type of livestock the farmer currently owns',
                description: 'This is to know what type of livestock the farm has',
                tooltip: 'Check livestock farmer owns',
                values: [
                    {
                        id: 1221,
                        label: 'Cows',
                        checked: false
                    },
                    {
                        id: 1222,
                        label: 'Goats',
                        checked: false
                    },
                    {
                        id: 1223,
                        label: 'Sheep',
                        checked: false
                    },
                    {
                        id: 1224,
                        label: 'Rabbits',
                        checked: false
                    }
                ]
            },
            {
                id: 123,
                parentId: 12,
                subParentId: false,
                required: false,
                type: 'text-area',
                defaultValue: false,
                label: 'Summary of farm assets',
                description: 'Write down the farming assets held by the candidate',
                tooltip: 'Farm assets'
            },
            {
                id: 124,
                parentId: 12,
                subParentId: false,
                required: false,
                type: 'area-mapping',
                defaultValue: false,
                label: 'Map Farm',
                description: 'Do an area mapping of the farm of the candidate',
                tooltip: 'Farm area mapping'
            },
        ]
    }
]
