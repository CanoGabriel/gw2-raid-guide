import React, { useState, useContext } from "react";
import classnames from "classnames/dedupe";
import { Popup, TextField, Button } from "../../../../shared";
import { ImageSelector } from "../../../../domains/image";
import { createBoss } from "../../../../services";
import { RaidContext } from "../context-raid/context-raid";

const PopupAddBoss = (props) => {
  const {
    className, popupConfig, raidId,
  } = props;

  const [form, setForm] = useState({});
  const { handleFetchRaid } = useContext(RaidContext);

  const handleConfirm = (e) => {
    e.preventDefault();
    const info = {};
    if (form.hitboxSize) info.hitboxSize = parseInt(form.hitboxSize, 10);
    if (form.health) info.health = parseInt(form.health, 10);
    if (form.breakBar) info.breakBar = parseInt(form.breakBar, 10);
    if (form.timer) info.timer = parseInt(form.timer, 10);
    if (form.armor) info.armor = parseInt(form.armor, 10);
    if (form.name) info.name = form.name;
    if (form.image) info.image = form.image;
    if (form.addBreakBar) info.addBreakBar = parseInt(form.addBreakBar, 10);
    createBoss(raidId, info).then(handleFetchRaid).then(popupConfig.hide);
  };

  const handleTextFieldChange = (e) => {
    const { name, value } = e.target;
    setForm((oldForm) => ({ ...oldForm, [name]: value }));
  };

  const handleImageChange = (image) => {
    handleTextFieldChange({ target: { name: "image", value: image } });
  };

  return (
    <Popup popupConfig={popupConfig} className={classnames("popup-add-boss", className)}>
      <form className="popup-add-boss__form">
        <TextField onChange={handleTextFieldChange} name="hitboxSize" value={form.hitboxSize} label="Taille de la hitbox" />
        <TextField onChange={handleTextFieldChange} name="health" value={form.health} label="Santé" />
        <TextField onChange={handleTextFieldChange} name="breakBar" value={form.breakBar} label="Barre de défiance" />
        <TextField onChange={handleTextFieldChange} name="timer" value={form.timer} label="Timer" />
        <TextField onChange={handleTextFieldChange} name="armor" value={form.armor} label="Armure" />
        <TextField onChange={handleTextFieldChange} name="name" value={form.name} label="Nom du boss" />
        <TextField onChange={handleTextFieldChange} name="addBreakBar" value={form.addBreakBar} label="Bar de défiance des minions" />
        <ImageSelector type="boss" onConfirm={handleImageChange} />
        <Button onClick={handleConfirm} className="popup-add-boss__confirm">Valider</Button>
      </form>
    </Popup>
  );
};

export default PopupAddBoss;
