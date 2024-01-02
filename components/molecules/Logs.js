import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import "./css/molecules.css";
import { SmallLoader } from "components/common/SmallLoader";
import { generateId } from "utills/uid";
import { DefaultUserIcon } from "utills/svgs/DefaultUserIcon";
import { PhotoIconWhite } from "utills/svgs/PhotoIconWhite";
import { bitsToMegabytes } from "utills/moment";
export const Logs = ({ height, more, fetchMore, datalength, logs }) => {
  function MyComponent({ htmlContent }) {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  }
  return (
    <div>
      <InfiniteScroll
        dataLength={datalength}
        next={fetchMore}
        className="scroler-component"
        height={250}
        hasMore={true}
        loader={
          <div className="w-full flex justify-center items-center">
            <SmallLoader />
          </div>
        }
      >
        <div className="customer-log-container">
          {" "}
          {logs?.map((log, index) => (
            <div key={generateId()} className="relative log">
              {log?.user?.image ? (
                <div className="activity-img-wrapper">
                  <img
                    src={log.user.image}
                    alt="src"
                    className="activity-img"
                  />
                </div>
              ) : (
                <div className="default-icon-wrap">
                  {" "}
                  <span className="default-icon-self ">
                    <DefaultUserIcon />{" "}
                  </span>
                </div>
              )}
              <div className="activity-details pl-5 py-3">
                <div className="activity-text">
                  {<MyComponent htmlContent={log.text} />}
                </div>

                <div className="flex items-center gap-2 flex-wrap mt-2">
                  {log?.files?.length > 0 &&
                    log?.files?.map((file, fileindex) => (
                      <a className="log-file-wrap" href={file?.url}>
                        <div className="log-file-container flex gap-2 items-center">
                          <div>
                            {" "}
                            <PhotoIconWhite />{" "}
                          </div>
                          <div className="log-flile-info">
                            <div className="log-file-text">
                              {" "}
                              {file?.name.slice(0, 10)}{" "}
                            </div>
                            <div className="log-file-size">
                              {" "}
                              {bitsToMegabytes(file?.size ?? 0)}{" "}
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                </div>

                <div className="activity-date mt-1">{log.created_at}</div>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};
