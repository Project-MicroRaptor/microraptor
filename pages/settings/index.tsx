import Head from "next/head";
import type { AuthNextPage } from "../../types/appProps";
import NavBar from "../../components/NavBar/NavBar";
import { Flex, Box } from "@chakra-ui/react";
import SettingsMenu from "../../components/Settings/SettingsMenu";
import PagePicker from "../../components/Settings/PagePicker";
import { useState } from "react";

const Settings: AuthNextPage = (props) => {
  const [pageName, setPageName] = useState(0);
  const getPage = (pageName: any) => {
    setPageName(pageName);
  };

  return (
    <>
      <Head>
        <title>MicroRaptor - Settings</title>
        <meta name="description" content="Settings" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <NavBar />
        <div>
          <Flex flexWrap={"wrap"}>
            <Box>
              <SettingsMenu onPageClick={getPage} />
            </Box>
            <Box width="1000px">
              <PagePicker pageName={pageName} />
            </Box>
          </Flex>
        </div>
      </div>
    </>
  );
};

export default Settings;

Settings.requireAuth = true;
