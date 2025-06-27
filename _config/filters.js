import { DateTime } from 'luxon';

export default function (eleventyConfig) {
  eleventyConfig.addFilter('readableDate', (dateObj, format, zone) => {
    // Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
    return DateTime.fromJSDate(dateObj, { zone: zone || 'utc' }).toFormat(
      format || 'dd LLLL yyyy',
    );
  });

  eleventyConfig.addFilter('htmlDateString', dateObj => {
    // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter('head', (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  // Return the smallest number argument
  eleventyConfig.addFilter('min', (...numbers) => {
    return Math.min.apply(null, numbers);
  });

  // Return the keys used in an object
  eleventyConfig.addFilter('getKeys', target => {
    return Object.keys(target);
  });

  eleventyConfig.addFilter('filterTagList', function filterTagList(tags) {
    return (tags || []).filter(tag => ['all', 'posts'].indexOf(tag) === -1);
  });

  eleventyConfig.addFilter('encodeURIComponent', text => {
    return encodeURIComponent(text);
  });

  eleventyConfig.addNunjucksGlobal('isDiffDay', (d1, d2) => {
    return (
      d1 &&
      DateTime.fromJSDate(d1, { zone: 'utc' }).toFormat('yyyy-LL-dd') !==
        DateTime.fromJSDate(d2, { zone: 'utc' }).toFormat('yyyy-LL-dd')
    );
  });

  eleventyConfig.addFilter('dateToRfc822', value => {
    const date = new Date(value);
    const options = {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',

      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,

      timeZoneName: 'short',
    };

    const formatedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    const [wkd, mmm, dd, yyyy, time, z] = formatedDate
      .replace(/([,\s+-]+)/g, ' ')
      .split(' ');
    const tz = `${z}`.replace(/UTC/, 'GMT');

    return `${wkd}, ${dd} ${mmm} ${yyyy} ${time} ${tz}`;
  });

  eleventyConfig.addFilter(
    'getNewestCollectionItemDate',
    function (collection, emptyFallbackDate) {
      if (!collection || !collection.length) {
        return emptyFallbackDate || new Date();
      }

      return new Date(
        Math.max(
          ...collection.map(item => {
            return item.date;
          }),
        ),
      );
    },
  );

  // Create unified collection of all content (essays, updates)
  eleventyConfig.addFilter('unifiedContent', function (collections) {
    const allContent = [
      ...(collections.essays || []),
      ...(collections.updates || []),
    ];

    // Sort by date, newest first
    return allContent.sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  // Truncate content to specified length with ellipsis
  eleventyConfig.addFilter('truncate', function (content, length = 280) {
    if (!content || typeof content !== 'string') return '';

    // Strip HTML tags first
    const stripped = content.replace(/<[^>]*>/g, '');

    if (stripped.length <= length) return stripped;

    // Find the last space within the limit to avoid cutting words
    const truncated = stripped.substring(0, length);
    const lastSpace = truncated.lastIndexOf(' ');

    return (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated) + '...';
  });

  // Get recent content: minimum 5 items or all items from current month, whichever is greater
  eleventyConfig.addFilter('recentContent', function (content, minItems = 5) {
    if (!content || !Array.isArray(content)) return [];

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    // Get items from current month
    const currentMonthItems = content.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate.getFullYear() === currentYear && itemDate.getMonth() === currentMonth;
    });

    // Return either current month items or minimum items, whichever is greater
    if (currentMonthItems.length >= minItems) {
      return currentMonthItems;
    } else {
      return content.slice(0, minItems);
    }
  });

  // Get current year
  eleventyConfig.addFilter('currentYear', function () {
    return new Date().getFullYear();
  });
}
