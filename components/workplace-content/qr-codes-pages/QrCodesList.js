import { useState } from "react";
import ConfirmationModal from "utills/confirmationModal";

const QrCodesList = ({
  qrcodes,
  handleArchiveQrCodeId,

  handleCode,
}) => {
  const [selectedQRCode, setSelectedQRCode] = useState(null);

  const handleCheckboxChange = (e, code) => {
    if (e.target.checked) {
      setSelectedQRCode(code.qr_code_id);
      handleArchiveQrCodeId(code.qr_code_id);
    } else {
      setSelectedQRCode("");
      handleArchiveQrCodeId("");
    }
  };

  const handleSingleCode = (qr_code_id) => {
    handleCode(qr_code_id);
  };
  return (
    <div className="md:px-10 px-5 mt-5">
      <div className=" grid grid-cols-2 md:grid-cols-4 gap-5">
        {qrcodes.map((code) => (
          <div
            key={code.qr_code_id}
            className={`qrcode-wrapper shadow  relative ${
              selectedQRCode === code.qr_code_id ? "selected" : ""
            }`}
          >
            <div className="flex justify-end items-center m-1">
              {" "}
              <input
                type="checkbox"
                // checked={selectedQRCode === code.qr_code_id ? true : false}
                onChange={(e) => handleCheckboxChange(e, code)}
              />
            </div>
            <div
              onClick={() => handleSingleCode(code?.qr_code_id)}
              className="flex flex-col justify-center items-center"
            >
              <img src={code.qr_code} alt="qrcode" className="qrcode" />
              <div className="code-branch-name">
                {code.title} | {code.branch_name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QrCodesList;
