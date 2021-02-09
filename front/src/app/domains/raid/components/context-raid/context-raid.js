import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { fetchRaidById } from "../../services";

const RaidContext = createContext({});

const RaidContextProvider = ({ children }) => {
  const { id: raidId } = useParams();
  const [data, setData] = useState({});

  const handleFetchRaid = () => {
    if (raidId) {
      fetchRaidById(raidId).then((response) => {
        const storedRaid = response?.data?.result;
        if (storedRaid) {
          setData(storedRaid);
        }
      });
    }
  };

  useEffect(handleFetchRaid, [raidId]);

  const {
    boss: bosses = [], section: sections = [], sectionLink: links = [], ...raid
  } = data;

  return (
    <RaidContext.Provider value={{
      raidId, raid, bosses, sections, links, handleFetchRaid,
    }}
    >
      {children}
    </RaidContext.Provider>
  );
};

RaidContextProvider.propTypes = {
  children: PropTypes.oneOfType(
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ),
};

const RaidContextConsumer = RaidContext.Consumer;

export { RaidContext, RaidContextProvider, RaidContextConsumer };
