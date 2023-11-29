const {DateTime } = require("luxon");
const Image = require("@11ty/eleventy-img");
const sharp = require('sharp');

module.exports = function(eleventyCongfig) {

    eleventyCongfig.addPassthroughCopy('./src/style.css');
    eleventyCongfig.addPassthroughCopy('./src/assets');
    eleventyCongfig.addPassthroughCopy('./src/admin');

    eleventyCongfig.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    })

    eleventyCongfig.addNunjucksAsyncShortcode("Image", async (src, alt, cls) => {
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

      return `<div class="img-wrapper ${clss}"><picture> ${source} ${img} </picture></div>`;
    });

      // Return your Object options:
  return {
    dir: {
      input: "src",
      output: "public"
    }
  }
}