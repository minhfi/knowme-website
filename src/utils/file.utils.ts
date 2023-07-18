
export class FileUtils {
  static readFilePromise(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = function (e: ProgressEvent<FileReader>) {
        resolve(e.target?.result)
      }

      // if (file && file.type.match('image.*')) {
      reader.readAsDataURL(file)
      // }
    })
  }

  static blobToFile(theBlob: Blob, fileName: string): File {
    return theBlob instanceof File
      ? theBlob
      : new File([theBlob], fileName, { type: theBlob.type })
  }
}
