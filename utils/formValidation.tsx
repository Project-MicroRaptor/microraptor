export type FormErrors = {
  [key: string]: boolean;
};

export function validateMyProjectForm(formData: any): any {
  let page: number | null = null;
  const errors: FormErrors = {};

  if (!formData?.name) {
    errors.name = true;
    page = 0;
  }
  if (!formData?.shortDescription) {
    errors.shortDescription = true;
    page = 0;
  }
  if (!formData?.targetFunding) {
    errors.targetFunding = true;
    page = 0;
  }
  if (!formData?.completedAt) {
    errors.completedAt = true;
    page = 0;
  }
  if (!formData?.postcode) {
    errors.postcode = true;
    page = 0;
  }
  if (
    !formData?.categories ||
    Object.values(formData.categories).every((value) => !value)
  ) {
    errors.categories = true;
    page = 0;
  }

  return { page, errors };
}

export function validatePhotosForm(formData: any): any {
  let page: number | null = null;
  const errors: FormErrors = {};

  if (!formData.image || !formData.image[0]) {
    errors.image = true;
    page = 2;
  }

  return { page, errors };
}
