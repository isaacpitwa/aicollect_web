import { v4 as uuidv4 } from 'uuid';

export const compsData = [
    {
        id: 11,
        parentId: false,
        subParentId: false,
        required: false,
        display: 'visible',
        type: 'section',
        label: 'Personal Information',
        description: '',
        tooltip: 'Candidate information',                        
        conditional: false,
        components: [
            {
                id: 111,
                parentId: 11,
                subParentId: false,
                required: false,
                type: 'image',
                value: '',
                label: 'Upload Photo',
                description: 'Add a profile photo for the candidate',
                tooltip: 'Candidate photo',                        
                conditional: false,
            },
            {
                id: 112,
                parentId: 11,
                subParentId: false,
                required: true,
                type: 'text',
                value: '',
                label: 'First Name',
                description: 'Add first name of candidate here',
                tooltip: 'First name of candidate',                        
                conditional: false,
            },
            {
                id: 113,
                parentId: 11,
                subParentId: false,
                required: true,
                type: 'text',
                value: '',
                label: 'Last Name',
                description: 'Add last name of candidate here',
                tooltip: 'Last name of candidate',                        
                conditional: false,
            },
            {
                id: 114,
                parentId: 11,
                subParentId: false,
                required: true,
                type: 'email',
                value: '',
                label: 'Email Address',
                description: 'Official Email address held by candidate',
                tooltip: 'Candidate Email',                        
                conditional: false,
            },
            {
                id: 115,
                parentId: 11,
                subParentId: false,
                required: false,
                type: 'phone-number',
                value: '',
                label: 'Phone number',
                description: 'Add a reachable phone number of the farmer',
                tooltip: 'Reachable mobile number',                        
                conditional: false,
            },
            {
                id: 116,
                parentId: 11,
                subParentId: false,
                required: true,
                type: 'select',
                value: '',
                label: "Gender of candidate",
                description: 'Add the gender of the candidate here',
                tooltip: 'Candidate gender',                        
                conditional: false,
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
                type: 'number',
                value: 0,
                label: 'How many adults in household',
                description: 'Fill in the number of adults living with the candidate, candidate inclusive',
                tooltip: 'Number of adults',                        
                conditional: false,
                dependants: [
                    {
                        id: 118,
                        display: 'visible',
                        value: true
                    }
                ]
            },
            {
                id: 118,
                parentId: 11,
                subParentId: false,
                required: false,
                display: 'hidden',
                label: 'Family Member Information',
                type: 'sub-section',
                description: 'Family information of the candidate, e.g number of wives, number of children',
                tooltip: 'Candidate family information',                        
                conditional: false,
                dependency: {
                    display: 'visible',
                    when: 117,
                    value: true
                },
                components: [
                    {
                        id: 1181,
                        parentId: 11,
                        subParentId: 118,
                        required: false,
                        type: 'text',
                        value: '',
                        label: 'First Name',
                        description: 'Fill in the name of your partner.',
                        tooltip: 'Name of partner',
                        conditional: false
                    },
                    {
                        id: 1182,
                        parentId: 11,
                        subParentId: 118,
                        required: false,
                        type: 'text',
                        value: '',
                        label: 'Second Name',
                        description: 'Fill in the name of your partner.',
                        tooltip: 'Name of partner',
                        conditional: false
                    },
                    {
                        id: 1181,
                        parentId: 11,
                        subParentId: 118,
                        required: false,
                        type: 'phone-number',
                        value: '',
                        label: 'Phone Number',
                        description: 'Fill in the name of your partner.',
                        tooltip: 'Name of partner',
                        conditional: false
                    },
                ]
            },
            {
                id: 119,
                parentId: 11,
                subParentId: false,
                required: false,
                display: 'visible',
                label: 'Family Information',
                type: 'sub-section',
                description: 'Family information of the candidate, e.g number of wives, number of children',
                tooltip: 'Candidate family information',                        
                conditional: false,
                dependency: false,
                components: [
                    {
                        id: 1191,
                        parentId: 11,
                        subParentId: 119,
                        required: false,
                        type: 'radio',
                        value: '',
                        label: "Are you married?",
                        description: 'This is to establish where the candidate has a spouse or not',
                        tooltip: 'Marital status',
                        conditional: false,
                        values: [
                            {
                                id: 11911,
                                label: 'Yes',
                                checked: false
                            },
                            {
                                id: 11912,
                                label: 'No',
                                checked: false
                            },
                            {
                                id: 11913,
                                label: 'Not Disclosed',
                                checked: false
                            }
                        ]
                    },
                    {
                        id: 1192,
                        parentId: 11,
                        subParentId: 119,
                        required: false,
                        type: 'text',
                        value: '',
                        label: 'Spouse Name?',
                        description: 'Fill in the name of your partner.',
                        tooltip: 'Name of partner',
                        conditional: {
                            display: true,
                            when: 1191,
                            value: 'yes'
                        }
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
        display: 'visible',
        type: 'section',
        label: 'Farm Information',
        description: 'Farm Information Description',
        tooltip: '',                        
        conditional: false,
        components: [
            {
                id: 121,
                parentId: 12,
                subParentId: false,
                required: false,
                type: 'location',
                value: 'Kampala',
                label: 'Add Farm Location',
                description: 'Select location of farm from options given below',
                tooltip: 'Location of the farm',                        
                conditional: false,
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
                value: '',
                label: 'Mark the type of livestock the farmer currently owns',
                description: 'This is to know what type of livestock the farm has',
                tooltip: 'Check livestock farmer owns',                        
                conditional: false,
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
                value: '',
                label: 'Summary of farm assets',
                description: 'Write down the farming assets held by the candidate',
                tooltip: 'Farm assets',                        
                conditional: false,
            },
            {
                id: 124,
                parentId: 12,
                subParentId: false,
                required: false,
                type: 'area-mapping',
                value: '',
                label: 'Map Farm',
                description: 'Do an area mapping of the farm of the candidate',
                tooltip: 'Farm area mapping',                        
                conditional: false,
            },
        ]
    }
]
