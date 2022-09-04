import styles from "./SettingsTabs.module.scss";

export default function AccountSettings() {
  return (
    <div className={styles.containertitle}>
      <h1 className={styles.accounttitle}>Account Settings</h1>
      <hr className={styles.accountdivider} />
      <div className={styles.formbox}>
        <div className={styles.forminputbox}>
          <form>
            <div className={styles.accbox}>
              <label className={styles.inputlabel}>Name</label>
              <input
                className={styles.inputbox}
                type="text"
                placeholder="name"
              ></input>
              <button className={styles.inputbutton}>Edit</button>
            </div>
            <hr />
            <div className={styles.accbox}>
              <label className={styles.inputlabel}>Email</label>
              <input
                className={styles.inputbox}
                type="text"
                placeholder="email"
              ></input>
              <button className={styles.inputbutton}>Edit</button>
            </div>
            <hr />
            <div className={styles.accbox}>
              <label className={styles.inputlabel}>Change Password</label>
              <input
                className={styles.inputbox}
                type="text"
                placeholder="********"
              ></input>
              <button className={styles.inputbutton}>Edit</button>
            </div>
            <hr />
            <div className={styles.accbox}>
              <label className={styles.inputlabel}>Address</label>
              <input
                className={styles.inputbox}
                type="text"
                placeholder="address"
              ></input>
              <button className={styles.inputbutton}>Edit</button>
            </div>
            <div className={styles.savebox}>
              <button className={styles.savebutton}>Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
