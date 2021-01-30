import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Page } from "../../shared";
import { ImageLoader } from "../../domains/image";
import { formatAmount } from "../../utils";
import { fetchRaidById } from "../../services";
import "./raid-detail.scss";

const RaidDetail = () => {
  const { id } = useParams();
  const [raidDetail, setRaidDetail] = useState({});

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
        <a className="links__target" href={target}>{label || target}</a>
      </li>
    );
  };

  const generateSection = (section) => {
    const { id: sectionId, title } = section;
    const links = raidDetail?.sectionLink?.filter((linkContent) => linkContent?.section === sectionId);

    return (
      <li className="boss__section__item">
        <span className="boss__section__title">{title}</span>
        <ul className="boss__section__links">{links.map(generateSectionLink)}</ul>
      </li>
    );
  };

  const generateBossFrame = (boss) => {
    const {
      id: bossId, health, breakBar, addBreakBar, hitBoxSize, armor, timer, name: bossName, image,
    } = boss;
    const section = raidDetail?.section?.filter((sectionContent) => sectionContent?.boss === bossId);
    return (
      <li className="raid__boss">
        <span>{bossName}</span>
        {image && <ImageLoader type={image?.type} imageKey={image?.key} />}
        <div className="raid__boss__detail">
          <span className="raid__boss__data">{formatAmount(health)}</span>
          <span className="raid__boss__data">{breakBar}</span>
          <span className="raid__boss__data">{addBreakBar}</span>
          <span className="raid__boss__data">{hitBoxSize}</span>
          <span className="raid__boss__data">{armor}</span>
          <span className="raid__boss__data">{timer}</span>
        </div>
        <ul className="raid__boss__section">{section.map(generateSection)}</ul>
      </li>
    );
  };

  return (
    <Page className="raid-detail-page">
      <Link to={`/raid/${id}/edit`}>Modifier</Link>
      <h1 className="raid-detail-page__title">{raidDetail?.name}</h1>
      <ul>{raidDetail?.boss?.map(generateBossFrame)}</ul>
    </Page>
  );
};

export default RaidDetail;
