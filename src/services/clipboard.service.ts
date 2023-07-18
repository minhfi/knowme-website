const copy = async (str: string) => {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(str)
  }

  const element = document.createElement('textarea')
  element.value = str
  element.setAttribute('readonly', '')
  element.style.position = 'absolute'
  element.style.left = '-9999px'

  const selection = document.getSelection()
  const selected = (selection?.rangeCount || 0) > 0 // Check if there is any content selected previously
    ? selection?.getRangeAt(0) // Store selection if found
    : false

  document.body.appendChild(element)
  element.select()
  document.execCommand('copy')
  document.body.removeChild(element)

  if (selected) {
    selection?.removeAllRanges() // Unselect everything on the HTML document
    selection?.addRange(selected) // Restore the original selection
  }
}

const paste = async () => {
  if (navigator.clipboard) {
    return navigator.clipboard.readText()
    // return navigator.clipboard.read().then(
    //   (items) => {
    //     console.log({ items })
    //     for (const item of items) {
    //       for (const type of item.types) {
    //         console.log(item.getType(type))
    //       }
    //     }
    //   }
    // )
  }

  /**
   * @deprecated not working
   */
  return String(document.execCommand('paste') || '')
}

export const ClipboardService = new (
  class {
    copy(content: any) {
      const copyContent = typeof content === 'string'
        ? content
        : JSON.stringify(content)
      return copy(copyContent)
    }

    paste() {
      return paste()
    }
  }
)()
