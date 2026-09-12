import { QuartzPageTypePlugin } from "../types"
import RundgangContent from "../../components/pages/RundgangContent"

export const VermietungRundgangPageType: QuartzPageTypePlugin = () => ({
  name: "vermietung-rundgang",
  priority: 100,
  match: ({ slug }) => slug === "vermietung/rundgang",
  layout: "landing",
  frame: "garden",
  body: RundgangContent,
})
