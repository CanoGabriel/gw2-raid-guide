import React from "react";
import classnames from "classnames/dedupe";
import { Page, usePopup, Button } from "../../shared";
import { RaidContextProvider, RaidContextConsumer } from "./components/context-raid/context-raid";
import FormEditRaid from "./components/form-edit-raid/form-edit-raid";

import PopupAddBoss from "./components/popup-add-boss/popup-add-boss";

const RaidEditDetail = (props) => {
  const { className } = props;
  const { popupConfig: popupConfigAddBoss, show: showPopupAddBoss } = usePopup();
  return (
    <RaidContextProvider>
      <Page className={classnames("raid-edit-page", className)}>
        <RaidContextConsumer>
          {({ raidId }) => <PopupAddBoss raidId={raidId} popupConfig={popupConfigAddBoss} />}
        </RaidContextConsumer>
        <p>Raid Information</p>
        <FormEditRaid />
        <Button onClick={showPopupAddBoss}>Ajouter un boss</Button>
      </Page>
    </RaidContextProvider>
  );
};

export default RaidEditDetail;
