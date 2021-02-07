import React from "react";
import PropTypes from "prop-types";
import { Popup, isTruthy } from "../../../../shared";
import FormLink from "../form-link/form-link";
import { createLink, updateLinkInfo } from "../../services";

const PopupLink = (props) => {
  const {
    popupConfig, raidId, sectionId, onConfirm, link,
  } = props;

  const handleValidate = (sectionInfo) => {
    const { label, target } = sectionInfo;
    const labelValidator = isTruthy();
    const targetValidator = isTruthy();

    return { label: !labelValidator(label), target: !targetValidator(target) };
  };

  const buildPopupAction = async (linkInfo) => {
    if (link?.id) {
      return updateLinkInfo(raidId, link.id, { ...linkInfo, sectionId });
    }
    return createLink(raidId, { ...linkInfo, sectionId });
  };

  const handleSubmit = (linkInfo) => {
    if (raidId) {
      buildPopupAction(linkInfo)
        .then(onConfirm)
        .then(popupConfig.hide);
    }
  };

  return (
    <Popup popupConfig={popupConfig} title="Editer un lien">
      <FormLink init={link} onValidate={handleValidate} onSubmit={handleSubmit} />
    </Popup>
  );
};

PopupLink.propTypes = {
  popupConfig: PropTypes.shape({ hide: PropTypes.func.isRequired }).isRequired,
  raidId: PropTypes.string.isRequired,
  sectionId: PropTypes.string.isRequired,
  link: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    target: PropTypes.string.isRequired,
  }),
  onConfirm: PropTypes.func,
};

PopupLink.defaultProps = {
  onConfirm: () => {},
  link: {},
};

export default PopupLink;
