import type { ProjectDetails } from "../types/createForm";
import type { ProjectRewards } from "../types/project";
import type { ProfileSetting } from "../types/settings";

export async function createProject(
  projectDetails: ProjectDetails,
  rewardDetails: Array<ProjectRewards>
) {
  return fetch("/api/project", {
    method: "POST",
    body: JSON.stringify({ projectDetails, rewardDetails }),
  }).then((res) => {
    return res.json();
  });
}

export async function updateProfileSetting(
  setting: ProfileSetting,
) {
  return fetch("/api/update-profile", {
    method: "POST",
    body: JSON.stringify(setting),
  }).then((res) => {
    return res.json();
  });
}

export async function getProfileSetting() {
  return fetch("/api/get-profile", {
    method: "GET",
  }).then((res) => {
    return res.json();
  });
}

