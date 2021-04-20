import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { useAlgorithmInfo } from "../hooks";
import * as selectors from "../store/selectors";
import * as actions from "../store/actions";

import { InformationModal } from "./InformationModal";

export const AlgorithmModals = props => {
  const dispatch = useDispatch();
  const algorithms = useAlgorithmInfo();
  const selectedAlgorithm = useSelector(selectors.selectAlgorithm);
  const open = useSelector(selectors.selectAlgInfoOpen);

  const onClose = () => {
    dispatch(actions.toggleAlgInfoOpen());
  };

  return (
    <>
      {algorithms.map(alg => (
        <InformationModal
          key={alg.solverKey}
          open={open && selectedAlgorithm === alg.solverKey}
          onClose={onClose}
        >
          <div dangerouslySetInnerHTML={{ __html: alg.html }} />
        </InformationModal>
      ))}
    </>
  );
};
