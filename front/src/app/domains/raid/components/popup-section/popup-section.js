import React from "react";
import PropTypes from "prop-types";
import { Popup, isTruthy } from "../../../../shared";
import FormSection from "../form-section/form-section";
import { createSection, updateSectionInfo } from "../../services";

const PopupSection = (props) => {
  const {
    popupConfig, bossId, raidId, onConfirm, section,
  } = props;

  const handleValidate = (sectionInfo) => {
    const { title } = sectionInfo;
    const titleValidator = isTruthy();

    return { title: !titleValidator(title) };
  };
  const buildPopupAction = async (sectionInfo) => {
    if (section?.id) {
      return updateSectionInfo(raidId, section.id, { ...sectionInfo, bossId });
    }
    return createSection(raidId, { ...sectionInfo, bossId });
  };
  const handleSubmit = (sectionInfo) => {
    if (raidId) {
      buildPopupAction(sectionInfo)
        .then(onConfirm)
        .then(popupConfig.hide);
    }
  };

  return (
    <Popup popupConfig={popupConfig} title="Editer une section">
      <FormSection init={section} onValidate={handleValidate} onSubmit={handleSubmit} />
    </Popup>
  );
};

PopupSection.propTypes = {
  popupConfig: PropTypes.shape({ hide: PropTypes.func.isRequired }).isRequired,
  raidId: PropTypes.string.isRequired,
  bossId: PropTypes.string.isRequired,
  section: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  onConfirm: PropTypes.func,
};

PopupSection.defaultProps = {
  onConfirm: () => {},
  section: {},
};

export default PopupSection;
