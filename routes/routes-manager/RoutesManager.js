import React from "react";
import { Route, Routes } from "react-router-dom";
import { AllRoutes } from "routes";
import { generateId } from "utills/uid";

export const RoutesManager = () => {
  return (
    <div>
      <Routes>
        {AllRoutes.map((layout, index) => (
          <Route key={generateId()} path={layout.path} element={layout.element}>
            {layout?.routes.map((route) => (
              <Route
                key={generateId()}
                path={route.path}
                element={route.component}
              />
            ))}
          </Route>
        ))}
      </Routes>
    </div>
  );
};
