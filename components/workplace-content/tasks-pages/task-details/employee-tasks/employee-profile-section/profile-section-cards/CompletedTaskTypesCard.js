import ProgressBar from "@ramonak/react-progress-bar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const CompletedTaskTypesCard = () => {
  const { data } = useSelector((state) => state.taskCountByType);
  const color = "#b695f8";
  const colors = ["#EDF6FF", "#D8F895", " #F0EBFF", "#EDF6FF", "#FFF4EB"];
  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  const [totalCompleted, setTotalCompleted] = useState(0);

  useEffect(() => {
    let newCount = 0;

    if (data) {
      data?.forEach((type) => {
        newCount = newCount + parseInt(type.count);
      });
    }

    console.log(newCount, "count");
    setTotalCompleted(newCount);
  }, [data]);

  console.log(data, "types");
  return (
    <div className="p-5">
      {" "}
      <div className="chart-title">Completed Task Types</div>
      {data &&
        data?.map((type, index) => (
          <div className="completed-task-type-strip mt-3">
            <div className="flex justify-between items-center">
              <div>{type?.name}</div>
              <div>
                {type?.count}/{totalCompleted}
              </div>
            </div>
            <div className="mt-2">
              {" "}
              <ProgressBar
                completed={type?.count}
                bgColor={getRandomColor()}
                height="5px"
                width="100%"
                animateOnRender={true}
                isLabelVisible={false}
              />
            </div>
          </div>
        ))}
    </div>
  );
};
