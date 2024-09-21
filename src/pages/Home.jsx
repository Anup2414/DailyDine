// Icons Import

// Image and Video Import
// Component Imports
import Footer from "../components/Common/Footer"
import CodeBlocks from "../components/core/HomePage/CodeBlocks"


function Home() {
  return (
    <div>
      <div className="relative mx-auto flex w-7/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                {/* mess name should be here */}
                ShankarMahraj Mess
                {/* <HighlightText text={"coding potential"} /> with our online */}
                {/* courses. */}
              </div>
            }

            subheading={
              " .........Adress should be desplay here..................  Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson. "
            }

            ctabtn1={{
              btnText: "Location",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "See Menu",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-yellow-25"}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>

        {/* Code Section 2 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                {/* mess name should be here */}
                ShankarMahraj Mess
                {/* <HighlightText text={"coding potential"} /> with our online */}
                {/* courses. */}
              </div>
            }

            subheading={
              " .........Adress should be desplay here..................  Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson. "
            }
            ctabtn1={{
              btnText: "Location",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "See Menu",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-white"}
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>

        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                {/* mess name should be here */}
                ShankarMahraj Mess
                {/* <HighlightText text={"coding potential"} /> with our online */}
                {/* courses. */}
              </div>
            }

            subheading={
              " .........Adress should be desplay here..................  Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson. "
            }
            ctabtn1={{
              btnText: "Location",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "See Menu",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-yellow-25"}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>

        {/* Code Section 2 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                {/* mess name should be here */}
                ShankarMahraj Mess
                {/* <HighlightText text={"coding potential"} /> with our online */}
                {/* courses. */}
              </div>
            }

            subheading={
              " .........Adress should be desplay here..................  Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson. "
            }
            ctabtn1={{
              btnText: "Location",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "See Menu",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-white"}
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home
