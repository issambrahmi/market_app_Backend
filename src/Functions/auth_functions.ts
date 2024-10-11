import bcrypt from 'bcryptjs';

export const hashPassword =  async (password: string): Promise<String | null> => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.log('hashPassword err : '  + error);
    return null;
  }
}

