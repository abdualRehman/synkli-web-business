import React from "react";
import "./css/modals.css";
import { motion } from "framer-motion";
export const PermissionsModal = ({ permissions }) => {
  return (
    <motion.div
      initial={{ y: "-50", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, type: "tween", duration: 0.5 }}
      className=" team-modal shadow-xl  "
    >
      <div className="w-full h-full">
        <div className="point-down"></div>
        <div className="module-permissions relative m-2">
          {permissions &&
            permissions.map((p, index) => (
              <div
                key={p.business_module_id}
                className="module-container flex pt-5 items-end relative"
              >
                <div className="module-line"> </div>
                <div className="test-div flex items-center">
                  <div className="module-name pl-5">
                    {" "}
                    {p.business_module_name}{" "}
                  </div>
                  <div className="flex gap-2 flex-wrap pl-2">
                    {p.permissions &&
                      p.permissions.map((pm) => (
                        <div
                          key={pm.permission_id}
                          className={`module-permission ${
                            index + (1 % 2) === 0 && "even-permission"
                          }`}
                        >
                          {" "}
                          {pm.permission_name}{" "}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </motion.div>
  );
};
