import React, { useState, useContext } from "react";
import classnames from "classnames/dedupe";
import { Popup, TextField, Button } from "../../../../shared";
import { createLink } from "../../../../services";
import { RaidContext } from "../context-raid/context-raid";

const PopupAddLink = (props) => {
  const {
    className, popupConfig, sectionId,
  } = props;

  const [form, setForm] = useState({});
  const { raidId, handleFetchRaid } = useContext(RaidContext);

  const handleConfirm = (e) => {
    e.preventDefault();
    const { label, target } = form;
    createLink(raidId, { label, target, sectionId }).then(handleFetchRaid).then(popupConfig.hide);
  };

  const handleTextFieldChange = (e) => {
    const { name, value } = e.target;
    setForm((oldForm) => ({ ...oldForm, [name]: value }));
  };

  return (
    <Popup popupConfig={popupConfig} className={classnames("popup-add-boss", className)}>
      <form className="popup-add-boss__form">
        <TextField onChange={handleTextFieldChange} name="label" value={form.label} label="Text du lien" />
        <TextField onChange={handleTextFieldChange} name="target" value={form.target} label="Cible du lien" />
        <Button onClick={handleConfirm} className="popup-add-boss__confirm">Valider</Button>
      </form>
    </Popup>
  );
};

export default PopupAddLink;
