import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { htmlToJsx } from "../../util/jsx"
import script from "../scripts/garden-header.inline"

const LandingContent: QuartzComponent = ({ fileData, tree }: QuartzComponentProps) => {
  return <article class="landing-content">{htmlToJsx(fileData.filePath!, tree)}</article>
}

LandingContent.afterDOMLoaded = script

export default (() => LandingContent) satisfies QuartzComponentConstructor
