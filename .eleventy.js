const {DateTime } = require("luxon");
const Image = require("@11ty/eleventy-img");
const sharp = require('sharp');
const htmlmin = require("html-minifier");
const path = require("path");

module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy('./src/style.css');
    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addPassthroughCopy('./src/admin');

    eleventyConfig.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    })

    eleventyConfig.addNunjucksAsyncShortcode("Image", async (src, alt, cls) => {
      if (!alt) {
        throw new Error(`Missing \`alt\` on myImage from: ${src}`);
      }
  
      let stats = await Image(src, {
        widths: [25, 320, 640, 960, 1200, 1800, 2400],
        formats: ["jpeg", "webp"],
        urlPath: "/assets/portfolio/",
        outputDir: "./public/assets/portfolio/",
      });
  
      let lowestSrc = stats["jpeg"][0];
  
      const srcset = Object.keys(stats).reduce(
        (acc, format) => ({
          ...acc,
          [format]: stats[format].reduce(
            (_acc, curr) => `${_acc} ${curr.srcset} ,`,
            ""
          ),
        }),
        {}
      );
  
      const placeholder = await sharp(lowestSrc.outputPath)
      .resize({ fit: sharp.fit.inside })
      .blur()
      .toBuffer();

      const base64Placeholder = `data:image/png;base64,${placeholder.toString(
        "base64"
      )}`;

      const source = `<source type="image/webp" data-srcset="${srcset["webp"]}" >`;
  
      const img = `<img
        class="lazy"
        alt="${alt}"
        src="${base64Placeholder}"
        data-src="${lowestSrc.url}"
        data-sizes='(min-width: 1024px) 1024px, 100vw'
        data-srcset="${srcset["jpeg"]}"
        width="${lowestSrc.width}"
        height="${lowestSrc.height}"
      >`;

    const clss = `${cls}`;

      return `<div class="${clss}"><picture> ${source} ${img} </picture></div>`;

    });

  // eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
  //   if (outputPath.endsWith(".html")) {
  //     return htmlmin.minify(content, {
  //       collapseWhitespace: true,
  //       removeComments: true,  
  //       useShortDoctype: true,
  //     });
  //   }

  //   return content;
  // });

      // Return your Object options:
      return {
        markdownTemplateEngine: "njk",
        dir: {
          input: "src",
          output: "public"
        }
      }

}