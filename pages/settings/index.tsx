import Head from "next/head";
import type { AuthNextPage } from "../../types/appProps";
import NavBar from "../../components/NavBar/NavBar";
import { Flex, Box, Divider, Hide } from "@chakra-ui/react";
import SettingsMenu from "../../components/Settings/SettingsMenu";
import PagePicker from "../../components/Settings/PagePicker";
import { useState } from "react";
import { Pages } from "../../components/Settings/SettingsMenu";

const Settings: AuthNextPage = () => {
  const [pageName, setPageName] = useState(Pages.AccountSettings);

  return (
    <div>
      <Head>
        <title>MicroRaptor - Settings</title>
        <meta name="description" content="Settings" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <NavBar />
        <div>
          <Flex flexWrap={"wrap"} height="100%">
            <Box>
              <SettingsMenu onPageClick={(page) => setPageName(page)} />
            </Box>
            <Hide breakpoint="(max-width: 860px)">
              <Divider
                orientation="vertical"
                height="auto"
                color="rgb(236, 233, 233)"
                borderLeftWidth="3px"
              />
            </Hide>
            <Box flexGrow={1}>
              <PagePicker pageName={pageName} />
            </Box>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default Settings;

Settings.requireAuth = true;
