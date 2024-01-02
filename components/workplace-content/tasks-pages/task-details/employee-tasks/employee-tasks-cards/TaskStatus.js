import React from "react";
import { TaskCard } from "./TaskCard";
const colors = ["#EDF6FF", "#D8F895", " #F0EBFF", "#EDF6FF", "#FFF4EB"];
const task = {
  task_id: "a6bbae35-70ef-406b-b864-92a979042788",
  business_id: "a6a85713-6833-431e-b974-77cde0398534",
  task_status_id: "dd858c8d-a60e-4302-828b-d57b487e4bdd",
  created_by: {
    user_id: "e462b5c4-a34e-4e15-8102-935d982d202a",
    first_name: "ali ",
    last_name: "raza",
    email: "rejojom222@othao.com",
    image: null,
    status: "inactive",
  },
  title: "title",
  description: "<p>desc</p>",
  start_date: "07-11-2023",
  end_date: "23-11-2023",
  reference_number: "04555555",
  status: "active",
  created_at: "2023-11-07T04:22:26Z",
  updated_at: "2023-11-07T04:22:26Z",
  customer: {
    user_id: "a4bb2e04-fed6-493e-9802-b948e095a5e4",
    email: "wazirkhan250@gmail.com",
    first_name: "wazir",
    last_name: "khan",
    image: null,
    phone_number: "0453453453",
    user_type: "customer",
    fcm: '[{"fcm_token":"f13aLeZ8RCKrwW0ZDdZSyx:APA91bGXAHYXYL7r2u0A0QFXj_OCb03tnwjaH7HwWoNQ-Ao6WSHuTdB3j6S_41uy3wuEW2Awr9i6eQEMx7GFLauf73l9ErfsCDYmlRt7pY8vu0ohirZlQsT5x_mPUVUdky8z0Ll7XXd0"},{"fcm_token":"fqF4p7rqSc2b13eYQzMQNG:APA91bFHCXMOFt3Vw73ETeKB9npjHbvAifCuG862f1lL6AwvdBeuhczu2qF8yLR_HQhfGUqgwuWsuNxD01krV8EeLkTsaViuNg2WOSQFSS5jKVaGdvtFxhv91c4mW75Na-NXH9y3akBS"}]',
    customer_id: "62facc1b-5f44-47b3-b1b7-a741641b5551",
  },
  employees: [
    {
      user_id: "e462b5c4-a34e-4e15-8102-935d982d202a",
      first_name: "ali ",
      last_name: "raza",
      email: "rejojom222@othao.com",
      image: null,
      status: "inactive",
    },
  ],
  attachments: [
    {
      task_files_id: "404be3f9-948f-4504-9300-60f06c9f4f4c",
      task_id: "a6bbae35-70ef-406b-b864-92a979042788",
      name: "image.jpg (1) (3) (1).jpg",
      url: "https://synkli-0.s3.us-east-1.amazonaws.com/employee/a6a85713-6833-431e-b974-77cde0398534/62facc1b-5f44-47b3-b1b7-a741641b5551/e462b5c4-a34e-4e15-8102-935d982d202a/task_files/1699330943568/image.jpg%20%281%29%20%283%29%20%281%29.jpg",
      size: 1030654,
      file_type: "image/jpeg",
    },
  ],
  task_type: {
    task_type_id: "3726af49-d50d-4641-805a-73b931fce0c6",
    label: "organizational",
  },
};
export const TaskStatus = ({ status, index }) => {
  return (
    <div>
      {" "}
      <div>
        <div className=" mb-5">
          <div className="bar-container text-black">
            <div
              style={{ backgroundColor: colors[index % colors.length] }}
              className="task-created-bar shadow flex justify-between mr-1"
            >
              <div>{status.label}</div>
              <div>
                <div></div>
                <div className="flex gap-2 items-center">
                  <span className="task-length mr-2">
                    {status?.tasks?.length}
                  </span>

                  {/* <span onClick={handleAddTask} className="cursor-pointer ">
                <BigPlusIcon />
              </span> */}
                </div>
              </div>
            </div>
          </div>
          <div className="  task-created-container">
            {status &&
              status?.tasks?.map((task) => (
                <TaskCard status={status} task={task} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
