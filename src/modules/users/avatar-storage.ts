import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

const normalizeFileName = (req, file, callback) => {
  const fileExtName = file.originalname.split('.').pop();

  console.log(req);
  console.log(req.user);

  callback(null, `${file.fieldname}-${uuidv4()}.${fileExtName}`);
};

export const avatarStorage = diskStorage({
  destination: 'uploads/avatars',
  filename: normalizeFileName,
});
