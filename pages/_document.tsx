// DONE REVIEWING: GITHUB COMMIT
import {Head, Html, Main, NextScript} from "next/document"

// IF: You do not want to use Bootstrap
// DELETE: Bootstrap Object - Link - Script
// IF: You do not want to use Tailwind CSS
// DELETE: Every Tailwind CSS classes in Body element

const font = [
  "https://fonts.googleapis.com/css",
  [
    ["family", "Poppins:100,200,300,400,500,600,700,800,900"].join("="),
    ["display", "swap"].join("=")
  ].join("&")
].join("?")

// Bootstrap Object
const bootstrap = {
  css: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css",
  js: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js"
}

const MyDocument = function MyDocument() {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head>
        {/* Bootstrap Link */}
        <link rel="stylesheet" href={bootstrap.css} crossOrigin="anonymous" />
        <link rel="stylesheet" href={font} />
      </Head>
      <body className="bg-gray-50 font-poppins">
        <Main />
        <NextScript />
        {/* Bootstrap Script */}
        <script src={bootstrap.js} crossOrigin="anonymous" defer />
      </body>
    </Html>
  )
}

export default MyDocument
