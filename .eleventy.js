const {DateTime } = require("luxon");
const Image = require("@11ty/eleventy-img");

module.exports = function(eleventyCongfig) {

    eleventyCongfig.addPassthroughCopy('./src/style.css');
    eleventyCongfig.addPassthroughCopy('./src/assets');
    eleventyCongfig.addPassthroughCopy('./src/admin');

    eleventyCongfig.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    })

    eleventyCongfig.addNunjucksAsyncShortcode("Image", async (src, alt) => {
      if (!alt) {
        throw new Error(`Missing \`alt\` on myImage from: ${src}`);
      }
  
      let stats = await Image(src, {
        widths: [25, 320, 640, 960, 1200, 1800, 2400],
        formats: ["jpeg", "webp"],
        urlPath: "/assets/blog/",
        outputDir: "./public/assets/blog/",
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
  
      const source = `<source type="image/webp" srcset="${srcset["webp"]}" >`;
  
      const img = `<img
        loading="lazy"
        alt="${alt}"
        src="${lowestSrc.url}"
        sizes='(min-width: 1024px) 1024px, 100vw'
        srcset="${srcset["jpeg"]}"
        width="${lowestSrc.width}"
        height="${lowestSrc.height}"
        >`;
  
      return `<div class="image-wrapper"><picture> ${source} ${img} </picture></div>`;
    });

      // Return your Object options:
  return {
    dir: {
      input: "src",
      output: "public"
    }
  }
}