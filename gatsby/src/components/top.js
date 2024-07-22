import React, { lazy, useEffect, useState } from "react"
import "smartblock/css/smartblock.css"
import { Link, withPrefix } from "gatsby"
import pkg from "../../../package.json"
const SmartBlock = lazy(() => import("smartblock").then(module => ({ default: module.SmartBlock })))
const html = `<p>SmartBlock is a block styled editor created by JavaScript. Which gives you nice experience of editing contents at touchscreen. On this page you can see it in action. Try to edit this text ! :)</p>
<h2>Features</h2>
<ul>
  <li>Easy to use with touchscreen device (e.g. smartphone, tablet)</li>
  <li>Fully customizable</li>
  <li>Block styled editor</li>
  <li>Keep clean HTML and wipe out unnecessary tags</li>
  <li>Get the result as HTML or JSON</li>
  <li>Keep style when copy and paste contents</li>
</ul>
<p style="text-align:center;">SmartBlock is provided with MIT license. <br/>Made by : @appleple ♥ OSS</p>
<img src="${withPrefix("/footer.svg")}" />
`

export default function Top (props) {
  const isSSR = typeof window === "undefined"
  const { data } = props
  const { markdownRemark } = data
  const [outputHTML, setOutputHTML] = React.useState("")
  const [outputJSON, setOutputJSON] = React.useState("")
  const [tab, setTab] = React.useState("html")

  const [extensions, setExtensions] = useState([])

  useEffect(() => {
    if (!isSSR) {
      import("smartblock").then(module => {
        const { Extensions, Code, Image } = module
        setExtensions([
          ...Extensions,
          new Code(),
          new Image({
            withCaption: false,
            imgFullClassName: "full",
            imgClassName: "small",
          }),
        ])
      })
    }
  }, [isSSR])

  return (
    <>
      <section className="hero is-center firstview">
        <div className="inner is-small">
          <div className="box" style={{ textAlign: "center" }}>
            <p className="margin-top-medium lead">
              Modern block styled editor <br />
              powered with React and ProseMirror
              <br /> Easier to edit on touchscreen.
            </p>
          </div>
        </div>
        <div className="inner hero-inner" style={{ textAlign: "center" }}>
          <Link to="/get-started" className="button">
            Get Started
          </Link>
          <p className="small">Current Version : Ver.{pkg.version}</p>
        </div>
      </section>

      <main className="main">
        <div className="content">
          <section className="section" style={{ paddingTop: "0" }}>
            <div className="inner is-small">
              <div className="app-frame">
                <div className="app-frame-inner">
                  {!isSSR && (
                    <React.Suspense fallback={<div />}>
                      <SmartBlock
                        showTitle
                        titleText="What is SmartBlock?"
                        extensions={extensions}
                        html={html}
                        onChange={({ html, json }) => {
                          setOutputHTML(html)
                          setOutputJSON(json)
                        }}
                      />
                    </React.Suspense>
                  )}
                </div>
              </div>
              <h2 style={{ marginTop: "-50px" }}>Output Result</h2>
              <div className="tab" style={{ marginBottom: "50px" }}>
                <div className="tab-list">
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a
                    href="#"
                    className={tab === "html" ? "is-current" : ""}
                    onClick={event => {
                      event.preventDefault()
                      setTab("html")
                    }}
                  >
                    HTML
                  </a>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a
                    href="#"
                    className={tab === "json" ? "is-current" : ""}
                    onClick={event => {
                      event.preventDefault()
                      setTab("json")
                    }}
                  >
                    JSON
                  </a>
                </div>
                <div className="tab-content">
                  <div className="is-active">
                    {tab === "html" && (
                      <pre className="language-html">
                        <code>{outputHTML}</code>
                      </pre>
                    )}
                    {tab === "json" && (
                      <pre className="language-html">
                        <code>{JSON.stringify(outputJSON)}</code>
                      </pre>
                    )}
                  </div>
                </div>
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: markdownRemark.html,
                }}
              />
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
