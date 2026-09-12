interface GardenHeaderProps {
  slug: string
}

export default function GardenHeader({ slug }: GardenHeaderProps) {
  const isVermietung = slug.startsWith("vermietung/")
  const isRundgang = slug === "vermietung/rundgang"
  const isBuchung = slug === "vermietung/buchung"

  return (
    <header class="garden-header">
      <div>
        {isVermietung ? (
          <span class="garden-header__name">
            <a href="../index">Foyer</a>
          </span>
        ) : (
          <>
            <span class="garden-header__name">Christopher Krich</span>
            <span class="garden-header__slogan">
              Ein Digitaler Garten in seinem Anfangsstadium.
            </span>
          </>
        )}
      </div>

      <button class="garden-header__toggle" aria-label="Menü öffnen" aria-expanded="false">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <nav class="garden-nav">
        {isVermietung ? (
          <>
            <a href={isRundgang ? "index" : "rundgang"}>
              {isRundgang ? "Friends' Retreat" : "Rundgang"}
            </a>
            <a href={isBuchung? "index" : "buchung"}>
              {isBuchung ? "Friends' Retreat" : "Buchung"}
              </a>
            <a href="Gästehandbuch">Benutzerhandbuch</a>
            <a href="/Kontakt/" class="garden-nav__kontakt">Kontakt</a>
          </>
        ) : (
          <>
            <a href="/Beratung/">Systemische Beratung</a>
            <a href="/vermietung/">Vermietung</a>
            <a href="/ueber-mich/">Über mich</a>
            <a href="/Kontakt/" class="garden-nav__kontakt">Kontakt</a>
          </>
        )}
      </nav>
    </header>
  )
}
