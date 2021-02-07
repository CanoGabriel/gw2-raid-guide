import React, { createContext, useEffect, useState } from "react";
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
  console.log(raidId);
  return (
    <RaidContext.Provider value={{
      raidId, raid, bosses, sections, links, handleFetchRaid,
    }}
    >
      {children}
    </RaidContext.Provider>
  );
};

const RaidContextConsumer = RaidContext.Consumer;

export { RaidContext, RaidContextProvider, RaidContextConsumer };
