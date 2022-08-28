import Head from "next/head";
import styles from "./settings.module.scss";
import type { AuthNextPage } from "../../types/appProps";
import NavBar from "../../components/NavBar/NavBar";
import { Grid, GridItem } from "@chakra-ui/react";
import SettingsTab from "../../components/Settings/SettingsTab";
import PagePicker from "../../components/Settings/PagePicker";
import { useState } from "react";

const Settings: AuthNextPage = (props) => {
  // const [pageName, setPageName] = useState('AccountSettings');
  // const getPage = (pageName: string) => {
  //   setPageName(pageName)
  // }

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
        <SettingsTab onPageClick={getPage} />
        <PagePicker pageName={pageName} />
          {/* <Grid
            templateAreas={`"nav main"`}
            gridTemplateColumns={"300px 1fr"}
            h={"700"}
            gap="1"
            color="blackAlpha.700"
            fontWeight="bold"
          >
            <GridItem pl="2" area={"nav"}>
              <SettingsTab onPageClick={getPage} />
            </GridItem>
            <GridItem pl="2" area={"main"}>
              <PagePicker pageName={pageName} />
            </GridItem>
          </Grid> */}
        </div>
      </div>
    </>
  );
};

export default Settings;

Settings.requireAuth = true;
