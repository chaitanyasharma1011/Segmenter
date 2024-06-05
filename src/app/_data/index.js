import { v4 } from "uuid";

export const schema = {
  operation_type: "OR",
  operands: [
    {
      type: "T",
      message: "content",
      filter_group: false,
    },
    {
      type: "T",
      message: "content",
      filter_group: true,
      sub_operation: {
        operation_type: "OR",
        operands: [
          {
            type: "T",
            message: "content",
            filter_group: false,
          },
          {
            type: "T",
            message: "content",
            filter_group: true,
            sub_operation: {
              operation_type: "OR",
              operands: [
                {
                  type: "T",
                  message: "content",
                  filter_group: false,
                },
                {
                  type: "T",
                  message: "content",
                  filter_group: false,
                },
              ],
            },
          },
        ],
      },
    },
    {
      type: "T",
      message: "content",
      filter_group: false,
    },
    {
      type: "T",
      message: "content",
      filter_group: false,
    },
  ],
};

export const CONTENT_TYPE = [
  {
    _id: v4(),
    description: "Text",
    option: "T",
  },
  {
    _id: v4(),
    description: "Dropdown",
    option: "D",
  },
];

export const OPERATION_TYPE = [
  {
    _id: v4(),
    description: "OR",
    option: "OR",
  },
  {
    _id: v4(),
    description: "AND",
    option: "AND",
  },
];

export const DROPDOWN_OPTIONS = [
  {
    _id: v4(),
    description: "None",
    option: "",
  },
  {
    _id: v4(),
    description: "Option 1",
    option: "O1",
  },
  {
    _id: v4(),
    description: "Option 2",
    option: "O2",
  },
];

export const TEXT_OPTIONS = [
  {
    _id: v4(),
    description: "None",
    option: "",
  },
  {
    _id: v4(),
    description: "Text 1",
    option: "T1",
  },
  {
    _id: v4(),
    description: "Text 2",
    option: "T2",
  },
];
