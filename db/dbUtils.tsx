import type { ProfileSetting } from "../types/settings";

export async function updateProfileSetting(
  setting: ProfileSetting,
) {
  return fetch("/api/profile", {
    method: "POST",
    body: JSON.stringify(setting),
  }).then((res) => {
    return res.json();
  });
}
