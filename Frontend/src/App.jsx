import { useState } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import "prismjs/components/prism-javascript"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import axios from "axios"
import "./App.css"

function App() {

  const [code, setCode] = useState(`function sum() {
  return 1 + 1
}`)

  const [review, setReview] = useState("")

  async function reviewCode() {
    try {
      const response = await axios.post(
        "http://localhost:3000/ai/get-review",
        { code }
      )

      setReview(response.data.review || response.data)

    } catch (error) {
      console.error(error)
      setReview("Failed to get review from server.")
    }
  }

  return (
    <main>

      <div className="left">

        <div className="code">

          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              prism.highlight(
                code,
                prism.languages.javascript,
                "javascript"
              )
            }
            padding={15}
            textareaClassName="editor-textarea"
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 16,
              minHeight: "100%",
              color: "#fff"
            }}
          />

        </div>

        <button
          className="review"
          onClick={reviewCode}
        >
          Review
        </button>

      </div>

      <div className="right">

        <Markdown
          rehypePlugins={[rehypeHighlight]}
        >
          {review}
        </Markdown>

      </div>

    </main>
  )
}

export default App