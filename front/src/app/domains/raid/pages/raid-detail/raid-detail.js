import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import {
  IconWrapper,
  Page, TabContent, TabNav, useTab,
} from "../../../../shared";
import { AuthContext } from "../../../user";
import { fetchRaidById } from "../../services";
import { ReactComponent as IconAdd } from "../../../../shared/assets/plus.svg";
import ViewBoss from "../../components/view-boss/view-boss";
import ViewSection from "../../components/view-section/view-section";
import ViewLink from "../../components/view-link/view-link";
import "./raid-detail.scss";

const RaidDetail = () => {
  const { id } = useParams();
  const [raidDetail, setRaidDetail] = useState({});
  const { isAnonymous } = useContext(AuthContext);
  const bossTabConfig = useTab();

  const handleFetchRaidDetail = () => {
    fetchRaidById(id).then((response) => {
      setRaidDetail(response?.data?.result || {});
    });
  };

  useEffect(handleFetchRaidDetail, []);

  const selectFirstBossTab = (activeBossId) => {
    const bossList = raidDetail?.boss || [];
    bossTabConfig?.setActiveTab(activeBossId || bossList[0]?.id);
  };

  const refreshRaidDetails = (activeBossId) => {
    handleFetchRaidDetail();
    selectFirstBossTab(activeBossId);
  };

  const generateSectionLink = (sectionLink) => {
    const { bossId, ...link } = sectionLink;
    return (
      <li className="links__link">
        <ViewLink raidId={id} link={link} onChange={() => refreshRaidDetails(bossId)} />
      </li>
    );
  };

  const generateSection = (section) => {
    const { id: sectionId } = section;
    const links = raidDetail?.sectionLink?.filter((linkContent) => linkContent?.section === sectionId);

    return (
      <li className="boss__section__item">
        <ViewSection
          raidId={id}
          section={section}
          bossId={section?.boss}
          onChange={refreshRaidDetails}
        />
        <ul className="boss__section__links">{links.map((link) => generateSectionLink({ ...link, bossId: section?.boss }))}</ul>
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
    const { id: bossId } = bossDetail;
    const section = raidDetail?.section?.filter((sectionContent) => sectionContent?.boss === bossId);

    return (
      <TabContent
        id={bossDetail?.id}
        activeClassName="boss-tab--active"
        tabNavConfig={bossTabConfig}
      >
        <ViewBoss
          raidId={id}
          boss={bossDetail}
          onDelete={refreshRaidDetails}
          onAddSection={refreshRaidDetails}
        />
        <ul className="raid__boss__section">{section.map(generateSection)}</ul>
      </TabContent>
    );
  };

  useEffect(() => {
    // show first boss by default in tab
    selectFirstBossTab(bossTabConfig?.activeTab);
  }, [raidDetail]);

  return (
    <Page className="raid-detail-page">
      <h1 className="raid-detail-page__title">{raidDetail?.name}</h1>
      {!isAnonymous && (
        <Link className="raid-detail-page__add-boss" to={`/raid/${id}/boss/new`}>
          <IconWrapper className="raid-detail-page__add-boss__icon" Component={IconAdd} />
          <span>Ajouter un boss</span>
        </Link>
      )}
      <div className="boss__wrapper">
        <ul className="boss__nav">{raidDetail?.boss?.map(generateBossTabNav)}</ul>
        {raidDetail?.boss?.map(generateBossTabContent)}
      </div>
      {/* <div className="test-menu"><span>coucou</span></div> */}
    </Page>
  );
};

export default RaidDetail;
