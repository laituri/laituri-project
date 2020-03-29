export const UserProfileFields: Field[] = [
  {
    title: 'Full name',
    key: 'name',
    type: 'text',
    placeholder: 'John Doe',
    validation: {
      required: true,
    },
  },
  {
    title: 'Email',
    key: 'email',
    type: 'text',
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
  },
  {
    title: 'Skills',
    key: 'skills',
    type: 'repeater',
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
