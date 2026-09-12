function setupRundgangNavSpy() {
  const nav = document.querySelector(".rundgang-nav") as HTMLElement | null
  const stations = [...document.querySelectorAll<HTMLElement>(".rundgang-station")]
  if (!nav || stations.length === 0) return

  const links = [...nav.querySelectorAll<HTMLAnchorElement>("a[data-waypoint]")]

  function setActive(id: string) {
    for (const link of links) {
      link.classList.toggle("active", link.dataset.waypoint === id)
    }
  }

  const stationObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(entry.target.id)
      }
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
  )
  for (const s of stations) stationObserver.observe(s)
  window.addCleanup(() => stationObserver.disconnect())
}

function setupRundgangImageCrossfade() {
  const markers = [...document.querySelectorAll<HTMLElement>(".rundgang-station__marker")]
  if (markers.length === 0) return

  const markerObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const marker = entry.target as HTMLElement
        const index = marker.dataset.index
        const station = marker.closest(".rundgang-station")
        if (!station) continue
        station.querySelectorAll<HTMLElement>(".rundgang-station__image").forEach((img) => {
          img.classList.toggle("active", img.dataset.index === index)
        })
      }
    },
    { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
  )
  for (const m of markers) markerObserver.observe(m)
  window.addCleanup(() => markerObserver.disconnect())
}

function setupRundgang() {
  setupRundgangNavSpy()
  setupRundgangImageCrossfade()
}

document.addEventListener("nav", setupRundgang)
document.addEventListener("render", setupRundgang)
