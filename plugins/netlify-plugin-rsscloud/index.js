const { CONTEXT, RSSCLOUD_PING_URL } = process.env;

export default {
  async onSuccess({ utils, constants, inputs }) {
    const pingUrl = inputs.pingUrl || RSSCLOUD_PING_URL;
    const feedUrl = inputs.feedUrl || 'https://blog.andrewshell.org/rss.xml';

    if (constants.IS_LOCAL || CONTEXT !== 'production') {
      console.log(
        'Don\'t ping rsscloud server because this isn\'t a production build',
      );
      return;
    }

    try {
      const response = await fetch(pingUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: new URLSearchParams({
          url: feedUrl,
        }).toString(),
      });

      if (response.status === 200) {
        console.log(`Pinged RSS Cloud Server: ${pingUrl} with feed: ${feedUrl}`);
      } else {
        throw new Error(
          `RSS Cloud Server failed with status ${response.status}`,
        );
      }
    } catch (e) {
      utils.build.failPlugin(e);
    }
  },
};
