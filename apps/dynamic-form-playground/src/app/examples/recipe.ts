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
