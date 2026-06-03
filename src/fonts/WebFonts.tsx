/* eslint-disable @next/next/no-page-custom-font */

// Fonts matching the FC Bayern design system tokens:
// --fs-text-face-body    → Hanken Grotesk (clean grotesque, matches Bayern's geometric style)
// --fs-text-face-display → Archivo (bold, squared — matches the Bayern wordmark energy)
// To switch fonts, update both this file and the tokens in src/themes/se-starter.scss

function WebFonts() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Archivo:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400&display=swap"
      />
    </>
  )
}

export default WebFonts
