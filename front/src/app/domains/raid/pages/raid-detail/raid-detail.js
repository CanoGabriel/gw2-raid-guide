import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Page, TabContent, TabNav, useTab,
} from "../../../../shared";
import { ImageLoader } from "../../../image";
import { formatAmount } from "../../../../utils";
import { fetchRaidById } from "../../../../services";
import "./raid-detail.scss";

const RaidDetail = () => {
  const { id } = useParams();
  const [raidDetail, setRaidDetail] = useState({});
  const bossTabConfig = useTab();

  const handleFetchRaidDetail = () => {
    fetchRaidById(id).then((response) => {
      setRaidDetail(response?.data?.result || {});
    });
  };

  useEffect(handleFetchRaidDetail, []);

  const generateSectionLink = (sectionLink) => {
    const { target = "", label = "" } = sectionLink;
    return (
      <li className="links__link">
        <a className="links__target" href={target} target="_blank" rel="noopenner noreferrer">{label || target}</a>
      </li>
    );
  };

  const generateSection = (section) => {
    const { id: sectionId, title } = section;
    const links = raidDetail?.sectionLink?.filter((linkContent) => linkContent?.section === sectionId);

    return (
      <li className="boss__section__item">
        <h2 className="boss__section__title">{title}</h2>
        <ul className="boss__section__links">{links.map(generateSectionLink)}</ul>
      </li>
    );
  };

  const generateBossTabNav = (bossDetail) => (
    <TabNav
      className="boss__navlink"
      activeClassName="boss__navlink--active"
      id={bossDetail?.id}
      tabNavConfig={bossTabConfig}
    >
      <span className="boss__navlink__wrapper">{bossDetail?.name}</span>
    </TabNav>
  );
  const generateBossTabContent = (bossDetail) => {
    const {
      id: bossId, health, breakBar, addBreakBar, hitboxSize, armor, timer, name: bossName, image,
    } = bossDetail;
    const section = raidDetail?.section?.filter((sectionContent) => sectionContent?.boss === bossId);

    return (
      <TabContent
        id={bossDetail?.id}
        activeClassName="boss"
        tabNavConfig={bossTabConfig}
      >
        <div className="boss__metadata">
          <span className="boss__field boss__name">{bossName}</span>
          {image && <ImageLoader className="boss__image" type={image?.type} imageKey={image?.key} />}
          <span className="boss__field boss__health">
            {`${formatAmount(health)} PV`}
          </span>
          <span className="boss__field boss__break-bar">{breakBar}</span>
          <span className="boss__field boss__add-break-bar">{addBreakBar}</span>
          <span className="boss__field boss__hitbox-size">{hitboxSize}</span>
          <span className="boss__field boss__armor">{armor}</span>
          <span className="boss__field boss__timer">{timer}</span>
        </div>
        <ul className="raid__boss__section">{section.map(generateSection)}</ul>
      </TabContent>
    );
  };

  useEffect(() => {
    // show first boss by default in tab
    if (!bossTabConfig?.activeTab) {
      const bossList = raidDetail?.boss || [];
      bossTabConfig?.setActiveTab(bossList[0]?.id);
    }
  }, [raidDetail]);

  return (
    <Page className="raid-detail-page">
      <h1 className="raid-detail-page__title">{raidDetail?.name}</h1>
      <div className="boss__wrapper">
        <ul className="boss__nav">{raidDetail?.boss?.map(generateBossTabNav)}</ul>
        {raidDetail?.boss?.map(generateBossTabContent)}
      </div>
      <div className="test-menu"><span>coucou</span></div>
    </Page>
  );
};

export default RaidDetail;
