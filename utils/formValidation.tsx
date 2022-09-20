export type FormErrors = {
  [key: string]: boolean | {[key: string]: boolean | {[key: string]: boolean}};
};

type ErrorPageObject = {
  errors: FormErrors,
  page: number | null,
}

export function validateMyProjectForm(formData: any): ErrorPageObject {
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

export function validatePhotosForm(formData: any): ErrorPageObject {
  let page: number | null = null;
  const errors: FormErrors = {};

  if (!formData.image || !formData.image[0]) {
    errors.image = true;
    page = 2;
  }

  return { page, errors };
}

export function validateRewardsForm(formData: any): ErrorPageObject {
  let page: number | null = null;
  const errors: FormErrors = {};

  // There is no rewards data. Can ignore
  if (!formData || !formData?.rewards) {
    return { page, errors };
  }

  Object.entries(formData.rewards).forEach(reward => {
    const [key, values]: [string, any] = reward;
    const keyNum = Number(key);

    if (!isNaN(keyNum) && 0 < keyNum) {
      // Check if previous reward exists
      if (!formData.rewards?.[keyNum - 1] && typeof errors.rewards !== "boolean") {
        errors.rewards = {
          ...errors.rewards,
          [keyNum - 1]: true,
        };
        page = 3;
        return;
      }
    }

    // Check if values exist
    if (!values?.name || !values?.description || !values?.cost) {
      errors.rewards = {
        ...(typeof errors.rewards === 'object' ? errors.rewards : {}),
        [keyNum]: true,
      };
      page = 3;
      return;
    }
    
    if (!isNaN(keyNum) && 0 < keyNum) {
      const prevReward = formData?.rewards[keyNum - 1];
      // Check if prev cost is higher than current cost
      if (values?.cost && prevReward?.cost > values?.cost) {
        errors.rewards = {
          ...(typeof errors.rewards === 'object' ? errors.rewards : {}),
          [keyNum]: true,
        };
        page = 3;
        return;
      }
    }
  })

  return { page, errors };
}
