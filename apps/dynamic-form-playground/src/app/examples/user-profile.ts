export const UserProfileFields: Field[] = [
  {
    title: 'Your image',
    key: 'image',
    type: 'file',
    output: 'data',
    multiple: true,
    hint: 'Must be an image',
    // accept: 'image/*',
    events: {
      drop: (files) => {
        return new Promise((resolve) => {
          const fileNames = files.map((file) => file.name);
          resolve(fileNames);
        });
      },
    },
  },
  {
    title: 'Full name',
    key: 'name',
    type: 'text',
    placeholder: 'John Doe',
    hint: 'Firstname Lastname',
    value: 'John Doe',
    validation: {
      required: true,
    },
  },
  {
    title: 'Age',
    key: 'age',
    type: 'number',
    placeholder: '18',
    hint: '18+',
    validation: {
      required: true,
      min: 18,
    },
  },
  {
    title: 'Email',
    key: 'email',
    type: 'email',
    placeholder: 'john@laituri.dev',
    validation: {
      required: true,
    },
  },
  {
    title: 'Bio',
    key: 'bio',
    type: 'textarea',
    placeholder: 'Lorem ipsum',
    hint: '5-200 characters',
    validation: {
      minLength: 5,
      maxLength: 200,
    },
  },
  {
    title: 'Skills',
    key: 'skills',
    type: 'repeater',
    display: 'title',
    fields: [
      {
        title: 'Title',
        key: 'title',
        type: 'text',
        validation: {
          required: true,
        },
      },
      {
        title: 'Description',
        key: 'description',
        type: 'textarea',
        placeholder: 'Lorem ipsum',
      },
    ],
  },
];
