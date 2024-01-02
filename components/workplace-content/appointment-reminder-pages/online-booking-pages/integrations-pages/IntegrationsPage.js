import "./css/integrations.css";
import IntegrationsJumbo from "./IntegrationsJumbo";
import IntegrationsCards from "./IntegrationsCards";
const IntegrationsPage = () => {
  return (
    <div>
      <IntegrationsJumbo />
      <div>
        <IntegrationsCards />
      </div>
    </div>
  );
};

export default IntegrationsPage;
