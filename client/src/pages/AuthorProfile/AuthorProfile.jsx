import React, { useEffect, useState } from "react";
import cl from "./AuthorProfile.module.css";
import { Icon } from "../../components/UI/Icon/Icon.jsx";
import { useSelector } from "react-redux";
import { EditModalForm } from "../../modules/EditModalForm/EditModalForm.jsx";
import { TeacherProfileBooks } from "../../modules/TeacherProfileBooks/TeacherProfileBooks.jsx";
import { BuyHistory } from "../../modules/BuyHistory/BuyHistory.jsx";
import { useLocation } from "react-router-dom";
import { BookingHistory } from "../../modules/BookingHistory/BookingHistory.jsx";
import { FilesHistory } from "../../modules/FilesHistory/FilesHistory.jsx";
import { AuctionsHistory } from "../../modules/AuctionsHistory/AuctionsHistory.jsx";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import AuthorService from "../../service/AuthorService.js";

export const AuthorProfile = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(
    "favorites"
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const user = useSelector((state) => state.auth.userData);

  const [isDocumentEmpty, setIsDocumentEmpty] = useState(undefined);
  const [editTab, setEditTab] = useState("profile");
  const [isEmailHovered, setIsEmailHovered] = useState(false);
  const [isPhoneHovered, setIsPhoneHovered] = useState(false);
  const [isDocumentHovered, setIsDocumentHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [author, setAuthor] = useState(null);

  const { id } = useParams();

  const getInitials = (name) => {
    if (!name) return "";

    const namesArray = name.split(" ");
    return (
      namesArray[0].charAt(0).toUpperCase() +
      (namesArray.length > 1 ? namesArray[1].charAt(0).toUpperCase() : "")
    );
  };

  const loadData = async () => {
    console.log("Author Profile Page. Author Id: ", id)
  
    const data = await AuthorService.getById(id).then(async (res) => {

      console.log("Product Page. Author: ", res?.data?.author)
      return res.data;
    });

    setAuthor(data);
  };

  useEffect(() => {
    setIsLoading(true);
  }, [activeTab]);


  useEffect(() => {
    loadData();
  }, []);

  const getAuthorName = (author) => {
    if(!author) return ''
    return `${author.firstName}${author.lastName ? ' ' + author.lastName : ''}`
  }

  return (
    <div className={cl.root}>
      <div className={cl.bg} />
      <div className='wrapper'>
        <div className={cl.wrapper}>
          <div className={cl.main}>
            <div className={cl.leftSide}>
              <div className={cl.block}>
                <div className={cl.avatar}>
                  <div className={cl.iconText}>{getInitials(getAuthorName(author))}</div>
                </div>

                <div className={cl.name}>{getAuthorName(author)}</div>

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

                  <div
                    className={cl.edit}
                    onMouseEnter={() => setIsPhoneHovered(true)}
                    onMouseLeave={() => setIsPhoneHovered(false)}
                    onClick={() => {
                      setIsEditModalOpen(true);
                      setEditTab("profile");
                    }}
                  >
                    <Icon name={isPhoneHovered ? "whiteEdit" : "blackEdit"} />
                  </div>
                </div>
              </div>
              <div className={cl.block2}>
                <div className={cl.aboutDocuments}>
                  <div className={cl.aboutDocumentsText}>
                    {t("profile.document")}
                  </div>
                  <div
                    className={cl.edit}
                    onMouseEnter={() => setIsDocumentHovered(true)}
                    onMouseLeave={() => setIsDocumentHovered(false)}
                    onClick={() => {
                      setIsEditModalOpen(true);
                      setEditTab("document");
                    }}
                  >
                    <Icon
                      name={isDocumentHovered ? "whiteEdit" : "blackEdit"}
                    />
                  </div>
                </div>

                {isDocumentEmpty ? (
                  <div className={cl.noDocument}>
                    <div className={cl.noDocumentIcon}>
                      <Icon name='noDocument' />
                    </div>
                    <div className={cl.noDocumentText}>
                      {t("profile.noData")}
                    </div>
                    <div
                      className={cl.noDocumentFill}
                      onClick={() => {
                        setIsEditModalOpen(true);
                        setEditTab("document");
                      }}
                    >
                      {t("profilie.fill")}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={cl.documentNumber}>
                      <div className={cl.top}>
                        {t("profile.numberOfDocument")}
                      </div>
                      <div className={cl.text}>{user?.numberOfDocument}</div>
                    </div>

                    <div className={cl.iin}>
                      <div className={cl.top}>{t("profile.iin")}</div>
                      <div className={cl.text}>{user?.iin}</div>
                    </div>

                    <div className={cl.address}>
                      <div className={cl.top}>{t("profile.address")}</div>
                      <div className={cl.text}>{user?.address}</div>
                    </div>
                  </>
                )}
              </div>

              {isDocumentEmpty && (
                <div
                  className={cl.editButton}
                  onClick={() => {
                    setIsEditModalOpen(true);
                    setEditTab("document");
                  }}
                >
                  <div className={cl.editIcon}>
                    <Icon name='edit' />
                  </div>
                  <div className={cl.editText}>{t("profile.edit")}</div>
                </div>
              )}

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
                    activeTab === "favorites" ? cl.active : ""
                  }`}
                  onClick={() => setActiveTab("favorites")}
                >
                  Books
                </div>
                <div
                  className={`${cl.switchText} ${
                    activeTab === "history" ? cl.active : ""
                  }`}
                  onClick={() => setActiveTab("history")}
                >
                  {t("profile.history")}
                </div>
                <div
                  className={`${cl.switchText} ${
                    activeTab === "files" ? cl.active : ""
                  }`}
                  onClick={() => setActiveTab("files")}
                >
                  {t("profile.files")}
                </div>
                <div
                  className={`${cl.switchText} ${
                    activeTab === "booking" ? cl.active : ""
                  }`}
                  onClick={() => setActiveTab("booking")}
                >
                  {t("profile.booking")}
                </div>
                <div
                  className={`${cl.switchText} ${
                    activeTab === "auctions" ? cl.active : ""
                  }`}
                  onClick={() => setActiveTab("auctions")}
                >
                  {t("profile.auctions")}
                </div>
              </div>
              <div className={cl.line} />

              {activeTab === "favorites" && (
                <div className={cl.favorite}>
                  <TeacherProfileBooks
                    activeTab={activeTab}
                    isCLoading={isLoading}
                    books = {author?.books}
                  />
                </div>
              )}
              {activeTab === "history" && (
                <div className={cl.history}>
                  <BuyHistory activeTab={activeTab} isCLoading={isLoading} />
                </div>
              )}
              {activeTab === "booking" && (
                <div className={cl.history}>
                  <BookingHistory
                    activeTab={activeTab}
                    isCLoading={isLoading}
                  />
                </div>
              )}
              {activeTab === "files" && (
                <div className={cl.history}>
                  <FilesHistory activeTab={activeTab} isCLoading={isLoading} />
                </div>
              )}
              {activeTab === "auctions" && (
                <div className={cl.history}>
                  <AuctionsHistory
                    activeTab={activeTab}
                    isLoading={isLoading}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
