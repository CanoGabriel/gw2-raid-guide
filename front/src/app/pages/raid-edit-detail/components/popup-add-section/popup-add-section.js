import React, { useState, useContext } from "react";
import classnames from "classnames/dedupe";
import { Popup, TextField, Button } from "../../../../shared";
import { createSection } from "../../../../services";
import { RaidContext } from "../context-raid/context-raid";

const PopupAddSection = (props) => {
  const {
    className, popupConfig, bossId,
  } = props;

  const [form, setForm] = useState({});
  const { raidId, handleFetchRaid } = useContext(RaidContext);

  const handleConfirm = (e) => {
    e.preventDefault();
    const { title } = form;
    createSection(raidId, { title, bossId }).then(handleFetchRaid).then(popupConfig.hide);
  };

  const handleTextFieldChange = (e) => {
    const { name, value } = e.target;
    setForm((oldForm) => ({ ...oldForm, [name]: value }));
  };

  return (
    <Popup popupConfig={popupConfig} className={classnames("popup-add-boss", className)}>
      <form className="popup-add-boss__form">
        <TextField onChange={handleTextFieldChange} name="title" value={form.title} label="Titre du paragraphe" />
        <Button onClick={handleConfirm} className="popup-add-boss__confirm">Valider</Button>
      </form>
    </Popup>
  );
};

export default PopupAddSection;
