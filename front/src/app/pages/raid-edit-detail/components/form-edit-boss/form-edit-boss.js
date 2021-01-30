import React, { useContext, useState, useEffect } from "react";
import classnames from "classnames/dedupe";
import { RaidContext } from "../context-raid/context-raid";
import FormEditSection from "../form-edit-section/form-edit-section";
import { Button, TextField, usePopup } from "../../../../shared";
import { updateBossInfo, deleteRaidBossById } from "../../../../services";
import PopupAddSection from "../popup-add-section/popup-add-section";
import { ImageSelector, ImageLoader } from "../../../../domains/image";
import "./form-edit-boss.scss";

const FormEditBoss = (props) => {
  const {
    className, bossInfo,
  } = props;

  const {
    raidId, boss, section = [], handleFetchRaid,
  } = useContext(RaidContext);

  const [form, setForm] = useState({});
  const [formInit, setFormInit] = useState({});

  const { popupConfig: popupConfigAddSection, show: showPopupAddSection } = usePopup();

  const bossSection = section.filter(({ boss: bossId } = {}) => bossId === bossInfo?.id);

  const generateBossSection = (sectionInfo) => <FormEditSection className="form-edit-boss__section-item" raidId={raidId} sectionInfo={sectionInfo} />;

  const handleBossUpdate = () => {
    const update = {};
    if (form.hitboxSize) update.hitboxSize = parseInt(form.hitboxSize, 10);
    if (form.health) update.health = parseInt(form.health, 10);
    if (form.breakBar) update.breakBar = parseInt(form.breakBar, 10);
    if (form.timer) update.timer = parseInt(form.timer, 10);
    if (form.armor) update.armor = parseInt(form.armor, 10);
    if (form.name) update.name = form.name;
    if (form.image) update.image = form.image;
    if (form.addBreakBar) update.addBreakBar = parseInt(form.addBreakBar, 10);
    updateBossInfo(raidId, bossInfo.id, update);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((oldForm) => ({ ...oldForm, [name]: value }));
  };

  const renderTextField = (name, label) => {
    const value = form[name] === undefined ? formInit[name] : form[name];
    return (
      <TextField
        onChange={handleFormChange}
        className="form__text-field"
        name={name}
        label={label}
        value={value}
      />
    );
  };

  const handleDelete = () => {
    deleteRaidBossById(raidId, bossInfo.id).then(handleFetchRaid);
  };

  const handleImageChange = (image) => {
    handleFormChange({ target: { name: "image", value: image } });
  };

  useEffect(() => setFormInit(bossInfo), [boss]);
  console.log(formInit?.image, form?.image);
  return (
    <div className={classnames("form-edit-boss", className)}>
      <PopupAddSection bossId={bossInfo.id} popupConfig={popupConfigAddSection} />
      <p>Information du boss</p>
      <form className="form-edit-boss__form">
        {renderTextField("hitboxSize", "Taille de la hitbox")}
        {renderTextField("health", "Santé")}
        {renderTextField("breakBar", "Barre de défiance")}
        {renderTextField("timer", "Timer")}
        {renderTextField("armor", "Armure")}
        {renderTextField("name", "Nom du boss")}
        {renderTextField("addBreakBar", "Bar de défiance des minions")}
        {(form?.image || formInit?.image)
        && <ImageLoader type={form?.image?.type || formInit?.image?.type} imageKey={form?.image?.key || formInit?.image?.key} />}
        <ImageSelector type="boss" onConfirm={handleImageChange} initialValue={form?.image ? form?.image : formInit?.image} />
        <Button className="form-edit-boss__save" onClick={handleBossUpdate}>Save</Button>
      </form>
      <ul className="form-edit-boss__section-list">{bossSection?.map(generateBossSection)}</ul>
      <Button onClick={showPopupAddSection}>Ajouter un paragraphe</Button>
      <Button onClick={handleDelete}>Supprimer ce boss</Button>
    </div>
  );
};

export default FormEditBoss;
