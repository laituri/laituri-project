import { FormGroup } from '@angular/forms';
import { Field } from 'dynamic-form';

export const CaptionThisFields: Field[] = [
  {
    title: '1. Get random image of a dog',
    key: 'image',
    type: 'action',
    attributes: {},
    button: 'Fetch!',
    preview: {
      layout: 'image',
      imageKey: 'message',
    },
    events: {
      click: () =>
        fetch('https://dog.ceo/api/breeds/image/random').then((res) =>
          res.json(),
        ),
    },
  },
  {
    title: '2. Write a short description',
    key: 'description',
    type: 'textarea',
    placeholder: 'Lorem ipsum',
    condition: {
      key: 'image',
    },
    validation: {
      required: true,
      maxLength: 20,
    },
    hint: 'Minium of 20 char',
  },
  {
    title: '3. Submit',
    key: 'submit',
    type: 'submit',
    button: 'Submit',
    events: {
      click: async (form: FormGroup) => {
        console.log({ form, values: form.value });
        form.disable();
      },
    },
    condition: {
      key: 'description',
    },
  },
];
