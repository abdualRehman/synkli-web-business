import { AddHint } from "global-components/AddHint";
import React, { useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { BgAddIcon } from "utills/svgs/BgAddIcon";
import { BgDeleteIcon } from "utills/svgs/BgDeleteIcon";
import { DragIcon } from "utills/svgs/DragIcon";
import { InfoIcon } from "utills/svgs/InfoIcon";
import { SideTimes } from "utills/svgs/SideTimes";
// import { driver } from "driver.js";
// import "driver.js/dist/driver.css";
const ItemTypes = {
  CARD: "card",
};
const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
};

const Card = ({
  id,
  text,
  index,
  moveCard,
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
  handleHint,
  hanleRequired,
  modalStep,
}) => {
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => ({
      id,
      index,
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  // useEffect(() => {
  //   const driverObj = driver({
  //     showProgress: true,
  //     steps: [
  //       {
  //         element: ".select-input-type-indicate",

  //         popover: {
  //           title: "Select Input Type",
  //           description: "You can select input type from this dropdown",
  //           popoverClass: "my-custom-popover-class ",
  //         },
  //       },
  //       {
  //         element: ".add-input-indicate",

  //         popover: {
  //           title: "Add Input",
  //           description:
  //             "By clicking this button you can add input to this step",
  //           popoverClass: "my-custom-popover-class ",
  //         },
  //       },
  //       {
  //         element: ".select-input-type-indicate",

  //         popover: {
  //           title: "Select Input Type",
  //           description: "You can select input type from this dropdown",
  //           popoverClass: "my-custom-popover-class ",
  //         },
  //       },
  //     ],
  //   });

  //   driverObj.drive();
  // }, []); // Empty dependency array to run the effect only once

  return (
    <div ref={ref} data-handler-id={handlerId}>
      <div>
        {" "}
        <div className="form-input-container relative ">
          {showModal && modalIndex === fieldIndex && modalStep === stepIndex ? (
            <AddHint
              toggleModal={toggleModal}
              handleHint={handleHint}
              stepIndex={stepIndex}
              fieldIndex={fieldIndex}
              field={field}
            />
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
                className="font-poppins select-input-type-indicate"
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
                onClick={() => toggleModal(fieldIndex, stepIndex)}
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
        <div className="flex items-center gap-2 add-ann-form">
          <div>
            {" "}
            <label> Required</label>{" "}
          </div>
          <div>
            <input
              onChange={(e) => hanleRequired(e, stepIndex, fieldIndex)}
              type="checkbox"
              checked={field?.required ? true : false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
