import React, { useEffect, useState } from "react";
import cl from "./AuthorProfile.module.css";
import { Icon } from "../../components/UI/Icon/Icon.jsx";
import { useSelector } from "react-redux";
import { EditModalForm } from "../../modules/EditModalForm/EditModalForm.jsx";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthorService from "../../service/AuthorService.js";
import { AuthorProducts } from "../../modules/AuthorProducts/AuthorProducts.jsx";

export const AuthorProfile = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location?.state?.url === "courses" ? "courses" : "books"
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [author, setAuthor] = useState();
  const { id } = useParams();
  const [editTab, setEditTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);

  const getInitials = (name) => {
    if (!name) return "";

    const namesArray = name.split(" ");
    return (
      namesArray[0].charAt(0).toUpperCase() +
      (namesArray.length > 1 ? namesArray[1].charAt(0).toUpperCase() : "")
    );
  };

  const loadData = async () => {
    console.log("Author Page. Id: ", id)
    const data = await AuthorService.getById(id).then(async (res) => {
      return res.data;
    });

    setAuthor(data)
  };

  useEffect(() => {
    loadData();
    setIsLoading(false);
  }, []);


  return (
    <div className={cl.root}>
      <div className={cl.bg} />
      <div className='wrapper'>
        <div className={cl.wrapper}>
          <div className={cl.main}>
            <div className={cl.leftSide}>
              <div className={cl.block}>
                <div className={cl.avatar}>
                  <div className={cl.iconText}>{getInitials(`${author?.firstName}${author?.lastName ? ' ' + author?.lastName : ''}`)}</div>
                </div>

                <div className={cl.name}>{`${author?.firstName}${author?.lastName ? ' ' + author?.lastName : ''}`}</div>

                <div className={cl.email}>
                  <div className={cl.leftProfile}>
                    <div className={cl.icon}>
                      <Icon name='email' />
                    </div>
                    <div className={cl.text}>{author?.email}</div>
                  </div>
                </div>

                <div className={cl.phone}>
                  <div className={cl.leftProfile}>
                    <div className={cl.icon}>
                      <Icon name='phone' />
                    </div>
                    <div className={cl.text}>{author?.phoneNumber}</div>
                  </div>
                </div>
              </div>


              {isEditModalOpen && (
                <EditModalForm
                  onClose={() => {
                    setIsEditModalOpen(false);
                  }}
                  tab={editTab}
                />
              )}
            </div>
            <div className={cl.rightSide}>
              <div className={cl.switch}>
                <div
                  className={`${cl.switchText} ${
                    activeTab === "books" ? cl.active : ""
                  }`}
                  onClick={() => setActiveTab("books")}
                >
                  {"Books"}
                </div>
                <div
                  className={`${cl.switchText} ${
                    activeTab === "courses" ? cl.active : ""
                  }`}
                  onClick={() => setActiveTab("courses")}
                >
                  {"Courses"}
                </div>
              </div>
              <div className={cl.line} />

              {activeTab === "books" && (
                <div className={cl.favorite}>
                  <AuthorProducts
                    activeTab={activeTab}
                    isCLoading={isLoading}
                    products={author?.books}
                  />
                </div>
              )}
              {activeTab === "courses" && (
                <div className={cl.courses}>
                  <AuthorProducts activeTab={activeTab} isCLoading={isLoading} products={author?.courses} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
