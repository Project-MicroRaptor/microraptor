import AccountSettings from "../../components/Settings/AccountSettings";
import ProfileSettings from "../../components/Settings/ProfileSettings";
import NotificationSettings from "../../components/Settings/NotificationSettings";
import { Pages } from "./SettingsMenu";
import { useState } from "react";

type Props = {
  pageName: Pages;
};

export default function PagePicker(props: Props) {
  const { pageName } = props;
  const [tempBio, setBio] = useState("");
  const onChangeBio = ({ target }: { target: any }) => {
    setBio(target?.value);
  }

  switch (pageName) {
    case Pages.ProfileSettings:
      return (
        <div>
          <ProfileSettings
            bio={tempBio}
            setBio={setBio}
            onChange={onChangeBio}
          />
        </div>
      );
    case Pages.NotificationSettings:
      return (
        <div>
          <NotificationSettings />{" "}
        </div>
      );
    case Pages.AccountSettings:
    default:
      return (
        <div>
          <AccountSettings />
        </div>
      );
  }
}
