import styles from "./SwitchButton.module.scss";

type Props = {
  children: React.ReactNode;
  selected: boolean;
  onChange: (selected: boolean) => void;
  isInvalid: boolean;
};

export default function SwitchButton(props: Props) {
  const { selected, onChange, children, isInvalid = false} = props;

  return (
    <div
      className={`${styles.switchButton} ${selected ? styles.selected : ""} ${isInvalid ? styles.invalid : ""}`}
      onClick={() => onChange(!selected)}
    >
      {children}
    </div>
  );
}
