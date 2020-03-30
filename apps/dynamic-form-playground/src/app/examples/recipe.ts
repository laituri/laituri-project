export const RecipeFields: Field[] = [
  {
    title: `Receipe's name`,
    key: 'title',
    type: 'text',
    placeholder: 'Moon cake',
    validation: {
      required: true,
    },
  },
  {
    title: 'Short description',
    key: 'description',
    type: 'textarea',
    placeholder: 'Lorem ipsum',
    validation: {
      required: true,
      maxLength: 200,
    },
  },
  {
    title: 'Categories',
    key: 'categories',
    type: 'dropdown',
    placeholder: 'Select category',
    options: [
      { key: 'breakfast', title: 'Breakfast' },
      { key: 'lunch', title: 'Lunch' },
      { key: 'dinner', title: 'Dinner' },
    ],
  },
  {
    title: 'Tags',
    key: 'tags',
    type: 'chips',
    placeholder: 'Add tags',
  },
  {
    type: 'info',
    body: `# Lorem ipsum

    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  },
  {
    title: 'Instructions',
    key: 'instructions',
    type: 'markdown',
    placeholder: 'Lorem ipsum',
    validation: {
      required: true,
      minLength: 100,
    },
  },
  {
    title: 'Ingredients',
    key: 'ingredients',
    type: 'repeater',
    display: 'title',
    validation: {
      required: true,
      minItems: 1,
    },
    fields: [
      {
        title: 'Title',
        key: 'title',
        type: 'text',
        validation: {
          required: true,
        },
      },
    ],
  },
];
