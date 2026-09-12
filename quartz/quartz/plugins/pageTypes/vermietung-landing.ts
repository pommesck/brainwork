import { QuartzPageTypePlugin } from "../types"
import VermietungContent from "../../components/pages/VermietungContent"
import LandingContent from "../../components/pages/LandingContent"

export const VermietungLandingPageType: QuartzPageTypePlugin = () => ({
  name: "vermietung-landing",
  priority: 100,
  match: ({ slug }) => slug === "vermietung/index",
  layout: "landing",
  frame: "garden",
  body: VermietungContent,
})
