import styles from "./SwitchButton.module.scss";

type Props = {
  children: React.ReactNode;
  selected: boolean;
  onChange: (selected: boolean) => void;
};

export default function SwitchButton(props: Props) {
  const { selected, onChange, children } = props;

  return (
    <div
      className={`${styles.switchButton} ${selected ? styles.selected : ""}`}
      onClick={() => onChange(!selected)}
    >
      {children}
    </div>
  );
}
