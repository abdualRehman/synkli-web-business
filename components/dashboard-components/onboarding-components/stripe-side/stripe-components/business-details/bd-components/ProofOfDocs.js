import { useState } from "react";
import "./css/proofOfDocs.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ProofOfDocs = ({ handleCondition }) => {
  const [abn, setAbn] = useState(false);
  const [asic, setAsic] = useState(false);
  const [abr, setAbr] = useState(false);
  const [changeNameCertificate, setChangeNameCertificate] = useState(false);
  const [ausCharities, setAusCharities] = useState(false);
  const [caae, setCaae] = useState(false);
  const [other, setOther] = useState(false);

  const isAnyTrue = (obj) => {
    return Object.values(obj).some((value) => value === true);
  };

  const showNext = () => {
    const proofOfDocsObj = {
      abn,
      asic,
      abr,
      changeNameCertificate,
      ausCharities,
      caae,
      other,
    };
    if (isAnyTrue(proofOfDocsObj)) {
      handleCondition(5);
    } else {
      toast.error("Please select atleast one option.");
    }
  };

  return (
    <div className="p-5 docs-proof">
      <ToastContainer />
      <div className="docs-proof-inner">
        <div>
          <div className="main-heading px-3 mt-3">
            Please pick which document you’d like to upload in order to verify
            your business
          </div>

          <div className="px-3 check-form mt-5">
            <div className="flex gap-2">
              <div className="mt-1">
                <input
                  onChange={(e) => setAbn(e.target.checked)}
                  type="checkbox"
                />
              </div>
              <div>
                Australian Business Number Confirmation(Certificate of
                Registration)
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <div className="mt-1">
                <input
                  onChange={(e) => setAsic(e.target.checked)}
                  type="checkbox"
                />
              </div>
              <div>
                Australian Securities and Investments Commission (ASIC) Record
                of Registration(Certificate of Registration)
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <div className="mt-1">
                <input
                  onChange={(e) => setAbr(e.target.checked)}
                  type="checkbox"
                />
              </div>
              <div>
                Australian Business Register Extract(Commercial Register
                Extract)
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <div className="flex justify-center items-center">
                <input
                  onChange={(e) => setChangeNameCertificate(e.target.checked)}
                  type="checkbox"
                />
              </div>
              <div>Certificate of Registration of Change of Name</div>
            </div>

            <div className="flex gap-2 mt-3">
              <div className="mt-1">
                <input
                  onChange={(e) => setAusCharities(e.target.checked)}
                  type="checkbox"
                />
              </div>
              <div>
                Australian Charities and Not-For-Profits Commission
                Extract(Charity or Non-Profit Extract)
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <div className="flex justify-center items-center">
                <input
                  onChange={(e) => setCaae(e.target.checked)}
                  type="checkbox"
                />
              </div>
              <div>Consumer Affair Association Extract</div>
            </div>

            <div className="flex gap-2 mt-3">
              <div className="flex justify-center items-center">
                <input
                  onChange={(e) => setOther(e.target.checked)}
                  type="checkbox"
                />
              </div>
              <div>Other</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={showNext}
          className="add-btn text-white px-5 py-2 rounded-lg"
        >
          Continue to upload
        </button>
      </div>
    </div>
  );
};

export default ProofOfDocs;
