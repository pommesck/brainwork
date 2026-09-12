import { PageFrame, PageFrameProps } from "./types"
import GardenHeader from "../GardenHeader"

/**
 * Garden frame — Chrome für die Digital-Garden-Seitenfamilie
 * (Hauptlanding, Vermietung-Landing, Rundgang). Keine Sidebars, kein
 * Standard-Quartz-Header/TOC/Breadcrumbs, stattdessen der individuelle
 * GardenHeader (Nav variiert pro Slug), direkt gefolgt vom Seiteninhalt.
 */
export const GardenFrame: PageFrame = {
  name: "garden",
  render({ componentData, pageBody: Content, footer: Footer }: PageFrameProps) {
    return (
      <>
        <div class="center minimal">
          <GardenHeader slug={componentData.fileData.slug!} />
          <Content {...componentData} />
        </div>
        <Footer {...componentData} />
      </>
    )
  },
}
