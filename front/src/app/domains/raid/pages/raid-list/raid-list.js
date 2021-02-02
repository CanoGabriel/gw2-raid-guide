import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAllRaid } from "../../../../services";
import {
  Button, Page, usePopup, IconWrapper, AddIcon,
} from "../../../../shared";
import PopupRaidCreate from "./components/popup-raid/popup-raid";
import RaidCard from "../../components/raid-card/raid-card";
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

  const generateRaidItem = (raidDetail) => {
    const { color, backgroundColor, id } = raidDetail;
    return (
      <li className="raid__item" key={id} style={{ backgroundColor, color }}>
        <Link to={`raid/${id}`}>
          <RaidCard raid={raidDetail} />
        </Link>
      </li>
    );
  };

  return (
    <Page className="raid-list-page">
      <PopupRaidCreate visible={visiblePopupCreateRaid} popupConfig={popupCreateRaidConfig} />
      <h1 className="raid-list-page__title">Raid :</h1>
      <ul className="raid__list">
        {raidList.map(generateRaidItem)}
      </ul>
      <Button onClick={showPopupCreateRaid}><IconWrapper Component={AddIcon} /></Button>
    </Page>
  );
};

export default RaidList;
