import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import PropertyService from "../../service/PropertyService";
import cl from "./Property.module.css";

import Skeleton from "react-loading-skeleton";
import { ImageGallery } from "../../modules/ImageGallery/ImageGallery";
import { maskToPrice } from "../../utils/mask";
import { Button } from "../../components/UI/Button/Button";
import { Icon } from "../../components/UI/Icon/Icon.jsx";
import { QuestionBlock } from "../../components/UI/QuestionBlock/QuestionBlock.jsx";
import { Tooltip } from "../../components/UI/Tooltip/Tooltip.jsx";
import { Breadcrumbs } from "../../components/UI/Breadcrumbs/Breadcrumbs.jsx";

export const Property = () => {
  const { t, i18n } = useTranslation();
  const user = useSelector((state) => state.auth);
  const [property, setProperty] = useState(null);
  const [developer, setDeveloper] = useState(null);
  const [activeButton, setActiveButton] = useState(0);
  const [questionData, setQuestionData] = useState([]);
  const [courseRating, setCourseRating] = useState(0);
  const navigate = useNavigate();

  const [descriptions, setDescriptions] = useState([]);

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(
    Array.from({ length: 5 }, () => false)
  );

  const { id } = useParams();

  console.log(11, id)

  const descriptionsArray = descriptions.map((descriptionInfo, index) => (
    <div key={index} className={cl.descriptionItem}>
      <div className={cl.top}>
        <div className={cl.title}>
          {
            descriptionInfo.title[
              i18n.language == "en" ? 0 : i18n.language == "ru" ? 1 : 2
            ]
          }
        </div>
        <div className={cl.infoIcon}>
          <Tooltip />
        </div>
      </div>
      <div className={cl.descText}>
        {
          descriptionInfo.value[
            i18n.language == "en" ? 0 : i18n.language == "ru" ? 1 : 2
          ]
        }
      </div>
    </div>
  ));

  const handleReserveButtonClick = () => {
    if (
      user.userData?.iin === undefined ||
      user.userData?.address === undefined ||
      user.userData?.numberOfDocument === undefined
    ) {
      return navigate(`/editProfile/${property?._id}`);
    }
    navigate(`/payment/${property?._id}`);
  };

  const favoriteHandler = async () => {
    if (!user || !user?.isAuth) {
      return navigate("/login");
    }

    if (user?.userData?.favorites?.items?.includes(id)) {
      await PropertyService.removeFavorite(id);
    } else {
      await PropertyService.addFavorite(id);
    }
    window.location.reload();
  };

  const loadData = async () => {
    console.log(53, id)
    const property = await PropertyService.getProperty(id).then(async (res) => {
      console.log(55, res)

      console.log(17, res?.data?.developer)
      const developer = await PropertyService.getDeveloper(
        res?.data?.developer || res?.data?.author
      );
      console.log(16, developer)
      setDeveloper(developer.data);
      if(res?.data?.rating){
        setCourseRating(res?.data?.rating);
      }
      return res;
    });

    setProperty(property.data);
    const propertyData = [
      property?.data?.description
    ];

    setQuestionData((prevData) => [...prevData, ...propertyData]);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
  }, [activeButton]);

  useEffect(() => {
    console.log(property);
    console.log(99, questionData);
  }, [property]);

  return (
    <div className='wrapper'>
      <Breadcrumbs
        path={["property"]}
        name={[
          property?.title[
            i18n.language == "en" ? 0 : i18n.language == "ru" ? 1 : 2
          ],
        ]}
      />
      <ImageGallery images={property?.images} id={id} video={property?.video} />
      <div className={cl.pageContent}>
        <div className={cl.pageLeft}>

          <div className={cl.card}>
            <div className={cl.leftSide}>
              <div className={cl.cardTitle}>
                {property ? (
                  property.title[
                    i18n.language == "en" ? 0 : i18n.language == "ru" ? 1 : 2
                  ]
                ) : (
                  <Skeleton width={200} />
                )}
              </div>
              <div className={cl.subtitle}>
                <div className={cl.subtitleLeft}>
                  <div className={cl.type}>{t("property.type")}</div>
                  <div className={cl.valueLeft}>
                    {t("property.residential")}
                  </div>
                </div>
                <div className={cl.subtitleRight}>
                  <div className={cl.type}>{t("property.cost")}</div>
                  <div className={cl.valueRight}>
                    {property ? (
                      `${maskToPrice(property.price)}`
                    ) : (
                      <Skeleton width={150} />
                    )}
                  </div>
                </div>
              </div>
              <div className={cl.subtitle}>
                <div className={cl.subtitleLeft}>
                  <div className={cl.type}>{ "Rating "}</div>
                  <div className={cl.valueLeft}>
                    {property ? (
                      `${courseRating} / 5`
                    ) : (
                      <Skeleton width={150} />
                    )}
                  </div>
                </div>
              </div>
              <div className={cl.emblem}>
                <div className={cl.emblemIcon}>
                  <Icon name='emblem' />
                </div>
                <div className={cl.emblemText}>
                  {developer ? (
                    developer.title[
                      i18n.language == "en" ? 0 : i18n.language == "ru" ? 1 : 2
                    ]
                  ) : (
                    <Skeleton width={100} />
                  )}
                </div>
              </div>
            </div>
            <div className={cl.rightSide}>
              <div className={cl.favorite} onClick={favoriteHandler}>
                <div className={cl.favIcon}>
                  {user?.userData?.favorites?.items?.includes(id) ? (
                    <Icon name={"favoriteFilled"} />
                  ) : (
                    <Icon name={"favorite"} />
                  )}
                </div>
                <div className={cl.favText}>
                  {user?.userData?.favorites?.items?.includes(id) ? (
                    <>{t("property.saved")}</>
                  ) : (
                    <>{t("property.favorite")}</>
                  )}
                </div>
              </div>
              <Button
                className={cl.button}
                onClick={handleReserveButtonClick}
                type='fill'
              >
                {property?.saleType === "auccion"
                  ? t("property.reserveAuccion")
                  : t("property.reserve")}
              </Button>
            </div>
          </div>
          <div className={cl.secondCard}>
  
            <div className={cl.description}>
              <div className={cl.descriptionContainer}>{descriptionsArray}</div>
            </div>
            <div className={cl.aboutDev}>
              <div className={cl.aboutDevTop}>
                <div className={cl.buildingIcon}>
                  <Icon name='building' />
                </div>
                <div className={cl.aboutDevTitle}>{t("property.aboutDev")}</div>
              </div>
              <div className={cl.aboutDevText}>
                <div className={cl.rank}>
                  <div className={cl.rankTitle}>{t("property.rank")}</div>
                  <div className={cl.rankValue}>
                    {developer ? developer.rating : <Skeleton width={100} />}
                  </div>
                </div>
                <div className={cl.solvency}>
                  <div className={cl.solvencyTitle}>
                    {t("property.solvency")}
                  </div>
                  <div className={cl.solvencyValue}>
                    {developer ? (
                      developer.financialStability
                    ) : (
                      <Skeleton width={100} />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={cl.QuestionBlocks}>
              {questionData.map((question, index) => (
                <QuestionBlock
                  key={index}
                  title={t(`property.description.${index + 1}.title`)}
                  content={
                    question[
                      i18n.language == "en" ? 0 : i18n.language == "ru" ? 1 : 2
                    ]
                  }
                  count={index + 1}
                  border={cl.border}
                  active={cl.activeQuestionBlock}
                  flatIcon={false}
                  answer={cl.content}
                  lastBlock={index === 5 && true}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={cl.pageRight}>
        </div>
      </div>
    </div>
  );
};
