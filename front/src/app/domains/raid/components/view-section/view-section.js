import React, { useContext } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { IconWrapper, usePopup } from "../../../../shared";
import { AuthContext } from "../../../user";
import { ReactComponent as IconAdd } from "../../../../shared/assets/plus.svg";
import { ReactComponent as IconTrash } from "../../../../shared/assets/trash.svg";
import { ReactComponent as IconEdit } from "../../../../shared/assets/edit.svg";
import { deleteRaidSectionById } from "../../services";
import PopupSection from "../popup-section/popup-section";
import PopupLink from "../popup-link/popup-link";
import "./view-section.scss";

const ViewSection = (props) => {
  const {
    className, raidId, bossId, section, onChange,
  } = props;

  const { isAnonymous } = useContext(AuthContext);

  const { popupConfig: popupEditSectionConfig } = usePopup();
  const { popupConfig: popupAddLinkConfig } = usePopup();

  const handleUpdate = () => {
    onChange(bossId);
    popupEditSectionConfig?.hide();
  };

  const handleAddLink = () => {
    onChange(bossId);
    popupAddLinkConfig?.hide();
  };

  const handleDelete = () => {
    deleteRaidSectionById(raidId, section?.id)
      .then(() => onChange(bossId));
  };

  return (
    <div className={classnames("view-section", className)}>
      <PopupSection
        raidId={raidId}
        bossId={bossId}
        section={section}
        popupConfig={popupEditSectionConfig}
        onConfirm={handleUpdate}
      />
      <PopupLink
        raidId={raidId}
        sectionId={section?.id}
        popupConfig={popupAddLinkConfig}
        onConfirm={handleAddLink}
      />
      {!isAnonymous && (
        <div className="view-section__tool">
          <button type="button" className="view-section__tool__action" onClick={popupEditSectionConfig.show}>
            <IconWrapper className="view-section__tool__icon" Component={IconEdit} />
          </button>
          <button type="button" className="view-section__tool__action" onClick={handleDelete}>
            <IconWrapper className="view-section__tool__icon" Component={IconTrash} />
          </button>
          <button type="button" className="view-section__tool__action view-section__tool__add" onClick={popupAddLinkConfig.show}>
            <IconWrapper className="view-section__tool__icon" Component={IconAdd} />
            <span>Ajouter un lien</span>
          </button>
        </div>
      )}
      <h2 className="view-section__title">{section?.title}</h2>
    </div>
  );
};

ViewSection.propTypes = {
  className: PropTypes.string,
  raidId: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  section: PropTypes.exact({ title: PropTypes.string.isRequired }).isRequired,
};

ViewSection.defaultProps = {
  className: "",
  onChange: () => {},
};

export default ViewSection;
