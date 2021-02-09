import React, { useContext } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../user";
import { ImageLoader } from "../../../image";
import { IconWrapper, formatAmount, usePopup } from "../../../../shared";
import { ReactComponent as IconAdd } from "../../../../shared/assets/plus.svg";
import { ReactComponent as IconTrash } from "../../../../shared/assets/trash.svg";
import { ReactComponent as IconEdit } from "../../../../shared/assets/edit.svg";
import { deleteRaidBossById } from "../../services";
import PopupSection from "../popup-section/popup-section";
import "./view-boss.scss";

const ViewBoss = (props) => {
  const {
    raidId, boss, className, onDelete, onAddSection,
  } = props;
  const { isAnonymous } = useContext(AuthContext);

  const { popupConfig: popupSectionConfig } = usePopup();

  const handleDeleteBoss = (bossId) => () => {
    if (raidId && bossId) {
      deleteRaidBossById(raidId, bossId).then(onDelete);
    }
  };

  const handleAddSection = () => {
    onAddSection();
    popupSectionConfig.hide();
  };

  return (
    <div className={classnames("boss", className)}>
      <PopupSection raidId={raidId} bossId={boss?.id} popupConfig={popupSectionConfig} onConfirm={handleAddSection} />
      {!isAnonymous && (
        <div className="boss__tool">
          <Link className="boss__tool__action" to={`/raid/${raidId}/boss/${boss?.id}/edit`}>
            <IconWrapper className="boss__tool__icon" Component={IconEdit} />
          </Link>
          <button className="boss__tool__action" type="button" onClick={handleDeleteBoss(boss?.id)}>
            <IconWrapper className="boss__tool__icon" Component={IconTrash} />
          </button>
          <button className="boss__tool__action boss__tool__add" type="button" onClick={popupSectionConfig.show}>
            <IconWrapper className="boss__tool__icon" Component={IconAdd} />
            <span>Ajouter une section</span>
          </button>
        </div>
      )}
      <span className="boss__field boss__name">{boss?.name}</span>
      {boss?.image && <ImageLoader className="boss__image" type={boss?.image?.type} imageKey={boss?.image?.key} />}
      <span className="boss__field boss__health">
        {`${formatAmount(boss?.health)} PV`}
      </span>
      <span className="boss__field boss__break-bar">{boss?.breakBar}</span>
      <span className="boss__field boss__add-break-bar">{boss?.addBreakBar}</span>
      <span className="boss__field boss__hitbox-size">{boss?.hitboxSize}</span>
      <span className="boss__field boss__armor">{boss?.armor}</span>
      <span className="boss__field boss__timer">{boss?.timer}</span>
    </div>
  );
};

ViewBoss.propTypes = {
  raidId: PropTypes.string.isRequired,
  boss: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    image: PropTypes.exact({ type: PropTypes.string.isRequired, key: PropTypes.string.isRequired }),
    health: PropTypes.string,
    breakBar: PropTypes.string,
    addBreakBar: PropTypes.string,
    hitboxSize: PropTypes.string,
    armor: PropTypes.string,
    timer: PropTypes.string,
  }).isRequired,
  className: PropTypes.string,
  onDelete: PropTypes.func,
  onAddSection: PropTypes.func,
};

export default ViewBoss;
