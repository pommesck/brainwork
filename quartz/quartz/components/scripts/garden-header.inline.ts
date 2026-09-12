function setupHeaderHeightVar() {
  const header = document.querySelector(".garden-header") as HTMLElement | null
  if (!header) return
  document.documentElement.style.setProperty(
    "--garden-header-height",
    `${header.getBoundingClientRect().height}px`,
  )
}

function setupGardenHeaderToggle() {
  const toggle = document.querySelector<HTMLButtonElement>(".garden-header__toggle")
  const nav = document.querySelector<HTMLElement>(".garden-nav")
  if (!toggle || !nav) return

  function toggleNav() {
    const isOpen = nav!.classList.toggle("open")
    toggle!.setAttribute("aria-expanded", String(isOpen))
  }

  nav.classList.remove("open")
  toggle.setAttribute("aria-expanded", "false")

  toggle.addEventListener("click", toggleNav)
  window.addCleanup(() => toggle.removeEventListener("click", toggleNav))
}

function setupGardenHeader() {
  setupHeaderHeightVar()
  setupGardenHeaderToggle()
}

document.addEventListener("nav", setupGardenHeader)
document.addEventListener("render", setupGardenHeader)
