import { AddHint } from "global-components/AddHint";
import React from "react";
import { useDrag } from "react-dnd";
import { BgAddIcon } from "utills/svgs/BgAddIcon";
import { BgDeleteIcon } from "utills/svgs/BgDeleteIcon";
import { DragIcon } from "utills/svgs/DragIcon";
import { InfoIcon } from "utills/svgs/InfoIcon";
import { SideTimes } from "utills/svgs/SideTimes";

export const GenerateField = ({
  field,
  fieldIndex,
  showModal,
  modalIndex,
  toggleModal,
  handleFieldTypeChange,
  stepIndex,
  handleLabel,
  addOption,
  handlePlaceholder,
  handleSwitchOptionOne,
  handleSwitchOptionTwo,
  handleDeleteField,
  handleOption,
  deleteOption,
}) => {
  const [{ isDragging }, ref] = useDrag({
    type: "DIV",
    item: {
      id: fieldIndex,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <div>
      {" "}
      <div>
        {" "}
        <div className="form-input-container relative">
          {/* <GenerateField
    field={field}
    fieldIndex={fieldIndex}
  /> */}
          {showModal && modalIndex === fieldIndex ? (
            <AddHint toggleModal={toggleModal} />
          ) : (
            ""
          )}
          <div className="form-child">
            <label>Select Type</label>
            <div className="mt-1">
              <select
                value={field.type}
                onChange={(e) =>
                  handleFieldTypeChange(e, stepIndex, fieldIndex)
                }
                required
                className="font-poppins"
              >
                <option value="">Select Field Type</option>
                <option value="text">Text</option>
                <option value="number">Number</option>

                <option value="checkbox">Checkbox</option>
                <option value="switch">Switch Button</option>

                <option value="radio">Radio</option>
                <option value="dropdown">Selection</option>
                <option value="date">Date</option>
                <option value="email">Email</option>

                <option value="signature">Signature</option>
                <option value="file">File</option>
              </select>
            </div>
          </div>
          <div className="form-child ">
            {field.type === "text" ||
            field.type === "number" ||
            field.type === "date" ||
            field.type === "email" ||
            field.type === "tel" ? (
              <div>
                {" "}
                <div>
                  {" "}
                  <label>Label:</label>
                  <input
                    type="text"
                    maxLength={30}
                    placeholder="label"
                    value={field.label}
                    onChange={(e) => handleLabel(e, stepIndex, fieldIndex)}
                  />
                </div>
              </div>
            ) : (
              ""
            )}

            {field.type === "file" || field.type === "signature" ? (
              <div>
                {" "}
                <div>
                  {" "}
                  <label>Label:</label>
                  <input
                    type="text"
                    maxLength={30}
                    placeholder="label"
                    value={field.label}
                    onChange={(e) => handleLabel(e, stepIndex, fieldIndex)}
                  />
                </div>
              </div>
            ) : (
              ""
            )}

            {field.type === "checkbox" ||
            field.type === "radio" ||
            field.type === "dropdown" ? (
              <div>
                {" "}
                <div>
                  {" "}
                  <label>Label:</label>
                  <input
                    type="text"
                    maxLength={30}
                    placeholder="label"
                    value={field.label}
                    onChange={(e) => handleLabel(e, stepIndex, fieldIndex)}
                  />
                </div>
                <div>
                  {/* <div>
          <button
            onClick={() =>
              addOption(stepIndex, fieldIndex)
            }
            className="ann-btn mt-2 px-2 rounded-md"
          >
            Add Option
          </button>
        </div> */}
                </div>
              </div>
            ) : (
              ""
            )}

            {field.type === "switch" ? (
              <div>
                <div>
                  {" "}
                  <label>Label:</label>
                  <input
                    type="text"
                    maxLength={30}
                    placeholder="label"
                    value={field.label}
                    onChange={(e) => handleLabel(e, stepIndex, fieldIndex)}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="form-child">
            {field.type === "checkbox" ||
            field.type === "radio" ||
            field.type === "dropdown" ? (
              <div>
                <div className="invisible">fd</div>{" "}
                <div
                  onClick={() => addOption(stepIndex, fieldIndex)}
                  className="flex justify-end items-center cursor-pointer mt-3"
                >
                  <BgAddIcon />
                </div>
              </div>
            ) : (
              ""
            )}

            {field.type === "text" ||
            field.type === "number" ||
            field.type === "date" ||
            field.type === "email" ||
            field.type === "tel" ? (
              <div>
                {" "}
                <label>Placeholder:</label>
                <input
                  type="text"
                  maxLength={30}
                  placeholder="Placeholder"
                  value={field.placeholder}
                  onChange={(e) => handlePlaceholder(e, stepIndex, fieldIndex)}
                />
              </div>
            ) : (
              ""
            )}
            {field?.type === "switch" && (
              <div>
                {" "}
                <div className="invisible">switch</div>
                <div className="grid grid-cols-2 gap-3 relative">
                  <div className="flex items-center gap-2">
                    {" "}
                    <input
                      type="text"
                      maxLength={30}
                      placeholder="option one"
                      value={field.options[0]}
                      onChange={(e) =>
                        handleSwitchOptionOne(e, stepIndex, fieldIndex)
                      }
                    />{" "}
                  </div>

                  <div className="flex items-center gap-2">
                    {" "}
                    <input
                      value={field.options[1]}
                      onChange={(e) =>
                        handleSwitchOptionTwo(e, stepIndex, fieldIndex)
                      }
                      type="text"
                      placeholder="option two"
                    />{" "}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="form-child   ">
            <div className="invisible ">t</div>

            <div className="flex gap-2 md:mt-3 justify-end md:justify-center items-center">
              {" "}
              <button
                className="cursor-pointer"
                onClick={() => toggleModal(fieldIndex)}
              >
                <InfoIcon />
              </button>{" "}
              <button onClick={() => handleDeleteField(stepIndex, fieldIndex)}>
                <BgDeleteIcon />
              </button>{" "}
              <button className="cursor-grab">
                <DragIcon />
              </button>{" "}
            </div>
          </div>
        </div>
        {field.type === "checkbox" ||
        field.type === "radio" ||
        field.type === "dropdown" ? (
          <div>
            {field?.options?.length > 0 && (
              <div>
                {" "}
                <label>options</label>
              </div>
            )}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 my-1">
              {field.options.map((option, optionIndex) => (
                <div className="flex items-center gap-2">
                  {" "}
                  <input
                    maxLength={30}
                    onChange={(e) =>
                      handleOption(e, stepIndex, fieldIndex, optionIndex)
                    }
                    type="text"
                    placeholder="option"
                    value={option}
                  />{" "}
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      deleteOption(stepIndex, fieldIndex, optionIndex)
                    }
                  >
                    <SideTimes />
                  </div>{" "}
                </div>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
