import React, { useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
// import classnames from "classnames";
import { Page, isTruthy } from "../../../../shared";
import { RaidContext, RaidContextProvider } from "../../components/context-raid/context-raid";
import FormBoss from "../../components/form-boss/form-boss";
import { updateBossInfo } from "../../services";
import "./edit-boss.scss";

const InnerPage = () => {
  const { bossId } = useParams();
  const { raidId, bosses } = useContext(RaidContext);
  const backLink = `/raid/${raidId}`;
  const initBoss = bosses?.find((boss) => boss?.id === bossId) || {};
  const history = useHistory();

  const handleValidate = (boss) => {
    const {
      hitboxSize, health, breakBar, timer, armor, name, image, addBreakBar,
    } = boss;

    const hitboxValidator = isTruthy();
    const healthValidator = isTruthy();
    const breakBarValidator = isTruthy();
    const timerValidator = isTruthy();
    const armorValidator = isTruthy();
    const nameValidator = isTruthy();
    const imageValidator = isTruthy();
    const addBreakBarValidator = isTruthy();

    return {
      hitboxSize: !hitboxValidator(hitboxSize),
      health: !healthValidator(health),
      breakBar: !breakBarValidator(breakBar),
      timer: !timerValidator(timer),
      armor: !armorValidator(armor),
      name: !nameValidator(name),
      image: !imageValidator(image),
      addBreakBar: !addBreakBarValidator(addBreakBar),
    };
  };

  const handleSubmit = (boss) => {
    updateBossInfo(raidId, bossId, boss).then(() => history.push(backLink));
  };

  return (
    <Page className="edit-boss-page">
      <Link to={backLink}>Revenir au raid</Link>
      <h1 className="edit-boss-page__title">Modifier le boss</h1>
      <FormBoss className="edit-boss-page__form" onSubmit={handleSubmit} onValidate={handleValidate} init={initBoss} />
    </Page>
  );
};

const EditBossPage = () => <RaidContextProvider><InnerPage /></RaidContextProvider>;
export default EditBossPage;
