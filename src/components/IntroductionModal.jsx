import React from "react";
import { useSelector, useDispatch } from "react-redux";

import * as selectors from "../store/selectors";
import * as actions from "../store/actions";
import { useIntroductionInfo } from "../hooks";

import { InformationModal } from "./InformationModal";

export const IntroductionModal = props => {
  const dispatch = useDispatch();
  const introduction = useIntroductionInfo();
  const open = useSelector(selectors.selectSiteInfoOpen);

  const onClose = () => {
    dispatch(actions.toggleSiteInfoOpen());
  };

  return (
    <InformationModal open={open} onClose={onClose}>
      <div dangerouslySetInnerHTML={{ __html: introduction }} />
    </InformationModal>
  );
};
