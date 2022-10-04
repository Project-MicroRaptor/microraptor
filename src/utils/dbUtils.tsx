import type { ProjectDetails } from "../types/createForm";
import type { ProjectRewards } from "../types/project";

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

export async function CreateMessageGroup(message: String, session: any) {
  return fetch("/api/project", {
    method: "POST",
    body: JSON.stringify({ projectDetails, rewardDetails }),
  }).then((res) => {
    return res.json();
  });
}