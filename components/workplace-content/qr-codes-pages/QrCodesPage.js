import QrCodesJumbo from "./QrCodesJumbo";
import QrCodesOperation from "./QrCodesOperations";
import QrCodesList from "./QrCodesList";
import NoQrCodes from "./NoQrCode";
import "./css/qrcodes.css";
import { useState, useEffect } from "react";
import {
  getAllQrCodesThunk,
  archiveQrCodeThunk,
} from "store/workspace/workspaceQrCode";
import Cookies from "js-cookie";
import { BUSINESS_ID } from "utills/globalVars";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { handleSingleCode, setLoader } from "store/global/globalReducer";
import ConfirmationModal from "utills/confirmationModal";

const QrCodesPage = ({ toggleAddQrCode, qrCodeUpdated, toggleSingleCode }) => {
  const dispatch = useDispatch();
  const business_id = localStorage.getItem(BUSINESS_ID);
  const { data } = useSelector((state) => state.getAllQrCodes);

  const [searchValue, setSearchValue] = useState("");
  const [qr_code_id, setQrCodeId] = useState("");
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleDelete = () => {
    setIsConfirmationOpen(false);
    const payload = {
      business_id,
      qr_code_id,
    };
    dispatch(archiveQrCodeThunk(payload))
      .then((response) => {
        if (response.payload) {
          setQrCodeId("");
          handleGetAllQrCodes({ business_id });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function searchByItem(value) {
    setSearchValue(value);
  }

  const filteredCodes = data?.filter(
    (row) =>
      row.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      row.branch_name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleGetAllQrCodes = (payload) => {
    dispatch(setLoader(true));
    dispatch(getAllQrCodesThunk(payload))
      .then((response) => {
        console.log(response.payload);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };

  useEffect(() => {
    handleGetAllQrCodes({
      business_id,
    });
  }, [qrCodeUpdated]);

  const handleArchiveQrCodeId = (qr_code_id) => {
    setQrCodeId(qr_code_id);
  };

  const handleArchiveQrCode = () => {
    if (!qr_code_id) {
      return;
    }

    setIsConfirmationOpen(true);
  };

  const handleCode = (qr_code_id) => {
    const code = data?.find((c) => c?.qr_code_id === qr_code_id);
    if (code) {
      dispatch(handleSingleCode(code));
      toggleSingleCode();
    }
  };

  return (
    <div>
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleDelete}
      />
      <QrCodesJumbo />
      <div>
        <QrCodesOperation
          toggleAddQrCode={toggleAddQrCode}
          searchByItem={searchByItem}
          qr_code_id={qr_code_id}
          handleArchiveQrCode={handleArchiveQrCode}
        />
      </div>
      <div>
        {!filteredCodes?.length ? (
          <NoQrCodes />
        ) : (
          <QrCodesList
            handleCode={handleCode}
            qrcodes={filteredCodes}
            handleArchiveQrCodeId={handleArchiveQrCodeId}
          />
        )}
      </div>
    </div>
  );
};

export default QrCodesPage;
