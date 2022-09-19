import fs from "fs";

const deleteFile = async (filename: string): Promise<void> => {
  try {
    // verifica se um arquivo existe ou nao (stat)
    await fs.promises.stat(filename);
  } catch (error) {
    return;
  }

  await fs.promises.unlink(filename);
};

export { deleteFile };
