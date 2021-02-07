import React, { useContext } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { IconWrapper, usePopup } from "../../../../shared";
import { AuthContext } from "../../../user";
import { ReactComponent as IconTrash } from "../../../../shared/assets/trash.svg";
import { ReactComponent as IconEdit } from "../../../../shared/assets/edit.svg";
import { deleteRaidLinkById } from "../../services";
import PopupLink from "../popup-link/popup-link";
import "./view-link.scss";

const ViewLink = (props) => {
  const {
    className, raidId, link, onChange,
  } = props;

  const { isAnonymous } = useContext(AuthContext);

  const { popupConfig: popupEditLinkConfig } = usePopup();

  const handleDelete = () => {
    deleteRaidLinkById(raidId, link?.id).then(onChange);
  };

  const handleUpdate = () => {
    onChange();
    popupEditLinkConfig.hide();
  };

  return (
    <div className={classnames("view-link", className)}>
      <PopupLink raidId={raidId} link={link} sectionId={link?.section} onConfirm={handleUpdate} popupConfig={popupEditLinkConfig} />
      <a className="view-link__link" href={link?.target} target="_blank" rel="noopenner noreferrer">{link?.label || link?.target}</a>
      {!isAnonymous && (
        <div className="view-link__tool">
          <button type="button" className="view-link__tool__action" onClick={popupEditLinkConfig.show}>
            <IconWrapper className="view-link__tool__icon" Component={IconEdit} />
          </button>
          <button type="button" className="view-link__tool__action" onClick={handleDelete}>
            <IconWrapper className="view-link__tool__icon" Component={IconTrash} />
          </button>
        </div>
      )}
    </div>
  );
};

ViewLink.propTypes = {
  className: PropTypes.string,
  raidId: PropTypes.string.isRequired,
  section: PropTypes.exact({ title: PropTypes.string.isRequired }).isRequired,
  onChange: PropTypes.func,
};

ViewLink.defaultProps = {
  className: "",
  onChange: () => {},
};

export default ViewLink;
