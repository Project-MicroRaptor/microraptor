import AccountSettings from "../../components/Settings/AccountSettings";
import ProfileSettings from "../../components/Settings/ProfileSettings";
import NotificationSettings from "../../components/Settings/NotificationSettings";

type Props = {
  pageName: any;
};

export default function PagePicker(props: Props) {
  const { pageName } = props;

  switch (pageName) {
    case 1:
      return (
        <div>
          <ProfileSettings />{" "}
        </div>
      );
    case 2:
      return (
        <div>
          <NotificationSettings />{" "}
        </div>
      );
    default:
      return (
        <div>
          <AccountSettings />
        </div>
      );
  }
}
