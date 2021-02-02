import React, { useState } from "react";
import classnames from "classnames/dedupe";
import { Popup, TextField, Button } from "../../../../../../shared";
import { createRaid } from "../../../../../../services";

const PopupRaidCreate = (props) => {
  const {
    className, popupConfig,
  } = props;

  const [form, setForm] = useState({});

  const handleConfirm = (e) => {
    e.preventDefault();
    createRaid(form).then(() => popupConfig.hide());
  };

  const handleTextFieldChange = (e) => {
    const { name, value } = e.target;
    setForm((oldForm) => ({ ...oldForm, [name]: value }));
  };

  return (
    <Popup popupConfig={popupConfig} className={classnames("popup-raid-create", className)}>
      <form className="popup-raid-create__form">
        <TextField onChange={handleTextFieldChange} name="name" value={form.name} label="Nom du Raid" />
        <TextField onChange={handleTextFieldChange} name="backgroundColor" value={form.backgroundColor} label="Couleur du fond" />
        <TextField onChange={handleTextFieldChange} name="color" value={form.color} label="Couleur du texte" />
        <Button onClick={handleConfirm} className="popup-raid-create__confirm">Valider</Button>
      </form>
    </Popup>
  );
};

export default PopupRaidCreate;
