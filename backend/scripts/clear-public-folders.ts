/* eslint-disable security/detect-non-literal-fs-filename */
import { readdir, rm } from 'node:fs/promises'
import { resolve } from 'node:path'

async function removeFolderFiles(folderPath: string): Promise<void> {
  const files = await readdir(folderPath)

  for (const file of files) {
    if (file === '.gitkeep') {
      continue
    }

    await rm(resolve(folderPath, file))
  }
}

void (async (): Promise<void> => {
  await removeFolderFiles(resolve('public/uploads'))
  await removeFolderFiles(resolve('public/zips'))
})()
