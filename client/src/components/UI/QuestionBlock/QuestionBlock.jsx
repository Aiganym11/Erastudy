import React, { useState } from "react";
import { Icon } from "../Icon/Icon.jsx";
import cl from "./QuestionBlock.module.css";
export const QuestionBlock = ({
  title,
  content,
  count,
  flatIcon,
  border,
  active,
  answer,
  lastBlock,
  className,
  video_url
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className={`${cl.block} ${className}`}>
        <div
          className={`${cl.title} ${border} ${isOpen && active} ${
            lastBlock && cl.lastBlock
          }`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <div className={cl.titleText}>
            {count}. {title}
          </div>
          <div
            className={`${cl.icon} ${
              isOpen && flatIcon ? cl.rotated : cl.notRotated
            } ${isOpen && !flatIcon ? cl.rotated2 : ""} ${
              flatIcon && cl.flatIcon
            }`}
          >
            <Icon name={`${flatIcon ? "arrowRight" : "arrowDown"}`} />
          </div>
        </div>
        {isOpen && 
        <div className={`${answer}`}>
          {video_url && (
              <video controls src={video_url} className={cl.videoPlayer}>
                Sorry, your browser does not support embedded videos.
              </video>
            )}
          {content}
        </div>}
      </div>
    </div>
  );
};
