export const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: any,
) => {
  console.log(file);

  if (!file) return callback(new Error('File is empty'), false);

  const fileExtension = file.mimetype.split('/')[1];

  const validExtensions = ['jpg', 'png'];

  if (validExtensions.includes(fileExtension)) callback(null, true);

  callback(null, false);
};
