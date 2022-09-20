export async function createProject(projectDetails: any, rewardDetails: any) {
  return fetch('/api/project', {
    method: 'POST',
    body: JSON.stringify({projectDetails, rewardDetails})
  }).then(res => {
    return res.json();
  });
}