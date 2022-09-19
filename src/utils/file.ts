import fs from "fs";

const deleteFile = async (filename: string): Promise<void> => {
  try {
    // stat - verifica se um arquivo existe ou nao
    await fs.promises.stat(filename);
  } catch (error) {
    return;
  }

  await fs.promises.unlink(filename);
};

export { deleteFile };
