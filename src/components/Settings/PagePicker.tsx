import AccountSettings from "../../components/Settings/AccountSettings";
import ProfileSettings from "../../components/Settings/ProfileSettings";
import NotificationSettings from "../../components/Settings/NotificationSettings";
import { Pages } from "./SettingsMenu";

type Props = {
  pageName: Pages;
};

export default function PagePicker(props: Props) {
  const { pageName } = props;

  switch (pageName) {
    case Pages.ProfileSettings:
      return (
        <div>
          <ProfileSettings />{" "}
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
