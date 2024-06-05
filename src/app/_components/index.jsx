"use client";

import AppButton from "@/components/button";
import AppSelect from "@/components/dropdown";
import AppInput from "@/components/input/appInput";
import React, { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  CONTENT_TYPE,
  DROPDOWN_OPTIONS,
  OPERATION_TYPE,
  schema,
} from "../_data";

export default function Controller() {
  const [form, setForm] = useState(schema);

  const handleChange = (path, type, value, key) => {
    let temp = { ...form };

    if (type === "operation") {
      if (path.length === 0) temp.operation_type = value;
      if (path.length === 1)
        temp.operands[path[0]].sub_operation.operation_type = value;
      if (path.length === 2)
        temp.operands[path[0]].sub_operation.operands[
          path[1]
        ].sub_operation.operation_type = value;
    }

    if (type === "operand") {
      if (path.length === 1) {
        temp.operands[path[0]][key] = value;
        if (key !== "message") temp.operands[path[0]].message = "";
      }
      if (path.length === 2) {
        temp.operands[path[0]].sub_operation.operands[path[1]][key] = value;
        if (key !== "message")
          temp.operands[path[0]].sub_operation.operands[path[1]].message = "";
      }
      if (path.length === 3) {
        temp.operands[path[0]].sub_operation.operands[
          path[1]
        ].sub_operation.operands[path[2]][key] = value;
        if (key !== "message")
          temp.operands[path[0]].sub_operation.operands[
            path[1]
          ].sub_operation.operands[path[2]].message = "";
      }
    }
    setForm(temp);
  };

  const handleAdd = (type, path) => {
    let temp = { ...form };
    let new_item =
      type === "rule"
        ? {
            type: "T",
            message: "content",
            filter_group: false,
          }
        : {
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
              ],
            },
          };
    if (path.length === 0) temp.operands.push(new_item);
    if (path.length === 1)
      temp.operands[path[0]].sub_operation.operands.push(new_item);
    if (path.length === 2)
      temp.operands[path[0]].sub_operation.operands[
        path[1]
      ].sub_operation.operands.push(new_item);
    setForm(temp);
  };

  const handleDelete = (path) => {
    let temp = { ...form };
    if (path.length === 1) {
      temp.operands.splice(path[0], 1);
    }

    if (path.length === 2) {
      temp.operands[path[0]].sub_operation.operands.splice(path[1], 1);
      if (
        temp.operands[path[0]].sub_operation.operands.length === 0 &&
        temp.operands[path[0]].filter_group
      ) {
        if (temp.operands.length <= 1)
          temp.operands[path[0]].filter_group = false;
        else temp.operands.splice(path[0], 1);
      }
    }

    if (path.length === 3) {
      temp.operands[path[0]].sub_operation.operands[
        path[1]
      ].sub_operation.operands.splice(path[2], 1);
      if (
        temp.operands[path[0]].sub_operation.operands[path[1]].sub_operation
          .operands.length === 0 &&
        temp.operands[path[0]].sub_operation.operands[path[1]].filter_group
      ) {
        temp.operands[path[0]].sub_operation.operands.splice(path[1], 1);
        if (
          temp.operands[path[0]].sub_operation.operands.length === 0 &&
          temp.operands[path[0]].filter_group
        ) {
          if (temp.operands.length <= 1)
            temp.operands[path[0]].filter_group = false;
          else temp.operands.splice(path[0], 1);
        }
      }
    }
    // if (temp?.operands.length === 1 && path.length === 0 && index === 0)
    setForm(temp);
  };

  const Operation = ({ form, path = [] }) => {
    return (
      <div className="space-y-4">
        {form?.operands?.map((operand, index) => (
          <div
            className="border border-gray-500 w-full p-4 text-sm space-y-2"
            key={index}
          >
            <div className="flex space-x-4">
              <div className="flex space-x-2 flex-1">
                <p>
                  {index === 1 ? (
                    <AppSelect
                      label="Operation"
                      options={OPERATION_TYPE}
                      value={form?.operation_type}
                      onChange={(e) =>
                        handleChange(path, "operation", e?.target?.value)
                      }
                    />
                  ) : index ? (
                    form?.operation_type
                  ) : (
                    "WHERE"
                  )}
                </p>

                {operand.filter_group ? (
                  <div className="bg-[#fafafa] w-full">
                    <Operation
                      form={operand?.sub_operation}
                      path={[...path, index]}
                    />
                  </div>
                ) : (
                  //   <Operation form={operand?.sub_operation} />
                  <div className="space-y-4 flex-1">
                    <AppSelect
                      label="Type"
                      options={CONTENT_TYPE}
                      value={operand?.type}
                      onChange={(e) =>
                        handleChange(
                          [...path, index],
                          "operand",
                          e?.target?.value,
                          "type"
                        )
                      }
                    />
                    {operand?.type === "T" ? (
                      <AppInput
                        label="Message"
                        name={"message"}
                        value={operand?.message}
                        onChange={(e) =>
                          handleChange(
                            [...path, index],
                            "operand",
                            e?.target?.value,
                            "message"
                          )
                        }
                      />
                    ) : (
                      <AppSelect
                        label="Type"
                        options={DROPDOWN_OPTIONS}
                        value={operand?.message}
                        onChange={(e) =>
                          handleChange(
                            [...path, index],
                            "operand",
                            e?.target?.value,
                            "message"
                          )
                        }
                      />
                    )}
                    {/* <div className="border">{operand?.message}</div> */}
                  </div>
                )}
              </div>
              <RiDeleteBinLine
                color={
                  form?.operands.length === 1 &&
                  path.length === 0 &&
                  index === 0
                    ? "grey"
                    : "#EF5055"
                }
                size={18}
                onClick={() =>
                  !(
                    form?.operands.length === 1 &&
                    path.length === 0 &&
                    index === 0
                  ) && handleDelete([...path, index])
                }
              />
            </div>
          </div>
        ))}
        <div className="flex space-x-4">
          <AppButton
            disabled={path.length >= 2}
            onClick={() => handleAdd("rule", path)}
          >
            {" "}
            Add Field{" "}
          </AppButton>
          <AppButton
            disabled={path.length >= 2}
            onClick={() => handleAdd("group", path)}
          >
            Add Field Group
          </AppButton>
        </div>
      </div>
    );
  };
  return (
    <div className="w-full p-4 bg-[#fff] rounded-md text-[#000]">
      <Operation form={form} path={[]} />
    </div>
  );
}
