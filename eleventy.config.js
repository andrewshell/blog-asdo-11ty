import {
  IdAttributePlugin,
  InputPathToUrlTransformPlugin,
  HtmlBasePlugin,
} from '@11ty/eleventy';
import pluginSyntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import pluginNavigation from '@11ty/eleventy-navigation';
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';
import markdownItFootnote from 'markdown-it-footnote';
import fs from 'node:fs';
import matter from 'gray-matter';

import pluginDrafts from './_config/drafts.js';
import pluginFilters from './_config/filters.js';

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function (eleventyConfig) {
  // Drafts, see also _data/eleventyDataSchema.js
  eleventyConfig.addPreprocessor('drafts', '*', (data, _content) => {
    if (data.draft && process.env.ELEVENTY_RUN_MODE === 'build') {
      return false;
    }
  });

  // Copy the contents of the `public` folder to the output folder
  // For example, `./public/css/` ends up in `_site/css/`
  eleventyConfig
    .addPassthroughCopy({
      './content/essays/img/': '/essays/img/',
      './public/': '/',
      './node_modules/lunr/lunr.min.js': '/js/lunr.min.js',
    })
    .addPassthroughCopy('./content/feed/pretty-atom-feed.xsl');

  // Run Eleventy when these files change:
  // https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

  eleventyConfig.amendLibrary('md', mdLib => mdLib.use(markdownItFootnote));

  // Watch content images for the image pipeline.
  eleventyConfig.addWatchTarget('content/**/*.{svg,webp,png,jpeg}');

  // Watch CSS files for changes
  eleventyConfig.addWatchTarget('public/css/');

  // Per-page bundles, see https://github.com/11ty/eleventy-plugin-bundle
  // Adds the {% css %} paired shortcode
  eleventyConfig.addBundle('css', {
    toFileDirectory: 'dist',
  });
  // Adds the {% js %} paired shortcode
  eleventyConfig.addBundle('js', {
    toFileDirectory: 'dist',
  });

  // Official plugins
  eleventyConfig.addPlugin(pluginSyntaxHighlight, {
    preAttributes: { tabindex: 0 },
  });
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(HtmlBasePlugin);
  eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

  // Image optimization: https://www.11ty.dev/docs/plugins/image/#eleventy-transform
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    // File extensions to process in _site folder
    extensions: 'html',

    // Output formats for each image.
    formats: ['avif', 'webp', 'auto'],

    // Responsive image widths
    widths: [320, 640, 960, 1280, 1600, 'auto'],

    defaultAttributes: {
      // e.g. <img loading decoding> assigned on the HTML tag will override these values.
      loading: 'lazy',
      decoding: 'async',
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    },
  });

  // Drafts
  eleventyConfig.addPlugin(pluginDrafts);

  // Filters
  eleventyConfig.addPlugin(pluginFilters);

  eleventyConfig.addPlugin(IdAttributePlugin, {
    // by default we use Eleventy’s built-in `slugify` filter:
    // slugify: eleventyConfig.getFilter("slugify"),
    // selector: "h1,h2,h3,h4,h5,h6", // default
  });

  eleventyConfig.addShortcode('currentBuildDate', () => {
    return new Date().toISOString();
  });

  eleventyConfig.addShortcode('youtube', videoURL => {
    try {
      const url = new URL(videoURL);
      // Validate it's a YouTube URL and extract video ID
      let id;
      if (
        url.hostname === 'www.youtube.com' ||
        url.hostname === 'youtube.com'
      ) {
        id = url.searchParams.get('v');
      } else if (url.hostname === 'youtu.be') {
        id = url.pathname.slice(1);
      } else {
        throw new Error('Invalid YouTube URL');
      }

      if (!id || !/^[a-zA-Z0-9_-]{11}$/.test(id)) {
        throw new Error('Invalid YouTube video ID');
      }

      return `<div class="embedVideo"><iframe src="https://www.youtube-nocookie.com/embed/${id}" title="YouTube video player" frameborder="0" allowfullscreen></iframe></div>
`;
    } catch (error) {
      console.error(
        `[youtube shortcode] Invalid URL: ${videoURL}`,
        error.message,
      );
      return `<!-- Invalid YouTube URL: ${videoURL} -->`;
    }
  });

  eleventyConfig.addShortcode('vimeo', videoURL => {
    try {
      const url = new URL(videoURL);
      // Validate it's a Vimeo URL and extract video ID
      let id;
      if (url.hostname === 'vimeo.com' || url.hostname === 'www.vimeo.com') {
        const match = url.pathname.match(/\/(\d+)/);
        id = match ? match[1] : null;
      } else if (url.hostname === 'player.vimeo.com') {
        const match = url.pathname.match(/\/video\/(\d+)/);
        id = match ? match[1] : null;
        // For player URLs, use the full URL
        return `<div class="embedVideo"><iframe src="${videoURL}" title="Vimeo video player" frameborder="0" allowfullscreen></iframe></div>
`;
      } else {
        throw new Error('Invalid Vimeo URL');
      }

      if (!id || !/^\d+$/.test(id)) {
        throw new Error('Invalid Vimeo video ID');
      }

      return `<div class="embedVideo"><iframe src="https://player.vimeo.com/video/${id}" title="Vimeo video player" frameborder="0" allowfullscreen></iframe></div>
`;
    } catch (error) {
      console.error(
        `[vimeo shortcode] Invalid URL: ${videoURL}`,
        error.message,
      );
      return `<!-- Invalid Vimeo URL: ${videoURL} -->`;
    }
  });

  eleventyConfig.addShortcode('embed', function (file) {
    const filePath = `./content/${file}`;
    try {
      if (!fs.existsSync(filePath)) {
        console.warn(`[embed shortcode] File not found: ${filePath}`);
        return `<!-- Embed file not found: ${file} -->`;
      }
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { content, data } = matter(fileContent);
      if (!data.title) {
        console.warn(`[embed shortcode] No title found in: ${file}`);
        return content;
      }
      return `## ${data.title}\n\n${content}`;
    } catch (error) {
      console.error(
        `[embed shortcode] Error reading file ${file}:`,
        error.message,
      );
      return `<!-- Error embedding file: ${file} -->`;
    }
  });

  eleventyConfig.addFilter('removeDate', function (str) {
    return str.replace(/^\d{8}-/, '');
  });

  // Features to make your build faster (when you need them)

  // If your passthrough copy gets heavy and cumbersome, add this line
  // to emulate the file copy on the dev server. Learn more:
  // https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve
  eleventyConfig.setServerPassthroughCopyBehavior('passthrough');

  // Enable build caching for faster incremental builds
  eleventyConfig.addGlobalData('cacheVersion', () => {
    return process.env.CACHE_VERSION || new Date().getTime();
  });
}

export const config = {
  // Control which files Eleventy will process
  // e.g.: *.md, *.njk, *.html, *.liquid
  templateFormats: ['md', 'njk', 'html', 'liquid', '11ty.js'],

  // Pre-process *.md files with: (default: `liquid`)
  markdownTemplateEngine: 'njk',

  // Pre-process *.html files with: (default: `liquid`)
  htmlTemplateEngine: 'njk',

  // These are all optional:
  dir: {
    input: 'content', // default: "."
    includes: '../_includes', // default: "_includes" (`input` relative)
    data: '../_data', // default: "_data" (`input` relative)
    output: '_site',
  },

  // -----------------------------------------------------------------
  // Optional items:
  // -----------------------------------------------------------------

  // If your site deploys to a subdirectory, change `pathPrefix`.
  // Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

  // When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
  // it will transform any absolute URLs in your HTML to include this
  // folder name and does **not** affect where things go in the output folder.

  // pathPrefix: "/",
};
