import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { htmlToJsx } from "../../util/jsx"
import rundgangScript from "../scripts/rundgang.inline"
import gardenHeaderScript from "../scripts/garden-header.inline"
import { concatenateResources } from "../../util/resources"
import { Root, Element, RootContent } from "hast"

function textContent(node: any): string {
  if (node.type === "text") return node.value as string
  if (!node.children) return ""
  return node.children.map(textContent).join("")
}

function collectImages(node: any, out: Element[]) {
  if (node.type === "element" && node.tagName === "img") {
    out.push(node)
    return
  }
  for (const child of node.children ?? []) collectImages(child, out)
}

interface Station {
  id: string
  titleNode: Element
  textNodes: RootContent[]
  images: Element[]
}

interface ExtractResult {
  preamble: RootContent[]
  stations: Station[]
}

function extractStations(tree: Root): ExtractResult {
  const preamble: RootContent[] = []
  const stations: Station[] = []
  let current: Station | null = null

  for (const node of tree.children as RootContent[]) {
    if (node.type === "element" && (node as Element).tagName === "h2") {
      const el = node as Element
      if (current) stations.push(current)
      current = { id: String(el.properties?.id ?? ""), titleNode: el, textNodes: [], images: [] }
      continue
    }
    if (!current) {
      preamble.push(node)
      continue
    }
    if (node.type === "element") {
      const el = node as Element
      const images: Element[] = []
      collectImages(el, images)
      current.images.push(...images)
      if (el.tagName === "p" && textContent(el).trim().length > 0) {
        current.textNodes.push(el)
      }
    }
  }
  if (current) stations.push(current)
  return { preamble, stations }
}

const RundgangContent: QuartzComponent = ({ fileData, tree }: QuartzComponentProps) => {
  const { preamble, stations } = extractStations(tree as Root)

  return (
    <div class="rundgang-page">
      <div class="rundgang-preamble">
        {htmlToJsx(fileData.filePath!, { type: "root", children: preamble } as Root)}
      </div>
      <nav class="rundgang-nav" aria-label="Rundgang-Navigation">
        <ul>
          {stations.map((s) => (
            <li class={s.id === "der-hang" ? "rundgang-nav__pivot" : undefined}>
              <a href={`#${s.id}`} data-waypoint={s.id} data-label={textContent(s.titleNode)}>
                {textContent(s.titleNode)}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {stations.map((s) => (
        <section
          class="rundgang-station"
          id={s.id}
          style={`--count: ${Math.max(s.images.length, 1)}`}
        >
          <div class="rundgang-station__pin">
            <div class="rundgang-station__frame">
              {s.images.map((img, i) => (
                <img
                  class={`rundgang-station__image${i === 0 ? " active" : ""}`}
                  data-index={i}
                  src={img.properties?.src as string}
                  alt={(img.properties?.alt as string) ?? ""}
                />
              ))}
            </div>
            <div class="rundgang-station__title">{textContent(s.titleNode)}</div>
            <div class="rundgang-station__text">
              {htmlToJsx(fileData.filePath!, { type: "root", children: s.textNodes } as Root)}
            </div>
          </div>
          <div class="rundgang-station__markers" aria-hidden="true">
            {s.images.map((_, i) => (
              <div class="rundgang-station__marker" data-index={i} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

RundgangContent.afterDOMLoaded = concatenateResources(gardenHeaderScript, rundgangScript)

export default (() => RundgangContent) satisfies QuartzComponentConstructor
