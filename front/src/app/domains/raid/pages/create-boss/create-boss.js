import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
// import classnames from "classnames";
import { Page, isTruthy } from "../../../../shared";
import { RaidContext, RaidContextProvider } from "../../components/context-raid/context-raid";
import FormBoss from "../../components/form-boss/form-boss";
import { createBoss } from "../../services";
import "./create-boss.scss";

const InnerPage = () => {
  const { raidId } = useContext(RaidContext);
  const backLink = `/raid/${raidId}`;
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
    createBoss(raidId, boss).then(() => history.push(backLink));
  };

  return (
    <Page className="create-boss-page">
      <Link to={backLink}>Revenir au raid</Link>
      <h1 className="create-boss-page__title">Ajouter un boss</h1>
      <FormBoss className="create-boss-page__form" onSubmit={handleSubmit} onValidate={handleValidate} />
    </Page>
  );
};

const CreateBossPage = () => <RaidContextProvider><InnerPage /></RaidContextProvider>;
export default CreateBossPage;
