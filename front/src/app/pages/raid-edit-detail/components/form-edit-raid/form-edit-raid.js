import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import classnames from "classnames/dedupe";
import { RaidContext } from "../context-raid/context-raid";
import FormEditBoss from "../form-edit-boss/form-edit-boss";
import { Button, TextField } from "../../../../shared";
import { updateRaidInfo, deleteRaidById } from "../../../../services";
import "./form-edit-raid.scss";

const FormEditRaid = (props) => {
  const { className } = props;
  const { raid, raidId, boss } = useContext(RaidContext);
  const [form, setForm] = useState({});
  const [formInit, setFormInit] = useState({});
  const history = useHistory();

  const generateBossForm = (bossInfo) => <FormEditBoss raidId={raidId} bossInfo={bossInfo} />;

  const handleRaidUpdate = () => {
    updateRaidInfo(raidId, form);
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
    deleteRaidById(raidId).then(() => history.push("/"));
  };

  useEffect(() => setFormInit(raid), [raid]);

  return (
    <div className={classnames("form-edit-raid", className)}>
      <form className="form-edit-raid__form">
        {renderTextField("name", "Nom")}
        {renderTextField("backgroundColor", "Couleur arrière plan")}
        {renderTextField("color", "Couleur du texte")}
        {renderTextField("imageURL", "image")}
        <Button className="form-edit-raid__save" onClick={handleRaidUpdate}>Save</Button>
        <Button className="form-edit-raid__delete" onClick={handleDelete}>Supprimer ce raid</Button>
      </form>

      <ul>{boss?.map(generateBossForm)}</ul>

    </div>
  );
};

export default FormEditRaid;
