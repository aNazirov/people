export const getAge = (birthDate: string) => {
  return new Date().getFullYear() - new Date(birthDate).getFullYear();
};

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export const imageUpload =
  (setPreview: (preview: any) => void, setFile: (file: File) => void) => (e: any) => {
    const file = e.target.files[0];
    setFile(file);

    const reader = new FileReader();

    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

export const formatData = (formdata: any) => {
  const postData = new FormData();
  const formatData: any = {
    ...formdata,
  };

  Object.keys(formatData).forEach((key) => {
    if (
      formatData[key] !== undefined &&
      formatData[key] !== null &&
      typeof formatData[key] !== 'undefined'
    ) {
      if (Array.isArray(formatData[key])) {
        formatData[key].forEach((data: any, i: number) => {
          postData.append(key, data);
        });

        return;
      }

      if (formatData[key] instanceof Object) {
        if (Object.keys(formatData[key]).length) {
          Object.keys(formatData[key]).forEach((key2) => {
            postData.append(`${key}[${key2}]`, formatData[key][key2]);
          });

          return;
        } else {
          postData.append(key, formatData[key]);
        }
      } else {
        postData.append(key, formatData[key]);
      }
    }
  });

  return postData;
};
