import React, { useEffect, useState, useContext } from "react";
import classnames from "classnames/dedupe";
import { RaidContext } from "../context-raid/context-raid";
import { Button, TextField } from "../../../../shared";
import { deleteRaidLinkById, updateLinkInfo } from "../../../../services";
import "./form-edit-section-link.scss";

const FormEditSectionLink = (props) => {
  const { className, linkInfo } = props;

  const { raidId, handleFetchRaid } = useContext(RaidContext);

  const [form, setForm] = useState({});
  const [formInit, setFormInit] = useState({});

  const handleLinkUpdate = () => {
    updateLinkInfo(raidId, linkInfo.id, form);
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
    deleteRaidLinkById(raidId, linkInfo.id).then(handleFetchRaid);
  };

  useEffect(() => setFormInit(linkInfo), [linkInfo]);

  return (
    <div className={classnames("form-edit-section-link", className)}>
      <form className="form-edit-section-link__form">
        {renderTextField("label", "Text du lien")}
        {renderTextField("target", "Cible du lien")}
      </form>
      <Button className="form-edit-section-link__save" onClick={handleLinkUpdate}>Save</Button>
      <Button className="form-edit-section-link__delete" onClick={handleDelete}>Supprimer le lien</Button>
    </div>
  );
};

export default FormEditSectionLink;
