import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAllRaid } from "../../services";
import { Button, Page, usePopup } from "../../shared";
import PopupRaidCreate from "./components/popup-raid/popup-raid";
import "./raid-list.scss";

const RaidList = () => {
  const [raidList, setRaidList] = useState([]);
  const { visible: visiblePopupCreateRaid, show: showPopupCreateRaid, popupConfig: popupCreateRaidConfig } = usePopup();

  const handleFetchRaid = () => {
    fetchAllRaid().then((response) => {
      setRaidList(response?.data?.result || []);
    });
  };

  useEffect(() => {
    handleFetchRaid();
  }, []);

  const generateRaidItem = (raidItem) => {
    const {
      name, id, color, backgroundColor,
    } = raidItem;
    return (
      <li className="raid__item" key={id} style={{ backgroundColor, color }}>
        <Link to={`raid/${id}`}><span>{name}</span></Link>
      </li>
    );
  };

  return (
    <Page className="raid-list-page">
      <PopupRaidCreate visible={visiblePopupCreateRaid} popupConfig={popupCreateRaidConfig} />
      <h1 className="raid-list-page__title">Raid :</h1>
      <ul className="raid__list">
        {raidList.map(generateRaidItem)}
        <Button onClick={showPopupCreateRaid}>Créer</Button>
      </ul>
    </Page>
  );
};

export default RaidList;
