import jwt, { JwtPayload } from 'jsonwebtoken';

interface SignOption {
  expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: '1h',
};

export const signJwtAccessToken = (
  payload: JwtPayload,
  options: SignOption = DEFAULT_SIGN_OPTION
) => {
  const secret_key = process.env.SECRET_KEY!;
  const token = jwt.sign(payload, secret_key, options);
  return token;
};

export const jwtVerifyToken = (token: string) => {
  try {
    const secret_key = process.env.SECRET_KEY!;
    const decode = jwt.verify(token, secret_key);
    return decode as JwtPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
};
