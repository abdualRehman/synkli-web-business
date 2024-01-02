import WorkplaceApps from "./workplace-apps/WorkplaceApps";
const WorkplaceContent = ({ toggleShowAddApp, appsUpdated}) => {
  return (
    <div>
      <WorkplaceApps toggleShowAddApp={toggleShowAddApp} appsUpdated={appsUpdated} />
    </div>
  );
};

export default WorkplaceContent;
