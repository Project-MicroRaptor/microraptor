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
  const [bio, setBio] = useState("");
  const [isBioChange, setBioChange] = useState(false);

  switch (pageName) {
    case Pages.ProfileSettings:
      return (
        <div>
          <ProfileSettings
            bio={bio}
            setBio={setBio}
            isBioChange={isBioChange}
            setBioChange={setBioChange}
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
