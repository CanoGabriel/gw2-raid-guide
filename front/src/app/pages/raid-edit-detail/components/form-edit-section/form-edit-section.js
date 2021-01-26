import React, { useContext, useState, useEffect } from "react";
import classnames from "classnames/dedupe";
import { RaidContext } from "../context-raid/context-raid";
import FormEditSectionLink from "../form-edit-section-link/form-edit-section-link";
import { Button, TextField, usePopup } from "../../../../shared";
import { updateSectionInfo, deleteRaidSectionById } from "../../../../services";
import PopupAddLink from "../popup-add-link/popup-add-link";

import "./form-edit-section.scss";

const FormEditSection = (props) => {
  const { className, sectionInfo } = props;

  const { raidId, sectionLink = [], handleFetchRaid } = useContext(RaidContext);

  const { popupConfig: popupConfigAddLink, show: showPopupAddLink } = usePopup();

  const currentSectionLink = sectionLink.filter(({ section: sectionId } = {}) => sectionId === sectionInfo?.id);

  const [form, setForm] = useState({});
  const [formInit, setFormInit] = useState({});

  const handleSectionUpdate = () => {
    updateSectionInfo(raidId, sectionInfo.id, form);
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
    deleteRaidSectionById(raidId, sectionInfo.id).then(handleFetchRaid);
  };

  useEffect(() => setFormInit(sectionInfo), [sectionLink]);

  return (
    <div className={classnames("form-edit-section", className)}>
      <PopupAddLink popupConfig={popupConfigAddLink} sectionId={sectionInfo.id} />
      <h1 className="form-edit-section__title">Boss section</h1>
      <form className="form-edit-section__form">
        {renderTextField("title", "Titre")}
        <Button className="form-edit-section__save" onClick={handleSectionUpdate}>Save</Button>
      </form>
      <ul className="form-edit-section__link">{currentSectionLink?.map((link) => <FormEditSectionLink linkInfo={link} />)}</ul>
      <Button onClick={showPopupAddLink}>Ajouter un lien</Button>
      <Button onClick={handleDelete}>Supprimer ce paragraphe</Button>
    </div>
  );
};

export default FormEditSection;
