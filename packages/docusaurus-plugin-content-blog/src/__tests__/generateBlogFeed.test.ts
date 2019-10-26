import path from 'path';
import {generateBlogFeed} from '../blogUtils';
import {LoadContext} from '@docusaurus/types';
import {PluginOptions} from '../types';

describe('blogFeed', () => {
  ['atom', 'rss'].forEach(feedType => {
    describe(`${feedType}`, () => {
      test('can show feed without posts', async () => {
        const siteConfig = {
          title: 'Hello',
          baseUrl: '/',
          url: 'https://docusaurus.io',
          favicon: 'image/favicon.ico',
        };

        const feed = await generateBlogFeed(
          {
            siteDir: __dirname,
            siteConfig,
          } as LoadContext,
          {
            path: 'invalid-blog-path',
            routeBasePath: 'blog',
            include: ['*.md', '*.mdx'],
            feedOptions: {
              type: feedType as any,
              copyright: 'Copyright',
            },
          } as PluginOptions,
        );
        expect(feed).toMatchSnapshot();
      });

      test('shows feed item for each post', async () => {
        const siteDir = path.join(__dirname, '__fixtures__', 'website');
        const generatedFilesDir = path.resolve(siteDir, '.docusaurus');
        const siteConfig = {
          title: 'Hello',
          baseUrl: '/',
          url: 'https://docusaurus.io',
          favicon: 'image/favicon.ico',
        };

        const feed = await generateBlogFeed(
          {
            siteDir,
            siteConfig,
            generatedFilesDir,
          } as LoadContext,
          {
            path: 'blog',
            routeBasePath: 'blog',
            include: ['*r*.md', '*.mdx'], // skip no-date.md - it won't play nice with snapshots
            feedOptions: {
              type: feedType as any,
              copyright: 'Copyright',
            },
          } as PluginOptions,
        );
        expect(feed).toMatchSnapshot();
      });
    });
  });
});
