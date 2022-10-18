import type { ProjectDetails } from "../types/createForm";
import type { ProjectRewards } from "../types/project";
import type { ProfileSetting } from "../types/settings";

export async function createProject(
  projectDetails: ProjectDetails,
  rewardDetails: Array<ProjectRewards>
) {
  return fetch("/api/project", {
    method: "POST",
    body: JSON.stringify({ projectDetails, rewardDetails })
  }).then((res) => {
    return res.json();
  });
}

export async function updateProject(
  id: string,
  projectDetails: ProjectDetails
) {
  return fetch(`/api/project/${id}`, {
    method: "PUT",
    body: JSON.stringify({ projectDetails })
  }).then((res) => {
    return res.json();
  });
}

export async function deactivateProject(id: string) {
  return fetch(`/api/project/${id}`, {
    method: "DELETE"
  }).then((res) => {
    return res.json();
  });
}

export async function updateProfileSetting(setting: ProfileSetting) {
  return fetch("/api/profile", {
    method: "POST",
    body: JSON.stringify(setting)
  }).then((res) => {
    return res.json();
  });
}

export async function getProfileSetting() {
  return fetch("/api/profile", {
    method: "GET"
  }).then((res) => {
    return res.json();
  });
}

export async function createMessageGroup(
  message: string,
  projectId: string,
  ownerId: string
) {
  let queryString = "/api/message-group?";
  queryString += new URLSearchParams({ projectId, message, ownerId });
  return fetch(queryString, {
    method: "POST"
  }).then((res) => {
    return res.json();
  });
}
