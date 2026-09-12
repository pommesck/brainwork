import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { htmlToJsx } from "../../util/jsx"
import script from "../scripts/garden-header.inline"

const VermietungContent: QuartzComponent = ({ fileData, tree }: QuartzComponentProps) => {
  return (
    <article class="vermietung-content">
      {htmlToJsx(fileData.filePath!, tree)}
    </article>
  )
}

VermietungContent.afterDOMLoaded = script

export default (() => VermietungContent) satisfies QuartzComponentConstructor
