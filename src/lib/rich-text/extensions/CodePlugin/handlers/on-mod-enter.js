import { Block, Text } from "slate"
/**
 * User pressed Mod+Enter in an editor
 * Exit the current code block
 */

export function onModEnter(opts, event, change, editor) {
  const {
    value: {
      selection: { isCollapsed },
    },
  } = change

  if (!isCollapsed) {
    return editor()
  }

  event.preventDefault()

  // Default behavior: insert an exit block
  const range = change.value.selection

  const exitBlock = Block.create({
    type: "paragraph",
    nodes: [Text.create()],
  })

  change.deleteAtRange(range, { normalize: false })
  change.insertBlockAtRange(change.value.selection, exitBlock, {
    normalize: false,
  })
  // Exit the code block
  change.unwrapNodeByKey(exitBlock.key)

  return change.moveToStartOfNode(exitBlock)
}
