import "./css/emailTemplates.css";
import EmailTemplatesJumbo from "./EmailTemplatesJumbo";
import EmailTemplatesTable from "./EmailTemplatesTable";
const EmailTemplatesPage = () => {
  return (
    <div>
      <div>
        <EmailTemplatesJumbo />
      </div>
      <div>
        <EmailTemplatesTable />
      </div>
    </div>
  );
};
export default EmailTemplatesPage;
