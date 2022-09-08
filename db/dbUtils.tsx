export async function createProject(projectDetails: any) {
  return fetch('/api/project', {
    method: 'POST',
    body: JSON.stringify({projectDetails})
  }).then(res => {
    return res.json();
  });
}