const {
  CONTEXT,
  RSSCLOUD_FEED_URL,
  RSSCLOUD_PING_URL,
} = process.env;

export default {
  async onSuccess({ utils, constants, inputs }) {
    const _feedUrl = inputs.feedUrl || RSSCLOUD_FEED_URL;
    const pingUrl = inputs.pingUrl || RSSCLOUD_PING_URL;

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
          'url': pingUrl,
        })
          .toString(),
      });

      if (response.status === 200) {
        console.log(`Pinged RSS Cloud Server: ${pingUrl}`);
      } else {
        throw new Error(`RSS Cloud Server failed with status ${response.status}`);
      }
    } catch (e) {
      utils.build.failPlugin(e);
    }
  },
};
