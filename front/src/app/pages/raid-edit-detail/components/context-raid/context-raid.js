import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRaidById } from "../../../../services/index";

const RaidContext = createContext({});

const RaidContextProvider = ({ children }) => {
  const { id: raidId } = useParams();
  const [data, setData] = useState({});

  const handleFetchRaid = () => {
    fetchRaidById(raidId).then((response) => {
      const storedRaid = response?.data?.result;
      if (storedRaid) {
        setData(storedRaid);
      }
    });
  };

  useEffect(handleFetchRaid, []);

  const {
    boss, section, sectionLink, ...raid
  } = data;

  return (
    <RaidContext.Provider value={{
      raidId, raid, boss, section, sectionLink, handleFetchRaid,
    }}
    >
      {children}
    </RaidContext.Provider>
  );
};

const RaidContextConsumer = RaidContext.Consumer;

export { RaidContext, RaidContextProvider, RaidContextConsumer };
