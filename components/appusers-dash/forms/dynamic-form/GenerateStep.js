import { AddHint } from "global-components/AddHint";
import React, { useState, useCallback, useEffect } from "react";
import update from "immutability-helper"; // Assuming you have immutability-helper installed
import Card from "./Card"; // Assuming you have a Card component
// import { driver } from "driver.js";
// import "driver.js/dist/driver.css";
import { BgAddIcon } from "utills/svgs/BgAddIcon";
import { BgDeleteIcon } from "utills/svgs/BgDeleteIcon";
import { DragIcon } from "utills/svgs/DragIcon";
import { InfoIcon } from "utills/svgs/InfoIcon";
import { SideTimes } from "utills/svgs/SideTimes";
import { GenerateField } from "./GenerateField";

export const GenerateStep = ({
  step,
  stepIndex,
  handleStepHeading,
  handleDeleteStep,
  handleAddField,
  handleClearStep,
  showModal,
  modalIndex,
  toggleModal,
  handleFieldTypeChange,
  handleLabel,
  addOption,
  handlePlaceholder,
  handleSwitchOptionOne,
  handleSwitchOptionTwo,
  handleDeleteField,
  handleOption,
  deleteOption,
  steps,
  setSteps,
  handleHint,
  hanleRequired,
  handleSubmit,
  modalStep,
}) => {
  const [cards, setCards] = useState([
    { id: 1, text: "Card 1" },
    { id: 2, text: "Card 2" },
    // ... other cards
  ]);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    const newArray = [...steps[[stepIndex]].fields];
    console.log(steps[stepIndex].fields);

    [newArray[dragIndex], newArray[hoverIndex]] = [
      newArray[hoverIndex],
      newArray[dragIndex],
    ];
    let stepsss = steps;
    stepsss[stepIndex].fields = newArray;
    // setSteps(stepsss);
    console.log(stepsss[stepIndex].fields);
    setSteps([...stepsss]);
  });

  const renderCard = useCallback(
    (card, index) => (
      <Card
        modalStep={modalStep}
        field={card}
        fieldIndex={index}
        showModal={showModal}
        modalIndex={modalIndex}
        toggleModal={toggleModal}
        handleFieldTypeChange={handleFieldTypeChange}
        stepIndex={stepIndex}
        handleLabel={handleLabel}
        addOption={addOption}
        handlePlaceholder={handlePlaceholder}
        handleSwitchOptionOne={handleSwitchOptionOne}
        handleSwitchOptionTwo={handleSwitchOptionTwo}
        handleDeleteField={handleDeleteField}
        handleOption={handleOption}
        deleteOption={deleteOption}
        key={card.id}
        index={index}
        id={card.id}
        text={card.text}
        moveCard={moveCard}
        handleHint={handleHint}
        hanleRequired={hanleRequired}
      />
    ),
    [moveCard]
  );

  // useEffect(() => {
  //   const driverObj = driver({
  //     showProgress: true,
  //     steps: [
  //       {
  //         element: ".step-heading-indicate",

  //         popover: {
  //           title: "Step Heading",
  //           description: "Well done now add a step heading",
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
    <div>
      {/* <>
        <div>{cards.map((card, i) => renderCard(card, i))}</div>
      </> */}
      <div>
        <div className="flex justify-between items-center mt-2">
          <div className="step-heading my-1">Step {stepIndex + 1}</div>{" "}
          <div>
            <div className="flex items-center gap-2">
              <div
                className="cursor-pointer"
                onClick={() => handleDeleteStep(stepIndex)}
              >
                <BgDeleteIcon />
              </div>
              <div>
                <DragIcon />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 ">
          <div>
            <div>
              <label>Step Heading</label>
            </div>
            <div className="step-heading-indicate">
              {" "}
              <input
                onChange={(e) => handleStepHeading(e, stepIndex)}
                value={step.step_heading}
                type="text"
                maxLength={30}
                name=""
                id=""
                placeholder="Step heading"
              />{" "}
            </div>
          </div>
          <div>
            {" "}
            <div className="invisible">
              <label>Form Heading</label>
            </div>
            <div className="flex justify-end mt-1 items-center gap-2">
              <div>
                {" "}
                <button
                  className="add-input-indicate"
                  onClick={() => handleAddField(stepIndex)}
                >
                  <BgAddIcon />
                </button>{" "}
              </div>
            </div>
          </div>
        </div>

        <div></div>

        {step.fields.map((field, fieldIndex) => renderCard(field, fieldIndex))}

        <div className="flex justify-end items- mt-3 gap-3">
          <button
            onClick={() => handleSubmit("draft")}
            className="save-step-btn rounded-md cursor-pointer"
          >
            Save
          </button>
          <button
            onClick={() => handleClearStep(stepIndex)}
            className="clear-step-btn rounded-md"
          >
            Clear
          </button>
        </div>
        <div className="mt-2">
          {" "}
          <hr />
        </div>
      </div>
    </div>
  );
};

//   <GenerateField
//     field={field}
//     fieldIndex={fieldIndex}
//     showModal={showModal}
//     modalIndex={modalIndex}
//     toggleModal={toggleModal}
//     handleFieldTypeChange={handleFieldTypeChange}
//     stepIndex={stepIndex}
//     handleLabel={handleLabel}
//     addOption={addOption}
//     handlePlaceholder={handlePlaceholder}
//     handleSwitchOptionOne={handleSwitchOptionOne}
//     handleSwitchOptionTwo={handleSwitchOptionTwo}
//     handleDeleteField={handleDeleteField}
//     handleOption={handleOption}
//     deleteOption={deleteOption}
//   />
