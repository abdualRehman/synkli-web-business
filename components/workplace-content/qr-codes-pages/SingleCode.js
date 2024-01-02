import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { DownloadIcon } from "utills/svgs/DownloadIcon";
import { SideTimes } from "utills/svgs/SideTimes";

export const SingleCode = ({ toggleSingleCode }) => {
  const { code } = useSelector((state) => state.global);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = code?.qr_code;
    link.download = code?.title;
    link.click();
  };
  return (
    <div>
      {" "}
      <div className="add-p-side grid grid-cols-6 ">
        <div className="md:col-span-4 hidden md:block left-side"></div>
        <div className="right-side col-span-6 md:col-span-2">
          <motion.div
            initial={{ x: 700 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
            className="inner-right relative"
          >
            <div>
              <div
                onClick={toggleSingleCode}
                className="absolute   text-white p-2 right-1 top-1 cursor-pointer"
              >
                <SideTimes />
              </div>

              <div className="add-detail mt-5  px-5">
                <div className="title">QR Code</div>

                <div className="jumbo-dir p-0">
                  Workspace &gt; QR Codes{" "}
                  <span className="special-jumbo-text">
                    {" "}
                    &gt; {code?.title}
                  </span>
                </div>
              </div>
            </div>
            <div className="m-5">
              <div className="flex justify-end items-center">
                <div
                  onClick={handleDownload}
                  className="form-preview-btn gap-2 cursor-pointer flex items-center px-2 py-2"
                >
                  {" "}
                  <div>
                    <DownloadIcon />
                  </div>
                  <div>Download</div>
                </div>
              </div>

              <div className="flex justify-center items-center mt-5">
                <img src={code?.qr_code} alt="qrcode" className="qrcode" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
